import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useWallet } from "../../contexts/WalletContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  const handleWalletAction = () => {
    if (walletAddress) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-sans font-bold text-xl text-slate-900">
              AlgoWallet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
              Home
            </Link>
            
            {/* Wallet Features Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors">
                Wallet
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/portfolio" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Portfolio
                  </Link>
                  <Link to="/security" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Security
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Settings
                  </Link>
                </div>
              </div>
            </div>

            {/* DeFi Features Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors">
                DeFi
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/swap" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Swap
                  </Link>
                  <Link to="/staking" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Staking
                  </Link>
                  <a href="#liquidity" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Liquidity Pools
                  </a>
                  <a href="#yield" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                    Yield Farming
                  </a>
                </div>
              </div>
            </div>

            <Link to="/nft-gallery" className="text-slate-500 hover:text-slate-900 transition-colors">
              NFTs
            </Link>
            
            <a href="#features" className="text-slate-500 hover:text-slate-900 transition-colors">
              Features
            </a>
            
            <Link to="/contact" className="text-slate-500 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            
            <Button
              onClick={handleWalletAction}
              variant={walletAddress ? "outline" : "default"}
              className={`${
                walletAddress 
                  ? "border-slate-500/20 text-slate-900 hover:bg-slate-50" 
                  : "bg-teal-600 text-white hover:bg-teal-600/90"
              }`}
            >
              {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-500/10 py-4">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {/* Wallet Section */}
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Wallet</p>
                <Link 
                  to="/dashboard" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/portfolio" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
                <Link 
                  to="/security" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Security
                </Link>
                <Link 
                  to="/settings" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
              </div>
              
              {/* DeFi Section */}
              <div className="border-t border-slate-200 pt-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">DeFi</p>
                <Link 
                  to="/swap" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3"
                  onClick={() => setIsOpen(false)}
                >
                  Swap
                </Link>
                <Link 
                  to="/staking" 
                  className="text-slate-500 hover:text-slate-900 transition-colors block pl-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Staking
                </Link>
              </div>
              
              <Link 
                to="/nft-gallery" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                NFT Gallery
              </Link>
              
              <a 
                href="#features" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              
              <Link 
                to="/contact" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              <Button
                onClick={() => {
                  handleWalletAction();
                  setIsOpen(false);
                }}
                variant={walletAddress ? "outline" : "default"}
                className={`${
                  walletAddress 
                    ? "border-slate-500/20 text-slate-900 hover:bg-slate-50" 
                    : "bg-teal-600 text-white hover:bg-teal-600/90"
                }`}
              >
                {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;