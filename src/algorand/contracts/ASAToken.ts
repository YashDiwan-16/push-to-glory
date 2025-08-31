import algosdk from 'algosdk';
import { 
  createAlgodClient, 
  getSuggestedParams, 
  waitForConfirmation, 
  signAndSendTransaction
} from '../utils/client';

export interface AssetInfo {
  assetId: number;
  name: string;
  unitName: string;
  total: number;
  decimals: number;
  defaultFrozen: boolean;
  manager?: string;
  reserve?: string;
  freeze?: string;
  clawback?: string;
  url?: string;
  metadataHash?: Uint8Array;
}

export interface AssetHolding {
  address: string;
  amount: number;
  isFrozen: boolean;
}

/**
 * Algorand Standard Asset (ASA) Token Contract
 */
export class ASAToken {
  private client: algosdk.Algodv2;
  private assetId: number;

  constructor(client: algosdk.Algodv2, assetId: number) {
    this.client = client;
    this.assetId = assetId;
  }

  /**
   * Create a new ASA token
   */
  static async create(
    client: algosdk.Algodv2,
    creator: algosdk.Account,
    params: {
      name: string;
      unitName: string;
      total: number;
      decimals: number;
      defaultFrozen?: boolean;
      manager?: string;
      reserve?: string;
      freeze?: string;
      clawback?: string;
      url?: string;
      metadataHash?: Uint8Array;
    }
  ): Promise<ASAToken> {
    const suggestedParams = await getSuggestedParams(client);

    // Create asset creation transaction
    const createAssetTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      sender: creator.addr,
      suggestedParams,
      total: params.total,
      decimals: params.decimals,
      defaultFrozen: params.defaultFrozen || false,
      manager: params.manager || creator.addr,
      reserve: params.reserve || creator.addr,
      freeze: params.freeze || creator.addr,
      clawback: params.clawback || creator.addr,
      assetName: params.name,
      unitName: params.unitName,
      assetURL: params.url,
      assetMetadataHash: params.metadataHash
    });

    // Sign and send transaction
    const txId = await signAndSendTransaction(client, createAssetTxn, creator);
    
    // Wait for confirmation
    const confirmedTxn = await waitForConfirmation(client, txId);
    
    if (!confirmedTxn.assetIndex) {
      throw new Error('Failed to create asset');
    }

    return new ASAToken(client, Number(confirmedTxn.assetIndex));
  }

  /**
   * Opt-in to the asset (required before receiving tokens)
   */
  async optIn(account: algosdk.Account): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: account.addr,
      receiver: account.addr,
      assetIndex: this.assetId,
      amount: 0,
      suggestedParams
    });

    const txId = await signAndSendTransaction(this.client, optInTxn, account);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Transfer tokens between accounts
   */
  async transfer(
    from: algosdk.Account,
    to: string,
    amount: number,
    note?: string
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: from.addr,
      receiver: to,
      assetIndex: this.assetId,
      amount,
      suggestedParams,
      note: note ? new TextEncoder().encode(note) : undefined
    });

    const txId = await signAndSendTransaction(this.client, transferTxn, from);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Freeze or unfreeze an account's asset holdings
   */
  async freeze(
    freezeAccount: algosdk.Account,
    targetAccount: string,
    freezeState: boolean
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const freezeTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
      sender: freezeAccount.addr,
      assetIndex: this.assetId,
      freezeTarget: targetAccount,
      freezeState,
      suggestedParams
    });

    const txId = await signAndSendTransaction(this.client, freezeTxn, freezeAccount);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Clawback tokens from an account
   */
  async clawback(
    clawbackAccount: algosdk.Account,
    from: string,
    to: string,
    amount: number
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const clawbackTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      sender: clawbackAccount.addr,
      receiver: to,
      assetIndex: this.assetId,
      amount,
      revocationTarget: from,
      suggestedParams
    });

    const txId = await signAndSendTransaction(this.client, clawbackTxn, clawbackAccount);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Update asset configuration
   */
  async updateConfig(
    manager: algosdk.Account,
    newConfig: {
      manager?: string;
      reserve?: string;
      freeze?: string;
      clawback?: string;
    }
  ): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const configTxn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
      sender: manager.addr,
      assetIndex: this.assetId,
      manager: newConfig.manager,
      reserve: newConfig.reserve,
      freeze: newConfig.freeze,
      clawback: newConfig.clawback,
      suggestedParams
    });

    const txId = await signAndSendTransaction(this.client, configTxn, manager);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Destroy the asset (only if all tokens are held by creator)
   */
  async destroy(manager: algosdk.Account): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const destroyTxn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
      sender: manager.addr,
      assetIndex: this.assetId,
      suggestedParams
    });

    const txId = await signAndSendTransaction(this.client, destroyTxn, manager);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Get asset information
   */
  async getAssetInfo(): Promise<AssetInfo> {
    const assetInfo = await this.client.getAssetByID(this.assetId).do();
    const params = assetInfo.params;

    return {
      assetId: this.assetId,
      name: params.name || '',
      unitName: params['unit-name'] || '',
      total: Number(params.total),
      decimals: params.decimals,
      defaultFrozen: params['default-frozen'] || false,
      manager: params.manager,
      reserve: params.reserve,
      freeze: params.freeze,
      clawback: params.clawback,
      url: params.url,
      metadataHash: params['metadata-hash'] ? new Uint8Array(params['metadata-hash']) : undefined
    };
  }

  /**
   * Get account's asset holding
   */
  async getAssetHolding(address: string): Promise<AssetHolding | null> {
    try {
      const accountInfo = await this.client.accountInformation(address).do();
      const assetHolding = accountInfo.assets?.find(
        (asset) => Number(asset['asset-id']) === this.assetId
      );

      if (!assetHolding) return null;

      return {
        address,
        amount: Number(assetHolding.amount),
        isFrozen: assetHolding['is-frozen'] || false
      };
    } catch {
      return null;
    }
  }

  /**
   * Get all holders of the asset
   */
  async getAllHolders(): Promise<AssetHolding[]> {
    const indexer = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');
    
    try {
      const assetBalances = await indexer
        .lookupAssetBalances(this.assetId)
        .do();

      return assetBalances.balances.map((balance: any) => ({
        address: balance.address,
        amount: Number(balance.amount),
        isFrozen: balance['is-frozen'] || false
      }));
    } catch {
      return [];
    }
  }

  /**
   * Get total supply in circulation (excluding reserve)
   */
  async getCirculatingSupply(): Promise<number> {
    const assetInfo = await this.getAssetInfo();
    const reserveHolding = assetInfo.reserve 
      ? await this.getAssetHolding(assetInfo.reserve)
      : null;

    const reserveAmount = reserveHolding?.amount || 0;
    return assetInfo.total - reserveAmount;
  }

  /**
   * Check if account has opted in to the asset
   */
  async hasOptedIn(address: string): Promise<boolean> {
    const holding = await this.getAssetHolding(address);
    return holding !== null;
  }

  /**
   * Get asset transaction history
   */
  async getTransactionHistory(limit = 50): Promise<any[]> {
    const indexer = new algosdk.Indexer('', 'https://testnet-idx.algonode.cloud', '');
    
    try {
      const transactions = await indexer
        .lookupAssetTransactions(this.assetId)
        .limit(limit)
        .do();

      return transactions.transactions || [];
    } catch {
      return [];
    }
  }

  get id(): number {
    return this.assetId;
  }
}

// Helper functions
export async function createToken(
  creator: algosdk.Account,
  params: {
    name: string;
    unitName: string;
    total: number;
    decimals: number;
    defaultFrozen?: boolean;
    url?: string;
  },
  network: 'TESTNET' | 'MAINNET' = 'TESTNET'
): Promise<ASAToken> {
  const client = createAlgodClient(network);
  return ASAToken.create(client, creator, params);
}

export async function getTokenInfo(
  assetId: number,
  network: 'TESTNET' | 'MAINNET' = 'TESTNET'
): Promise<AssetInfo> {
  const client = createAlgodClient(network);
  const token = new ASAToken(client, assetId);
  return token.getAssetInfo();
}
