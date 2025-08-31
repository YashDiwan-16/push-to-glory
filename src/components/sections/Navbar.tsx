import { useState } from "react";
import { Menu, X } from "lucide-react";
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
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-slate-500 hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <a href="#features" className="text-slate-500 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#security" className="text-slate-500 hover:text-slate-900 transition-colors">
              Security
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
              <Link 
                to="/dashboard" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <a 
                href="#features" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a 
                href="#security" 
                className="text-slate-500 hover:text-slate-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Security
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