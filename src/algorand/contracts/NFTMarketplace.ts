import algosdk from 'algosdk';
import { 
  createAlgodClient, 
  getSuggestedParams, 
  waitForConfirmation, 
  signAndSendTransaction 
} from '../utils/client';

/**
 * Simple NFT Marketplace Smart Contract
 * Allows users to list, buy, and sell NFTs
 */

export const MARKETPLACE_CONTRACT_TEAL = `
#pragma version 8

// Application calls
txn TypeEnum
int appl
==
bnz handle_app_call

// Reject all other transaction types
int 0
return

handle_app_call:
// Check the application call type
txn OnCompletion
int NoOp
==
bnz handle_noop

// Handle opt-in (for buyers/sellers)
txn OnCompletion
int OptIn
==
bnz handle_optin

// Reject all other completion types
int 0
return

handle_optin:
// Allow anyone to opt-in
int 1
return

handle_noop:
// Check the first application argument to determine the action
txn ApplicationArgs 0
byte "list_nft"
==
bnz list_nft

txn ApplicationArgs 0
byte "buy_nft"
==
bnz buy_nft

txn ApplicationArgs 0
byte "cancel_listing"
==
bnz cancel_listing

// Unknown action, reject
int 0
return

list_nft:
// List an NFT for sale
// Args: ["list_nft", nft_id, price]

// Check that we have the right number of arguments
txn NumAppArgs
int 3
==
assert

// Get NFT ID and price from arguments
txn ApplicationArgs 1
btoi
store 0  // NFT ID

txn ApplicationArgs 2
btoi
store 1  // Price

// Store the listing information
// Key: "listing_" + nft_id
// Value: seller_address + price
txn ApplicationArgs 1
byte "listing_"
swap
concat
txn Sender
load 1
itob
concat
app_global_put

// Mark NFT as listed
txn ApplicationArgs 1
byte "listed_"
swap
concat
int 1
app_global_put

int 1
return

buy_nft:
// Buy a listed NFT
// Args: ["buy_nft", nft_id]

// Check arguments
txn NumAppArgs
int 2
==
assert

// Get NFT ID
txn ApplicationArgs 1
btoi
store 0

// Check if NFT is listed
txn ApplicationArgs 1
byte "listed_"
swap
concat
app_global_get
int 1
==
assert

// Get listing info
txn ApplicationArgs 1
byte "listing_"
swap
concat
app_global_get
store 2  // Listing data (seller + price)

// Extract price (last 8 bytes)
load 2
len
int 8
-
load 2
swap
substring3
btoi
store 1  // Price

// Check payment amount matches price
gtxn 0 Amount
load 1
==
assert

// Check payment receiver is the seller
load 2
len
int 8
-
int 0
load 2
substring3  // Seller address
gtxn 0 Receiver
==
assert

// Remove listing
txn ApplicationArgs 1
byte "listing_"
swap
concat
app_global_del

txn ApplicationArgs 1
byte "listed_"
swap
concat
app_global_del

// Transfer ownership
txn ApplicationArgs 1
byte "owner_"
swap
concat
txn Sender
app_global_put

int 1
return

cancel_listing:
// Cancel an NFT listing
// Args: ["cancel_listing", nft_id]

// Check arguments
txn NumAppArgs
int 2
==
assert

// Check if NFT is listed
txn ApplicationArgs 1
byte "listed_"
swap
concat
app_global_get
int 1
==
assert

// Get listing info to verify ownership
txn ApplicationArgs 1
byte "listing_"
swap
concat
app_global_get
store 2

// Extract seller address (first part)
load 2
len
int 8
-
int 0
load 2
substring3
txn Sender
==
assert

// Remove listing
txn ApplicationArgs 1
byte "listing_"
swap
concat
app_global_del

txn ApplicationArgs 1
byte "listed_"
swap
concat
app_global_del

int 1
return
`;

export interface NFTListing {
  nftId: number;
  seller: string;
  price: number;
  isActive: boolean;
}

export interface MarketplaceStats {
  totalListings: number;
  totalSales: number;
  totalVolume: number;
}

export class NFTMarketplace {
  private client: algosdk.Algodv2;
  private appId: number;

  constructor(client: algosdk.Algodv2, appId: number) {
    this.client = client;
    this.appId = appId;
  }

