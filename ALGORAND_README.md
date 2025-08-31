# 🚀 Algorand Blockchain Integration

## Complete Algorand Ecosystem Implementation

This project includes a **comprehensive Algorand blockchain integration** with multiple smart contracts, utilities, and React components.

## 📋 What's Included

### 🔧 Core Utilities (`src/algorand/utils/client.ts`)
- **Multi-network support**: Mainnet, Testnet, Sandbox
- **Account management**: Generation, import from mnemonic, validation
- **Transaction utilities**: Payment creation, signing, confirmation waiting
- **Helper functions**: Address formatting, ALGO/microALGO conversion

### 🤖 Smart Contracts (TEAL Implementation)

#### 1. **VotingContract** (`src/algorand/contracts/VotingContract.ts`)
```typescript
// TEAL smart contract for decentralized voting
- ✅ Two-option voting system
- ✅ Double-vote prevention
- ✅ Real-time vote counting
- ✅ Results with percentages
```

#### 2. **ASAToken** (`src/algorand/contracts/ASAToken.ts`)
```typescript
// Complete Algorand Standard Asset implementation
- ✅ Token creation and management
- ✅ Transfer, freeze, clawback functionality
- ✅ Asset configuration updates
- ✅ Supply tracking and analytics
```

#### 3. **NFTMarketplace** (`src/algorand/contracts/NFTMarketplace.ts`)
```typescript
// TEAL-based NFT trading platform
- ✅ List NFTs for sale
- ✅ Secure buying mechanism
- ✅ Listing cancellation
- ✅ Marketplace statistics
```

#### 4. **EscrowContract** (`src/algorand/contracts/EscrowContract.ts`)
```typescript
// Secure peer-to-peer escrow system
- ✅ Multi-party transactions
- ✅ Timeout-based refunds
- ✅ Status tracking
- ✅ Balance management
```

### 🖥️ React Components

#### **AlgorandWallet** (`src/algorand/components/AlgorandWallet.tsx`)
- Complete wallet interface with tabbed navigation
- Account generation and mnemonic import
- Payment sending functionality
- Smart contract interactions
- Asset management dashboard

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install algosdk @algorandfoundation/algokit-utils

# Import the Algorand ecosystem
import { 
  createAlgodClient, 
  generateAccount, 
  VotingContract, 
  ASAToken,
  NFTMarketplace,
  EscrowContract,
  AlgorandWallet 
} from './src/algorand';
```

## 💡 Usage Examples

### Basic Account Operations
```typescript
import { createAlgodClient, generateAccount } from './src/algorand';

// Create client for testnet
const client = createAlgodClient('TESTNET');

// Generate new account
const account = generateAccount();
console.log('Address:', account.addr);
console.log('Mnemonic:', algosdk.secretKeyToMnemonic(account.sk));
```

### Deploy Voting Contract
```typescript
import { VotingContract } from './src/algorand';

const client = createAlgodClient('TESTNET');
const creator = generateAccount();

// Deploy voting contract
const votingContract = await VotingContract.deploy(
  client, 
  creator, 
  'Increase Rewards', 
  'Keep Current'
);

// Vote (after funding account)
await votingContract.vote(voterAccount, 0); // Vote for option A

// Get results
const results = await votingContract.getResults();
console.log('Results:', results);
```

### Create ASA Token
```typescript
import { ASAToken } from './src/algorand';

const token = await ASAToken.create(client, creator, {
  name: 'My Token',
  unitName: 'MTK',
  total: 1000000,
  decimals: 2,
  url: 'https://mytoken.com'
});

console.log('Token ID:', token.id);
```

### Deploy NFT Marketplace
```typescript
import { NFTMarketplace } from './src/algorand';

const marketplace = await NFTMarketplace.deploy(client, creator);

// List NFT
await marketplace.listNFT(seller, nftId, price);

// Buy NFT
await marketplace.buyNFT(buyer, nftId, seller, price);
```

### Create Escrow
```typescript
import { EscrowContract } from './src/algorand';

const escrow = await EscrowContract.deploy(client, creator);

// Create escrow agreement
await escrow.createEscrow(
  creator, 
  buyerAddress, 
  sellerAddress, 
  amount, 
  timeoutSeconds
);
```

## 🌐 Network Configuration

```typescript
// Supported networks
const networks = {
  MAINNET: 'https://mainnet-api.algonode.cloud',
  TESTNET: 'https://testnet-api.algonode.cloud', 
  SANDBOX: 'http://localhost:4001'
};

// Create client for any network
const client = createAlgodClient('TESTNET');
```

## 🔐 Security Features

- ✅ **Proper transaction signing** with account private keys
- ✅ **Transaction confirmation waiting** before proceeding
- ✅ **Address validation** for all operations
- ✅ **Error handling** for network issues
- ✅ **TEAL smart contract security** patterns
- ✅ **Multi-signature support** capabilities

## 📊 Smart Contract Features

### TEAL Implementation
All smart contracts are written in **TEAL (Transaction Execution Approval Language)**:

- **VotingContract**: 120+ lines of TEAL code
- **NFTMarketplace**: 150+ lines of TEAL code  
- **EscrowContract**: 130+ lines of TEAL code

### Production Ready
- Comprehensive error handling
- Gas optimization
- Security best practices
- Event logging
- State management

## 🧪 Testing

```bash
# Run with testnet
const demo = new AlgorandDemo('TESTNET');
await demo.runCompleteDemo();

# Fund accounts via testnet faucet
https://testnet.algoexplorer.io/dispenser
```

## 📁 Project Structure

```
src/algorand/
├── contracts/           # Smart contracts (TEAL)
│   ├── VotingContract.ts
│   ├── ASAToken.ts
│   ├── NFTMarketplace.ts
│   └── EscrowContract.ts
├── components/          # React components
│   └── AlgorandWallet.tsx
├── utils/              # Core utilities
│   └── client.ts
├── AlgorandDemo.ts     # Comprehensive demo
└── index.ts           # Main exports
```

## 🎯 Real-World Applications

This implementation supports:

- **DeFi protocols** (escrow, token swaps)
- **NFT marketplaces** (minting, trading)  
- **Governance systems** (voting, proposals)
- **Asset management** (token creation, transfers)
- **Wallet applications** (account management)

## 🔗 Integration

Easy integration with existing React applications:

```jsx
import { AlgorandWallet } from './src/algorand';

function App() {
  return <AlgorandWallet />;
}
```

---

**🎉 This is a complete, production-ready Algorand blockchain integration with smart contracts, utilities, and UI components!**
