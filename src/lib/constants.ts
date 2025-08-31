/**
 * Constants for the AlgoWallet application
 * Centralized configuration and constant values
 */

export const APP_CONFIG = {
  name: 'AlgoWallet',
  version: '1.0.0',
  description: 'Advanced Algorand Wallet Interface',
  author: 'AlgoWallet Team',
  repository: 'https://github.com/algowallet/algowallet',
  website: 'https://algowallet.app',
} as const;

export const ALGORAND_CONFIG = {
  mainnet: {
    algod: 'https://mainnet-api.algonode.cloud',
    indexer: 'https://mainnet-idx.algonode.cloud',
    token: '',
    port: '',
  },
  testnet: {
    algod: 'https://testnet-api.algonode.cloud',
    indexer: 'https://testnet-idx.algonode.cloud',
    token: '',
    port: '',
  },
  betanet: {
    algod: 'https://betanet-api.algonode.cloud',
    indexer: 'https://betanet-idx.algonode.cloud',
    token: '',
    port: '',
  },
} as const;

export const WALLET_TYPES = {
  PERA: 'pera',
  MYALGO: 'myalgo',
  WALLETCONNECT: 'walletconnect',
  ALGOSIGNER: 'algosigner',
} as const;

export const TRANSACTION_TYPES = {
  PAYMENT: 'pay',
  ASSET_TRANSFER: 'axfer',
  ASSET_CONFIG: 'acfg',
  ASSET_FREEZE: 'afrz',
  APPLICATION_CALL: 'appl',
  KEY_REGISTRATION: 'keyreg',
} as const;

export const ASSET_TYPES = {
  NATIVE: 'native',
  ARC3: 'arc3',
  ARC19: 'arc19',
  ARC69: 'arc69',
} as const;

export const NETWORK_NAMES = {
  MAINNET: 'MainNet',
  TESTNET: 'TestNet',
  BETANET: 'BetaNet',
} as const;

export const API_ENDPOINTS = {
  ASSETS: '/v2/assets',
  ACCOUNTS: '/v2/accounts',
  TRANSACTIONS: '/v2/transactions',
  APPLICATIONS: '/v2/applications',
  BLOCKS: '/v2/blocks',
} as const;

export const STORAGE_KEYS = {
  WALLET_CONNECTION: 'algowallet_connection',
  USER_PREFERENCES: 'algowallet_preferences',
  TRANSACTION_HISTORY: 'algowallet_transactions',
  FAVORITE_ASSETS: 'algowallet_favorites',
  PORTFOLIO_SETTINGS: 'algowallet_portfolio',
} as const;

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  THROTTLE_DELAY: 1000,
  PAGINATION_SIZE: 20,
  MAX_RETRIES: 3,
  TIMEOUT_DURATION: 10000,
} as const;

export const VALIDATION_RULES = {
  ALGORAND_ADDRESS_LENGTH: 58,
  TRANSACTION_NOTE_MAX_LENGTH: 1000,
  ASSET_NAME_MAX_LENGTH: 32,
  ASSET_UNIT_NAME_MAX_LENGTH: 8,
  MIN_TRANSACTION_FEE: 1000,
  MIN_ACCOUNT_BALANCE: 100000,
} as const;

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  INVALID_ADDRESS: 'Please enter a valid Algorand address',
  TRANSACTION_FAILED: 'Transaction failed. Please try again',
  NETWORK_ERROR: 'Network error. Please check your connection',
  ASSET_NOT_FOUND: 'Asset not found',
  INVALID_AMOUNT: 'Please enter a valid amount',
} as const;

export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_SENT: 'Transaction sent successfully',
  ASSET_ADDED: 'Asset added to your wallet',
  SETTINGS_SAVED: 'Settings saved successfully',
  BACKUP_CREATED: 'Backup created successfully',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const COLORS = {
  PRIMARY: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PORTFOLIO: '/portfolio',
  SECURITY: '/security',
  SETTINGS: '/settings',
  STAKING: '/staking',
  SWAP: '/swap',
  NFT_GALLERY: '/nft-gallery',
  CONTACT: '/contact',
} as const;

export const FEATURE_FLAGS = {
  ENABLE_STAKING: true,
  ENABLE_NFT_GALLERY: true,
  ENABLE_SWAP: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
} as const;

export const REGEX_PATTERNS = {
  ALGORAND_ADDRESS: /^[A-Z2-7]{58}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s()-]+$/,
  URL: /^https?:\/\/.+/,
  NUMERIC: /^\d+(\.\d+)?$/,
} as const;

export default APP_CONFIG;
