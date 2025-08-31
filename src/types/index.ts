/**
 * Type definitions for AlgoWallet application
 * Centralized TypeScript interfaces and types
 */

// Base types
export type NetworkType = 'mainnet' | 'testnet' | 'betanet';
export type WalletType = 'pera' | 'myalgo' | 'walletconnect' | 'algosigner';
export type TransactionType = 'pay' | 'axfer' | 'acfg' | 'afrz' | 'appl' | 'keyreg';
export type AssetType = 'native' | 'arc3' | 'arc19' | 'arc69';

// Wallet interfaces
export interface WalletConfig {
  type: WalletType;
  name: string;
  icon: string;
  isInstalled: boolean;
  isSupported: boolean;
}

export interface WalletConnection {
  isConnected: boolean;
  address: string | null;
  network: NetworkType;
  walletType: WalletType | null;
  balance: number;
  timestamp: number;
}

export interface Account {
  address: string;
  amount: number;
  'amount-without-pending-rewards': number;
  'min-balance': number;
  'pending-rewards': number;
  'reward-base': number;
  'rewards': number;
  round: number;
  status: 'Offline' | 'Online' | 'NotParticipating';
  'total-apps-opted-in': number;
  'total-assets-opted-in': number;
  'total-created-apps': number;
  'total-created-assets': number;
  assets?: AssetHolding[];
  'created-assets'?: Asset[];
  'apps-local-state'?: AppLocalState[];
}

// Asset interfaces
export interface Asset {
  index: number;
  params: {
    'creator': string;
    'decimals': number;
    'default-frozen'?: boolean;
    'manager'?: string;
    'name'?: string;
    'name-b64'?: string;
    'reserve'?: string;
    'total': number;
    'unit-name'?: string;
    'unit-name-b64'?: string;
    'url'?: string;
    'url-b64'?: string;
    'metadata-hash'?: string;
    'clawback'?: string;
    'freeze'?: string;
  };
  deleted?: boolean;
}

export interface AssetHolding {
  'asset-id': number;
  amount: number;
  'is-frozen': boolean;
  'opt-in-round'?: number;
  'opted-in-at-round'?: number;
  'opted-out-at-round'?: number;
}

export interface AssetInfo extends Asset {
  name: string;
  unitName: string;
  decimals: number;
  total: number;
  url?: string;
  balance?: number;
  value?: number;
  change24h?: number;
  type?: AssetType;
}

// Transaction interfaces
export interface Transaction {
  id: string;
  type: TransactionType;
  sender: string;
  receiver?: string;
  amount?: number;
  fee: number;
  'first-valid': number;
  'last-valid': number;
  note?: string;
  'confirmed-round'?: number;
  'round-time'?: number;
  'asset-transfer-transaction'?: AssetTransferTransaction;
  'payment-transaction'?: PaymentTransaction;
  'application-transaction'?: ApplicationTransaction;
}

export interface PaymentTransaction {
  amount: number;
  receiver: string;
  'close-amount'?: number;
  'close-remainder-to'?: string;
}

export interface AssetTransferTransaction {
  amount: number;
  'asset-id': number;
  receiver: string;
  sender?: string;
  'close-amount'?: number;
  'close-to'?: string;
}

export interface ApplicationTransaction {
  'application-id': number;
  'on-completion': string;
  'application-args'?: string[];
  accounts?: string[];
  'foreign-apps'?: number[];
  'foreign-assets'?: number[];
  'global-state-schema'?: StateSchema;
  'local-state-schema'?: StateSchema;
  'approval-program'?: string;
  'clear-state-program'?: string;
}

export interface StateSchema {
  'num-byte-slice': number;
  'num-uint': number;
}

export interface AppLocalState {
  id: number;
  'key-value'?: KeyValue[];
  schema: StateSchema;
}

export interface KeyValue {
  key: string;
  value: {
    bytes?: string;
    type: number;
    uint?: number;
  };
}

// UI component interfaces
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  label: string;
  key: string;
  direction: 'asc' | 'desc';
}

// Portfolio interfaces
export interface PortfolioItem {
  asset: AssetInfo;
  balance: number;
  value: number;
  allocation: number;
  change24h: number;
  change7d?: number;
  change30d?: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  totalChange7d: number;
  totalChange30d: number;
  assets: PortfolioItem[];
  diversificationScore: number;
}

// Staking interfaces
export interface StakingPool {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  minStake: number;
  lockPeriod: number;
  rewards: {
    token: string;
    rate: number;
  }[];
  isActive: boolean;
}

export interface StakingPosition {
  poolId: string;
  amount: number;
  rewards: number;
  startDate: number;
  endDate?: number;
  isActive: boolean;
}

// NFT interfaces
export interface NFTMetadata {
  name: string;
  description?: string;
  image?: string;
  external_url?: string;
  attributes?: NFTAttribute[];
  properties?: Record<string, unknown>;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface NFT {
  assetId: number;
  name: string;
  description?: string;
  image?: string;
  metadata?: NFTMetadata;
  creator: string;
  collection?: string;
  rarity?: string;
  price?: number;
  lastSale?: number;
}

// Settings interfaces
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  notifications: {
    transactions: boolean;
    portfolio: boolean;
    news: boolean;
    security: boolean;
  };
  privacy: {
    analytics: boolean;
    dataCollection: boolean;
  };
  advanced: {
    expertMode: boolean;
    testnet: boolean;
    customRpc: string;
  };
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  sessionTimeout: number;
  autoLock: boolean;
  trustedDevices: string[];
  backupCreated: boolean;
  lastBackup?: number;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Error interfaces
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: number;
  recoverable: boolean;
}

// Context interfaces
export interface WalletContextType {
  connection: WalletConnection;
  account: Account | null;
  assets: AssetInfo[];
  transactions: Transaction[];
  isLoading: boolean;
  error: AppError | null;
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => Promise<void>;
  sendTransaction: (transaction: Partial<Transaction>) => Promise<string>;
  refreshData: () => Promise<void>;
}

// Form interfaces
export interface SendTransactionForm {
  recipient: string;
  amount: string;
  asset: string;
  note?: string;
  fee?: string;
}

export interface SwapForm {
  fromAsset: string;
  toAsset: string;
  amount: string;
  slippage: number;
  deadline: number;
}

export interface StakingForm {
  poolId: string;
  amount: string;
  duration: number;
}

// Event interfaces
export interface TransactionEvent {
  type: 'transaction_confirmed' | 'transaction_failed' | 'transaction_pending';
  transaction: Transaction;
  timestamp: number;
}

export interface WalletEvent {
  type: 'wallet_connected' | 'wallet_disconnected' | 'account_changed';
  data: unknown;
  timestamp: number;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

import type React from 'react';

export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;
export type ElementProps<T extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[T];
