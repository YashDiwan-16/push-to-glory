import React, { createContext, useContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  peraWallet: PeraWalletConnect | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [peraWallet] = useState(() => new PeraWalletConnect());

  useEffect(() => {
    // Reconnect to session if it exists
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      })
      .catch(() => {
        // Session doesn't exist or expired
        setWalletAddress(null);
        setIsConnected(false);
      });

    // Subscribe to wallet connection events
    peraWallet.connector?.on('disconnect', () => {
      setWalletAddress(null);
      setIsConnected(false);
    });
  }, [peraWallet]);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const accounts = await peraWallet.connect();
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        console.log('Connected to Pera Wallet:', accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect to Pera Wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    peraWallet.disconnect();
    setWalletAddress(null);
    setIsConnected(false);
    console.log('Disconnected from Pera Wallet');
  };

  const value: WalletContextType = {
    walletAddress,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    peraWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
