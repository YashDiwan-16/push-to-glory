import algosdk from 'algosdk';
import { createAlgodClient, getSuggestedParams, waitForConfirmation, signAndSendTransaction } from '../utils/client';

/**
 * Simple Voting Smart Contract
 * Allows users to vote between multiple options
 */

// TEAL source code for the voting contract
export const VOTING_CONTRACT_TEAL = `
#pragma version 8

// Check if this is a NoOp application call
txn TypeEnum
int appl
==
txn ApplicationArgs 0
byte "vote"
==
&&
bnz vote

// Check if this is contract creation
txn TypeEnum
int appl
==
txn OnCompletion
int NoOp
==
&&
bnz create

// Reject all other transactions
int 0
return

create:
// Initialize voting contract
byte "total_votes"
int 0
app_global_put

byte "option_a"
int 0
app_global_put

byte "option_b"
int 0
app_global_put

int 1
return

vote:
// Check if user has already voted
txn Sender
byte "voted"
app_local_get
int 0
==
assert

// Get the vote option (0 or 1)
txn ApplicationArgs 1
btoi
store 0

// Increment the chosen option
load 0
int 0
==
bnz vote_a

// Vote for option B
byte "option_b"
byte "option_b"
app_global_get
int 1
+
app_global_put
b mark_voted

vote_a:
// Vote for option A
byte "option_a"
byte "option_a"
app_global_get
int 1
+
app_global_put

mark_voted:
// Mark user as voted
txn Sender
byte "voted"
int 1
app_local_put

// Increment total votes
byte "total_votes"
byte "total_votes"
app_global_get
int 1
+
app_global_put

int 1
return
`;

export interface VotingContractState {
  totalVotes: number;
  optionA: number;
  optionB: number;
}

export class VotingContract {
  private client: algosdk.Algodv2;
  private appId: number;
  private creator: algosdk.Account;

  constructor(client: algosdk.Algodv2, appId: number, creator: algosdk.Account) {
    this.client = client;
    this.appId = appId;
    this.creator = creator;
  }

  /**
   * Deploy a new voting contract
   */
  static async deploy(
    client: algosdk.Algodv2,
    creator: algosdk.Account,
    optionAName: string,
    optionBName: string
  ): Promise<VotingContract> {
    const suggestedParams = await getSuggestedParams(client);

    // Compile the TEAL program
    const approvalProgram = await client.compile(Buffer.from(VOTING_CONTRACT_TEAL)).do();
    const clearProgram = await client.compile(Buffer.from('int 1')).do();

    // Create application transaction
    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      sender: creator.addr,
      suggestedParams,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      approvalProgram: new Uint8Array(Buffer.from(approvalProgram.result, 'base64')),
      clearProgram: new Uint8Array(Buffer.from(clearProgram.result, 'base64')),
      numLocalInts: 1, // Store whether user has voted
      numLocalByteSlices: 0,
      numGlobalInts: 3, // total_votes, option_a, option_b
      numGlobalByteSlices: 2, // option names
      appArgs: [
        new TextEncoder().encode('create'),
        new TextEncoder().encode(optionAName),
        new TextEncoder().encode(optionBName)
      ]
    });

    // Sign and send transaction
    const txId = await signAndSendTransaction(client, createTxn, creator);
    
    // Wait for confirmation
    const confirmedTxn = await waitForConfirmation(client, txId);
    
    if (!confirmedTxn.applicationIndex) {
      throw new Error('Failed to create application');
    }

    return new VotingContract(client, Number(confirmedTxn.applicationIndex), creator);
  }

  /**
   * Vote for an option
   */
  async vote(voter: algosdk.Account, option: 0 | 1): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    // Create opt-in transaction if user hasn't opted in
    const accountInfo = await this.client.accountInformation(voter.addr).do();
    const isOptedIn = accountInfo.appsLocalState?.some(
      (app) => Number(app.id) === this.appId
    );

    if (!isOptedIn) {
      const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
        sender: voter.addr,
        suggestedParams,
        appIndex: this.appId
      });

      await signAndSendTransaction(this.client, optInTxn, voter);
      await waitForConfirmation(this.client, optInTxn.txID());
    }

    // Create vote transaction
    const voteTxn = algosdk.makeApplicationCallTxnFromObject({
      sender: voter.addr,
      suggestedParams,
      appIndex: this.appId,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: [
        new TextEncoder().encode('vote'),
        algosdk.encodeUint64(option)
      ]
    });

    // Sign and send transaction
    const txId = await signAndSendTransaction(this.client, voteTxn, voter);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  /**
   * Get current voting state
   */
  async getState(): Promise<VotingContractState> {
    const appInfo = await this.client.getApplicationByID(this.appId).do();
    const globalState = appInfo.params.globalState || [];

    const state: VotingContractState = {
      totalVotes: 0,
      optionA: 0,
      optionB: 0
    };

    for (const item of globalState) {
      const key = new TextDecoder().decode(item.key);
      const value = Number(item.value.uint) || 0;

      switch (key) {
        case 'total_votes':
          state.totalVotes = value;
          break;
        case 'option_a':
          state.optionA = value;
          break;
        case 'option_b':
          state.optionB = value;
          break;
      }
    }

    return state;
  }

  /**
   * Check if a user has voted
   */
  async hasUserVoted(userAddress: string): Promise<boolean> {
    try {
      const accountInfo = await this.client.accountInformation(userAddress).do();
      const localState = accountInfo.appsLocalState?.find(
        (app) => Number(app.id) === this.appId
      );

      if (!localState) return false;

      const votedState = localState.keyValue?.find(
        (kv) => new TextDecoder().decode(kv.key) === 'voted'
      );

      return Number(votedState?.value?.uint) === 1;
    } catch {
      return false;
    }
  }

  /**
   * Get voting results with percentages
   */
  async getResults(): Promise<{
    totalVotes: number;
    optionA: { votes: number; percentage: number };
    optionB: { votes: number; percentage: number };
  }> {
    const state = await this.getState();
    const { totalVotes, optionA, optionB } = state;

    return {
      totalVotes,
      optionA: {
        votes: optionA,
        percentage: totalVotes > 0 ? (optionA / totalVotes) * 100 : 0
      },
      optionB: {
        votes: optionB,
        percentage: totalVotes > 0 ? (optionB / totalVotes) * 100 : 0
      }
    };
  }

  /**
   * Delete the voting contract (only creator can do this)
   */
  async deleteContract(): Promise<string> {
    const suggestedParams = await getSuggestedParams(this.client);

    const deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({
      sender: this.creator.addr,
      suggestedParams,
      appIndex: this.appId
    });

    const txId = await signAndSendTransaction(this.client, deleteTxn, this.creator);
    await waitForConfirmation(this.client, txId);

    return txId;
  }

  get applicationId(): number {
    return this.appId;
  }
}

// Helper function to create a voting contract with default client
export async function createVotingContract(
  creator: algosdk.Account,
  optionAName: string,
  optionBName: string,
  network: 'TESTNET' | 'MAINNET' = 'TESTNET'
): Promise<VotingContract> {
  const client = createAlgodClient(network);
  return VotingContract.deploy(client, creator, optionAName, optionBName);
}
