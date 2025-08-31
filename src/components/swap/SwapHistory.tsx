import { TrendingUp, ArrowUpDown, Clock } from "lucide-react";
import { Card } from "../ui/card";

const SwapHistory = () => {
  const swapHistory = [
    {
      id: "1",
      fromToken: "ALGO",
      toToken: "USDC", 
      fromAmount: "100.00",
      toAmount: "228.00",
      rate: "2.28",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "completed",
      txHash: "A4B2C1D5E6F7G8H9"
    },
    {
      id: "2", 
      fromToken: "USDC",
      toToken: "ALGO",
      fromAmount: "456.00", 
      toAmount: "200.00",
      rate: "0.4386",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "completed",
      txHash: "B5C3D7E9F1G2H4I6"
    },
    {
      id: "3",
      fromToken: "ALGO", 
      toToken: "USDT",
      fromAmount: "75.50",
      toAmount: "172.14",
      rate: "2.28",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: "pending",
      txHash: "C6D4E8F0G3H5I7J9"
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending": 
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sans font-semibold text-xl text-slate-900">
          Recent Swaps
        </h3>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {swapHistory.map((swap) => (
          <div key={swap.id} className="flex items-center justify-between p-4 border border-slate-500/10 rounded-lg hover:border-slate-500/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 text-teal-600" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-slate-900">
                    {swap.fromAmount} {swap.fromToken} → {swap.toAmount} {swap.toToken}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(swap.status)}`}>
                    {swap.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTime(swap.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Rate: {swap.rate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-slate-900">
                +{swap.toAmount} {swap.toToken}
              </div>
              <div className="text-xs text-slate-500">
                -{swap.fromAmount} {swap.fromToken}
              </div>
            </div>
          </div>
        ))}
      </div>

      {swapHistory.length === 0 && (
        <div className="text-center py-12">
          <ArrowUpDown className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-2">No swaps yet</p>
          <p className="text-sm text-slate-400">
            Your swap history will appear here
          </p>
        </div>
      )}
    </Card>
  );
};

export default SwapHistory;
