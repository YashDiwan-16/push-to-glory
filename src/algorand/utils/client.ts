import algosdk from 'algosdk';

// Algorand network configurations
export const ALGORAND_NETWORKS = {
  MAINNET: {
    algod: {
      server: 'https://mainnet-api.algonode.cloud',
      port: '',
      token: ''
    },
    indexer: {
      server: 'https://mainnet-idx.algonode.cloud',
      port: '',
      token: ''
    }
  },
  TESTNET: {
    algod: {
      server: 'https://testnet-api.algonode.cloud',
      port: '',
      token: ''
    },
    indexer: {
      server: 'https://testnet-idx.algonode.cloud',
      port: '',
      token: ''
    }
  },
  SANDBOXNET: {
    algod: {
      server: 'http://localhost',
      port: '4001',
      token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    indexer: {
      server: 'http://localhost',
      port: '8980',
      token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
  }
};

export type NetworkType = keyof typeof ALGORAND_NETWORKS;

/**
 * Create Algorand client for the specified network
 */
export function createAlgodClient(network: NetworkType = 'TESTNET'): algosdk.Algodv2 {
  const config = ALGORAND_NETWORKS[network].algod;
  return new algosdk.Algodv2(config.token, config.server, config.port);
}

/**
 * Create Algorand indexer client for the specified network
 */
export function createIndexerClient(network: NetworkType = 'TESTNET'): algosdk.Indexer {
  const config = ALGORAND_NETWORKS[network].indexer;
  return new algosdk.Indexer(config.token, config.server, config.port);
}

/**
 * Generate a new Algorand account
 */
export function generateAccount(): algosdk.Account {
  return algosdk.generateAccount();
}

/**
 * Import account from mnemonic
 */
export function importAccountFromMnemonic(mnemonic: string): algosdk.Account {
  return algosdk.mnemonicToSecretKey(mnemonic);
}

/**
 * Get account info from the blockchain
 */
export async function getAccountInfo(
  client: algosdk.Algodv2,
  address: string
): Promise<algosdk.modelsv2.Account> {
  return await client.accountInformation(address).do();
}

/**
 * Wait for transaction confirmation
 */
export async function waitForConfirmation(
  client: algosdk.Algodv2,
  txId: string,
  timeout = 4
): Promise<algosdk.modelsv2.PendingTransactionResponse> {
  const status = await client.status().do();
  let lastRound = Number(status.lastRound);
  
  while (true) {
    const pendingInfo = await client.pendingTransactionInformation(txId).do();
    
    if (pendingInfo.confirmedRound && pendingInfo.confirmedRound > 0) {
      return pendingInfo;
    }
    
    lastRound++;
    await client.statusAfterBlock(lastRound).do();
    
    if (lastRound >= Number(status.lastRound) + timeout) {
      throw new Error(`Transaction ${txId} not confirmed after ${timeout} rounds`);
    }
  }
}

/**
 * Get suggested transaction parameters
 */
export async function getSuggestedParams(client: algosdk.Algodv2): Promise<algosdk.SuggestedParams> {
  return await client.getTransactionParams().do();
}

/**
 * Convert microAlgos to Algos
 */
export function microAlgosToAlgos(microAlgos: number | bigint): number {
  return Number(microAlgos) / 1_000_000;
}

/**
 * Convert Algos to microAlgos
 */
export function algosToMicroAlgos(algos: number): number {
  return Math.round(algos * 1_000_000);
}

/**
 * Format Algorand address for display
 */
export function formatAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Validate Algorand address
 */
export function isValidAddress(address: string): boolean {
  try {
    algosdk.decodeAddress(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create payment transaction
 */
export function createPaymentTransaction(
  from: string,
  to: string,
  amount: number,
  suggestedParams: algosdk.SuggestedParams,
  note?: Uint8Array
): algosdk.Transaction {
  return algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: from,
    receiver: to,
    amount,
    suggestedParams,
    note
  });
}

/**
 * Sign and send transaction
 */
export async function signAndSendTransaction(
  client: algosdk.Algodv2,
  transaction: algosdk.Transaction,
  account: algosdk.Account
): Promise<string> {
  const signedTx = transaction.signTxn(account.sk);
  const result = await client.sendRawTransaction(signedTx).do();
  return result.txid || transaction.txID();
}
