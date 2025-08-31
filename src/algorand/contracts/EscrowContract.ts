import algosdk from 'algosdk';
import { 
  createAlgodClient, 
  getSuggestedParams, 
  waitForConfirmation, 
  signAndSendTransaction 
} from '../utils/client';

/**
 * Simple Escrow Smart Contract
 * Allows secure asset exchanges between two parties
 */

export const ESCROW_CONTRACT_TEAL = `
#pragma version 8

// Check transaction type
txn TypeEnum
int appl
==
bnz handle_app_call

int 0
return

handle_app_call:
// Handle NoOp calls
txn OnCompletion
int NoOp
==
bnz handle_noop

// Handle opt-in
txn OnCompletion
int OptIn
==
bnz handle_optin

int 0
return

handle_optin:
int 1
return

handle_noop:
// Check the action
txn ApplicationArgs 0
byte "create_escrow"
==
bnz create_escrow

txn ApplicationArgs 0
byte "deposit"
==
bnz deposit

txn ApplicationArgs 0
byte "release"
==
bnz release

txn ApplicationArgs 0
byte "refund"
==
bnz refund

int 0
return

create_escrow:
// Create a new escrow
// Args: ["create_escrow", buyer_address, seller_address, amount, timeout]

txn NumAppArgs
int 5
==
assert

// Store escrow details
byte "buyer"
txn ApplicationArgs 1
app_global_put

byte "seller"
txn ApplicationArgs 2
app_global_put

byte "amount"
txn ApplicationArgs 3
btoi
app_global_put

byte "timeout"
txn ApplicationArgs 4
btoi
app_global_put

byte "status"
byte "created"
app_global_put

byte "creator"
txn Sender
app_global_put

int 1
return

deposit:
// Deposit funds to escrow
// Args: ["deposit"]

// Check payment amount matches escrow amount
byte "amount"
app_global_get
gtxn 0 Amount
==
assert

// Check sender is the buyer
byte "buyer"
app_global_get
txn Sender
==
assert

// Update status
byte "status"
byte "funded"
app_global_put

int 1
return

release:
// Release funds to seller
// Args: ["release"]

// Check status is funded
byte "status"
app_global_get
byte "funded"
==
assert

// Check sender is buyer or authorized party
byte "buyer"
app_global_get
txn Sender
==
byte "creator"
app_global_get
txn Sender
==
||
assert

// Update status
byte "status"
byte "released"
app_global_put

int 1
return

refund:
// Refund to buyer
// Args: ["refund"]

// Check if timeout has passed
global LatestTimestamp
byte "timeout"
app_global_get
>=
byte "creator"
app_global_get
txn Sender
==
||
assert

// Check status allows refund
byte "status"
app_global_get
byte "funded"
==
assert

// Update status
byte "status"
byte "refunded"
app_global_put

int 1
return
`;

export interface EscrowInfo {
  escrowId: number;
  buyer: string;
  seller: string;
  amount: number;
  timeout: number;
  status: 'created' | 'funded' | 'released' | 'refunded';
  creator: string;
}

export class EscrowContract {
  private client: algosdk.Algodv2;
  private appId: number;

  constructor(client: algosdk.Algodv2, appId: number) {
    this.client = client;
    this.appId = appId;
  }

