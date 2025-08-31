import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Wallet, Send, Vote, Coins, Users, Eye, EyeOff } from 'lucide-react';
import algosdk from 'algosdk';
import { 
  createAlgodClient, 
  generateAccount, 
  importAccountFromMnemonic,
  getAccountInfo,
  createPaymentTransaction,
  signAndSendTransaction,
  getSuggestedParams,
  waitForConfirmation,
  formatAddress,
  microAlgosToAlgos,
  algosToMicroAlgos,
  isValidAddress
} from '../utils/client';
import { VotingContract } from '../contracts/VotingContract';
import { ASAToken } from '../contracts/ASAToken';

interface WalletState {
  account: algosdk.Account | null;
  balance: number;
  assets: any[];
  isConnected: boolean;
}

const AlgorandWallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    account: null,
    balance: 0,
    assets: [],
    isConnected: false
  });
  
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [importMnemonic, setImportMnemonic] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Voting state
  const [votingContractId, setVotingContractId] = useState('');
  const [voteOption, setVoteOption] = useState<0 | 1>(0);
  const [votingResults, setVotingResults] = useState<any>(null);
  
  // Token state
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('0');

  const client = createAlgodClient('TESTNET');

  // Load wallet balance and assets
  const loadWalletData = async () => {
    if (!wallet.account) return;

    try {
      const accountInfo = await getAccountInfo(client, wallet.account.addr);
      const balance = microAlgosToAlgos(Number(accountInfo.amount));
      const assets = accountInfo.assets || [];

      setWallet(prev => ({
        ...prev,
        balance,
        assets
      }));
    } catch (error) {
      console.error('Error loading wallet data:', error);
      setMessage('Error loading wallet data');
    }
  };

  useEffect(() => {
    if (wallet.isConnected) {
      loadWalletData();
    }
  }, [wallet.isConnected]);

  // Generate new account
  const handleGenerateAccount = () => {
    const account = generateAccount();
    setWallet({
      account,
      balance: 0,
      assets: [],
      isConnected: true
    });
    setMessage('New account generated successfully!');
  };

  // Import account from mnemonic
  const handleImportAccount = () => {
    try {
      const account = importAccountFromMnemonic(importMnemonic.trim());
      setWallet({
        account,
        balance: 0,
        assets: [],
        isConnected: true
      });
      setImportMnemonic('');
      setMessage('Account imported successfully!');
    } catch (error) {
      setMessage('Invalid mnemonic phrase');
    }
  };

  // Send payment
  const handleSendPayment = async () => {
    if (!wallet.account || !sendTo || !sendAmount) return;

    if (!isValidAddress(sendTo)) {
      setMessage('Invalid recipient address');
      return;
    }

    setIsLoading(true);
    try {
      const suggestedParams = await getSuggestedParams(client);
      const amount = algosToMicroAlgos(parseFloat(sendAmount));
      
      const transaction = createPaymentTransaction(
        wallet.account.addr,
        sendTo,
        amount,
        suggestedParams
      );

      const txId = await signAndSendTransaction(client, transaction, wallet.account);
      await waitForConfirmation(client, txId);

      setMessage(`Payment sent successfully! TxID: ${txId}`);
      setSendAmount('');
      setSendTo('');
      await loadWalletData();
    } catch (error) {
      setMessage(`Error sending payment: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Create voting contract
  const handleCreateVotingContract = async () => {
    if (!wallet.account) return;

    setIsLoading(true);
    try {
      const contract = await VotingContract.deploy(
        client,
        wallet.account,
        'Option A',
        'Option B'
      );

      setMessage(`Voting contract created! App ID: ${contract.applicationId}`);
      setVotingContractId(contract.applicationId.toString());
    } catch (error) {
      setMessage(`Error creating voting contract: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Vote in contract
  const handleVote = async () => {
    if (!wallet.account || !votingContractId) return;

    setIsLoading(true);
    try {
      const contract = new VotingContract(
        client,
        parseInt(votingContractId),
        wallet.account
      );

      const txId = await contract.vote(wallet.account, voteOption);
      setMessage(`Vote submitted successfully! TxID: ${txId}`);
      
      // Load voting results
      const results = await contract.getResults();
      setVotingResults(results);
    } catch (error) {
      setMessage(`Error voting: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Create ASA token
  const handleCreateToken = async () => {
    if (!wallet.account || !tokenName || !tokenSymbol || !tokenSupply) return;

    setIsLoading(true);
    try {
      const token = await ASAToken.create(client, wallet.account, {
        name: tokenName,
        unitName: tokenSymbol,
        total: parseInt(tokenSupply),
        decimals: parseInt(tokenDecimals)
      });

      setMessage(`Token created successfully! Asset ID: ${token.id}`);
      setTokenName('');
      setTokenSymbol('');
      setTokenSupply('');
      setTokenDecimals('0');
      await loadWalletData();
    } catch (error) {
      setMessage(`Error creating token: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-8">
        <Wallet className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Algorand Wallet</h1>
      </div>

      {message && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">{message}</p>
        </div>
      )}

      {!wallet.isConnected ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Generate New Account */}
          <Card>
            <CardHeader>
              <CardTitle>Generate New Account</CardTitle>
              <CardDescription>
                Create a new Algorand account with a random mnemonic phrase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateAccount} className="w-full">
                Generate Account
              </Button>
            </CardContent>
          </Card>

          {/* Import Account */}
          <Card>
            <CardHeader>
              <CardTitle>Import Account</CardTitle>
              <CardDescription>
                Import an existing account using a 25-word mnemonic phrase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mnemonic">Mnemonic Phrase</Label>
                <textarea
                  id="mnemonic"
                  className="w-full p-2 border rounded-md resize-none h-20"
                  placeholder="Enter your 25-word mnemonic phrase..."
                  value={importMnemonic}
                  onChange={(e) => setImportMnemonic(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleImportAccount} 
                className="w-full"
                disabled={!importMnemonic.trim()}
              >
                Import Account
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Account Information
                <Badge variant="outline">Connected</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Address</Label>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {wallet.account?.addr}
                </p>
              </div>
              <div>
                <Label>Balance</Label>
                <p className="text-2xl font-bold text-green-600">
                  {wallet.balance.toFixed(6)} ALGO
                </p>
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  Mnemonic Phrase
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMnemonic(!showMnemonic)}
                  >
                    {showMnemonic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </Label>
                {showMnemonic && (
                  <p className="font-mono text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                    {algosdk.secretKeyToMnemonic(wallet.account?.sk || new Uint8Array())}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="send">
                <Send className="h-4 w-4 mr-2" />
                Send
              </TabsTrigger>
              <TabsTrigger value="vote">
                <Vote className="h-4 w-4 mr-2" />
                Vote
              </TabsTrigger>
              <TabsTrigger value="token">
                <Coins className="h-4 w-4 mr-2" />
                Token
              </TabsTrigger>
              <TabsTrigger value="assets">
                <Users className="h-4 w-4 mr-2" />
                Assets
              </TabsTrigger>
            </TabsList>

            {/* Send Tab */}
            <TabsContent value="send">
              <Card>
                <CardHeader>
                  <CardTitle>Send Payment</CardTitle>
                  <CardDescription>
                    Send ALGO to another account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      placeholder="Algorand address..."
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount (ALGO)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleSendPayment}
                    disabled={isLoading || !sendTo || !sendAmount}
                    className="w-full"
                  >
                    {isLoading ? 'Sending...' : 'Send Payment'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vote Tab */}
            <TabsContent value="vote">
              <Card>
                <CardHeader>
                  <CardTitle>Voting</CardTitle>
                  <CardDescription>
                    Create and participate in voting contracts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleCreateVotingContract}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Creating...' : 'Create Voting Contract'}
                  </Button>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contractId">Contract ID</Label>
                    <Input
                      id="contractId"
                      placeholder="Enter voting contract ID..."
                      value={votingContractId}
                      onChange={(e) => setVotingContractId(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Vote Option</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={voteOption === 0 ? "default" : "outline"}
                        onClick={() => setVoteOption(0)}
                      >
                        Option A
                      </Button>
                      <Button
                        variant={voteOption === 1 ? "default" : "outline"}
                        onClick={() => setVoteOption(1)}
                      >
                        Option B
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleVote}
                    disabled={isLoading || !votingContractId}
                    className="w-full"
                  >
                    {isLoading ? 'Voting...' : 'Submit Vote'}
                  </Button>

                  {votingResults && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Voting Results</h4>
                      <div className="space-y-2 text-sm">
                        <div>Total Votes: {votingResults.totalVotes}</div>
                        <div>Option A: {votingResults.optionA.votes} ({votingResults.optionA.percentage.toFixed(1)}%)</div>
                        <div>Option B: {votingResults.optionB.votes} ({votingResults.optionB.percentage.toFixed(1)}%)</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Token Tab */}
            <TabsContent value="token">
              <Card>
                <CardHeader>
                  <CardTitle>Create Token</CardTitle>
                  <CardDescription>
                    Create a new Algorand Standard Asset (ASA)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tokenName">Token Name</Label>
                      <Input
                        id="tokenName"
                        placeholder="My Token"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tokenSymbol">Symbol</Label>
                      <Input
                        id="tokenSymbol"
                        placeholder="MTK"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tokenSupply">Total Supply</Label>
                      <Input
                        id="tokenSupply"
                        type="number"
                        placeholder="1000000"
                        value={tokenSupply}
                        onChange={(e) => setTokenSupply(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tokenDecimals">Decimals</Label>
                      <Input
                        id="tokenDecimals"
                        type="number"
                        min="0"
                        max="19"
                        placeholder="0"
                        value={tokenDecimals}
                        onChange={(e) => setTokenDecimals(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleCreateToken}
                    disabled={isLoading || !tokenName || !tokenSymbol || !tokenSupply}
                    className="w-full"
                  >
                    {isLoading ? 'Creating...' : 'Create Token'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assets Tab */}
            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                  <CardDescription>
                    View all assets in your wallet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wallet.assets.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No assets found</p>
                  ) : (
                    <div className="space-y-2">
                      {wallet.assets.map((asset) => (
                        <div key={asset.assetId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold">Asset ID: {asset.assetId}</p>
                            <p className="text-sm text-gray-600">Amount: {asset.amount}</p>
                          </div>
                          <Badge variant={asset.isFrozen ? "destructive" : "secondary"}>
                            {asset.isFrozen ? "Frozen" : "Active"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AlgorandWallet;
