import { Button } from "../ui/button";
import { ExternalLink, Wallet, LogOut } from "lucide-react";
import { useWallet } from "../../contexts/WalletContext";

const Navbar = () => {
  const { walletAddress, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-slate-500/20">
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="font-sans font-bold text-xl text-foreground">
              AlgoWallet
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#security" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Security
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            {!isConnected ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:inline-flex items-center gap-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <Wallet className="h-4 w-4" />
                  {isConnecting ? 'Connecting...' : 'Connect Pera'}
                </Button>
                
                <Button variant="outline" size="sm" className="hidden lg:inline-flex" >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal-600/10 border border-teal-600/20 rounded-md">
                  <Wallet className="h-4 w-4 text-teal-600" />
                  <span className="text-sm font-medium text-teal-600">
                    {formatAddress(walletAddress!)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden sm:inline-flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  onClick={disconnectWallet}
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </Button>
              </>
            )}
            <Button size="sm" className="bg-teal-600 text-white hover:bg-teal-600/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;