  /**
   * Deploy escrow contract
   */
  static async deploy(
    client: algosdk.Algodv2,
    creator: algosdk.Account
  ): Promise<EscrowContract> {
    const suggestedParams = await getSuggestedParams(client);

    // Compile TEAL programs
    const approvalProgram = await client.compile(Buffer.from(ESCROW_CONTRACT_TEAL)).do();
    const clearProgram = await client.compile(Buffer.from('int 1')).do();

    // Create application
    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      sender: creator.addr,
      suggestedParams,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      approvalProgram: new Uint8Array(Buffer.from(approvalProgram.result, 'base64')),
      clearProgram: new Uint8Array(Buffer.from(clearProgram.result, 'base64')),
      numLocalInts: 0,
      numLocalByteSlices: 0,
      numGlobalInts: 3, // amount, timeout, status
      numGlobalByteSlices: 4, // buyer, seller, creator, status
      appArgs: [new TextEncoder().encode('init')]
    });

    const txId = await signAndSendTransaction(client, createTxn, creator);
    const confirmedTxn = await waitForConfirmation(client, txId);
    
    if (!confirmedTxn.applicationIndex) {
      throw new Error('Failed to create escrow application');
    }

    return new EscrowContract(client, Number(confirmedTxn.applicationIndex));
  }

  /**
   * Create a new escrow
   */
  async createEscrow(
    creator: algosdk.Account,
    buyer: string,
    seller: string,
    amount: number,
    timeoutSeconds: number
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);
    const timeout = Math.floor(Date.now() / 1000) + timeoutSeconds;

    const createTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: creator.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [
        new TextEncoder().encode('create_escrow'),
        algosdk.decodeAddress(buyer).publicKey,
        algosdk.decodeAddress(seller).publicKey,
        algosdk.encodeUint64(amount),
        algosdk.encodeUint64(timeout)
      ]
    });

    const txId = await signAndSendTransaction(this.client, createTxn, creator);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Deposit funds to escrow
   */
  async deposit(buyer: algosdk.Account, amount: number): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    // Payment to escrow account
    const escrowAddress = algosdk.getApplicationAddress(this.appId);
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: buyer.addr,
      receiver: escrowAddress,
      amount,
      suggestedParams
    });

    // Deposit call
    const depositTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: buyer.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [new TextEncoder().encode('deposit')]
    });

    // Group transactions
    const txnGroup = [paymentTxn, depositTxn];
    algosdk.assignGroupID(txnGroup);

    // Sign both transactions
    const signedPayment = paymentTxn.signTxn(buyer.sk);
    const signedDeposit = depositTxn.signTxn(buyer.sk);

    // Send transaction group
    const { txid } = await this.client.sendRawTransaction([signedPayment, signedDeposit]).do();
    await waitForConfirmation(this.client, txid);

    return txid;
  }

  /**
   * Release funds to seller
   */
  async release(releaser: algosdk.Account, seller: string): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    // Release call
    const releaseTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: releaser.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [new TextEncoder().encode('release')],
      accounts: [seller]
    });

    const txId = await signAndSendTransaction(this.client, releaseTxn, releaser);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Refund to buyer (if timeout or authorized)
   */
  async refund(refunder: algosdk.Account, buyer: string): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const refundTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: refunder.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [new TextEncoder().encode('refund')],
      accounts: [buyer]
    });

    const txId = await signAndSendTransaction(this.client, refundTxn, refunder);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Get escrow information
   */
  async getEscrowInfo(): Promise<EscrowInfo> {
    const appInfo = await this.client.getApplicationByID(this.appId).do();
    const globalState = appInfo.params.globalState || [];

    const info: Partial<EscrowInfo> = {
      escrowId: this.appId
    };

    for (const item of globalState) {
      const key = new TextDecoder().decode(item.key);
      
      switch (key) {
        case 'buyer':
          info.buyer = algosdk.encodeAddress(item.value.bytes || new Uint8Array());
          break;
        case 'seller':
          info.seller = algosdk.encodeAddress(item.value.bytes || new Uint8Array());
          break;
        case 'creator':
          info.creator = algosdk.encodeAddress(item.value.bytes || new Uint8Array());
          break;
        case 'amount':
          info.amount = Number(item.value.uint);
          break;
        case 'timeout':
          info.timeout = Number(item.value.uint);
          break;
        case 'status':
          info.status = new TextDecoder().decode(item.value.bytes || new Uint8Array()) as 'created' | 'funded' | 'released' | 'refunded';
          break;
      }
    }

    return info as EscrowInfo;
  }

  /**
   * Check if escrow has expired
   */
  async isExpired(): Promise<boolean> {
    const info = await this.getEscrowInfo();
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > info.timeout;
  }

  /**
   * Get escrow balance
   */
  async getBalance(): Promise<number> {
    const escrowAddress = algosdk.getApplicationAddress(this.appId);
    const accountInfo = await this.client.accountInformation(escrowAddress).do();
    return Number(accountInfo.amount);
  }

  get applicationId(): number {
    return this.appId;
  }

  get escrowAddress(): string {
    return algosdk.getApplicationAddress(this.appId).toString();
  }
}

// Helper function
export async function createEscrow(
  creator: algosdk.Account,
  network: 'TESTNET' | 'MAINNET' = 'TESTNET'
): Promise<EscrowContract> {
  const client = createAlgodClient(network);
  return EscrowContract.deploy(client, creator);
}