  /**
   * Deploy a new marketplace contract
   */
  static async deploy(
    client: algosdk.Algodv2,
    creator: algosdk.Account
  ): Promise<NFTMarketplace> {
    const suggestedParams = await getSuggestedParams(client);

    // Compile the TEAL programs
    const approvalProgram = await client.compile(Buffer.from(MARKETPLACE_CONTRACT_TEAL)).do();
    const clearProgram = await client.compile(Buffer.from('int 1')).do();

    // Create application transaction
    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      sender: creator.addr,
      suggestedParams,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      approvalProgram: new Uint8Array(Buffer.from(approvalProgram.result, 'base64')),
      clearProgram: new Uint8Array(Buffer.from(clearProgram.result, 'base64')),
      numLocalInts: 2, // User stats
      numLocalByteSlices: 1,
      numGlobalInts: 10, // Marketplace stats
      numGlobalByteSlices: 20, // Listings storage
      appArgs: [new TextEncoder().encode('create')]
    });

    // Sign and send transaction
    const txId = await signAndSendTransaction(client, createTxn, creator);
    
    // Wait for confirmation
    const confirmedTxn = await waitForConfirmation(client, txId);
    
    if (!confirmedTxn.applicationIndex) {
      throw new Error('Failed to create marketplace application');
    }

    return new NFTMarketplace(client, Number(confirmedTxn.applicationIndex));
  }

  /**
   * List an NFT for sale
   */
  async listNFT(
    seller: algosdk.Account,
    nftId: number,
    price: number
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    // Create the listing transaction
    const listTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: seller.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [
        new TextEncoder().encode('list_nft'),
        algosdk.encodeUint64(nftId),
        algosdk.encodeUint64(price)
      ]
    });

    const txId = await signAndSendTransaction(this.client, listTxn, seller);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Buy an NFT
   */
  async buyNFT(
    buyer: algosdk.Account,
    nftId: number,
    seller: string,
    price: number
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    // Create payment transaction to seller
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: buyer.addr,
      receiver: seller,
      amount: price,
      suggestedParams
    });

    // Create buy transaction
    const buyTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: buyer.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [
        new TextEncoder().encode('buy_nft'),
        algosdk.encodeUint64(nftId)
      ]
    });

    // Group the transactions
    const txnGroup = [paymentTxn, buyTxn];
    algosdk.assignGroupID(txnGroup);

    // Sign both transactions
    const signedPayment = paymentTxn.signTxn(buyer.sk);
    const signedBuy = buyTxn.signTxn(buyer.sk);

    // Send the transaction group
    const { txid } = await this.client.sendRawTransaction([signedPayment, signedBuy]).do();
    await waitForConfirmation(this.client, txid);

    return txid;
  }

  /**
   * Cancel an NFT listing
   */
  async cancelListing(
    seller: algosdk.Account,
    nftId: number
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const cancelTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: seller.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [
        new TextEncoder().encode('cancel_listing'),
        algosdk.encodeUint64(nftId)
      ]
    });

    const txId = await signAndSendTransaction(this.client, cancelTxn, seller);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Get NFT listing information
   */
  async getListing(nftId: number): Promise<NFTListing | null> {
    try {
      const appInfo = await this.client.getApplicationByID(this.appId).do();
      const globalState = appInfo.params.globalState || [];

      const listingKey = `listing_${nftId}`;
      const listedKey = `listed_${nftId}`;

      let listingData: Uint8Array | null = null;
      let isListed = false;

      for (const item of globalState) {
        const key = new TextDecoder().decode(item.key);
        
        if (key === listingKey) {
          listingData = item.value.bytes || null;
        } else if (key === listedKey) {
          isListed = (item.value.uint || 0) === 1;
        }
      }

      if (!listingData || !isListed) {
        return null;
      }

      // Extract seller address and price from listing data
      const sellerBytes = listingData.slice(0, -8);
      const priceBytes = listingData.slice(-8);
      
      const seller = algosdk.encodeAddress(sellerBytes);
      const price = Number(new DataView(priceBytes.buffer).getBigUint64(0, false));

      return {
        nftId,
        seller,
        price,
        isActive: isListed
      };
    } catch {
      return null;
    }
  }

  /**
   * Get all active listings
   */
  async getAllListings(): Promise<NFTListing[]> {
    try {
      const appInfo = await this.client.getApplicationByID(this.appId).do();
      const globalState = appInfo.params.globalState || [];

      const listings: NFTListing[] = [];
      const listingMap = new Map<number, Uint8Array>();
      const listedMap = new Map<number, boolean>();

      // Parse global state
      for (const item of globalState) {
        const key = new TextDecoder().decode(item.key);
        
        if (key.startsWith('listing_')) {
          const nftId = parseInt(key.replace('listing_', ''));
          listingMap.set(nftId, item.value.bytes || new Uint8Array());
        } else if (key.startsWith('listed_')) {
          const nftId = parseInt(key.replace('listed_', ''));
          listedMap.set(nftId, (item.value.uint || 0) === 1);
        }
      }

      // Build listings array
      for (const [nftId, listingData] of listingMap) {
        const isListed = listedMap.get(nftId) || false;
        
        if (isListed && listingData.length > 8) {
          const sellerBytes = listingData.slice(0, -8);
          const priceBytes = listingData.slice(-8);
          
          const seller = algosdk.encodeAddress(sellerBytes);
          const price = Number(new DataView(priceBytes.buffer).getBigUint64(0, false));

          listings.push({
            nftId,
            seller,
            price,
            isActive: true
          });
        }
      }

      return listings;
    } catch {
      return [];
    }
  }

  /**
   * Get marketplace statistics
   */
  async getStats(): Promise<MarketplaceStats> {
    try {
      const appInfo = await this.client.getApplicationByID(this.appId).do();
      const globalState = appInfo.params.globalState || [];

      let totalListings = 0;
      let totalSales = 0;
      let totalVolume = 0;

      for (const item of globalState) {
        const key = new TextDecoder().decode(item.key);
        const value = Number(item.value.uint) || 0;

        switch (key) {
          case 'total_listings':
            totalListings = value;
            break;
          case 'total_sales':
            totalSales = value;
            break;
          case 'total_volume':
            totalVolume = value;
            break;
        }
      }

      return {
        totalListings,
        totalSales,
        totalVolume
      };
    } catch {
      return {
        totalListings: 0,
        totalSales: 0,
        totalVolume: 0
      };
    }
  }

  /**
   * Opt user into marketplace
   */
  async optIn(user: algosdk.Account): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
      sender: user.addr,
      suggestedParams,
      appIndex: this.appId
    });

    const txId = await signAndSendTransaction(this.client, optInTxn, user);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  get applicationId(): number {
    return this.appId;
  }
}

// Helper function to create marketplace
export async function createMarketplace(
  creator: algosdk.Account,
  network: 'TESTNET' | 'MAINNET' = 'TESTNET'
): Promise<NFTMarketplace> {
  const client = createAlgodClient(network);
  return NFTMarketplace.deploy(client, creator);
}
