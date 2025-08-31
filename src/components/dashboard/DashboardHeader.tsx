import { Calendar, User, Settings } from "lucide-react";
import { useWallet } from "../../contexts/WalletContext";

const DashboardHeader = () => {
  const { walletAddress } = useWallet();

  const getCurrentTime = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Welcome Section */}
        <div>
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 mb-2">
            Welcome back! 👋
          </h1>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>{getCurrentTime()}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {walletAddress && (
            <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-slate-500/10">
              <div className="w-8 h-8 rounded-full bg-teal-600/10 flex items-center justify-center">
                <User className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {formatAddress(walletAddress)}
                </p>
                <p className="text-xs text-slate-500">Connected Wallet</p>
              </div>
            </div>
          )}
          
          <button className="p-2 rounded-lg border border-slate-500/10 bg-white hover:bg-slate-50 transition-colors">
            <Settings className="h-5 w-5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
