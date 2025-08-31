import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  // Mock data - in real app, this would come from wallet/API
  const mockData = {
    algoBalance: 1245.67,
    usdValue: 2834.21,
    change24h: 5.67,
    isPositive: true
  };

  const formatBalance = (amount: number, showValue: boolean = true) => {
    if (!showValue) return "••••••";
    return amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans font-semibold text-lg">Total Balance</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
          className="text-white hover:bg-white/20 p-2"
        >
          {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {formatBalance(mockData.algoBalance, showBalance)}
          </span>
          <span className="text-lg opacity-90">ALGO</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg opacity-90">
              ${formatBalance(mockData.usdValue, showBalance)}
            </span>
            <span className="text-sm opacity-75">USD</span>
          </div>

          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            mockData.isPositive 
              ? 'bg-green-500/20 text-green-100' 
              : 'bg-red-500/20 text-red-100'
          }`}>
            {mockData.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {mockData.isPositive ? '+' : ''}{mockData.change24h}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs opacity-75 mb-1">Available</p>
            <p className="font-semibold">
              {formatBalance(mockData.algoBalance * 0.8, showBalance)} ALGO
            </p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">Staked</p>
            <p className="font-semibold">
              {formatBalance(mockData.algoBalance * 0.15, showBalance)} ALGO
            </p>
          </div>
          <div>
            <p className="text-xs opacity-75 mb-1">Rewards</p>
            <p className="font-semibold">
              {formatBalance(mockData.algoBalance * 0.05, showBalance)} ALGO
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;
