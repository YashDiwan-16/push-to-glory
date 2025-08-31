import React from 'react';
import { Calculator, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const StakingCalculator: React.FC = () => {
  const [amount, setAmount] = React.useState('');
  const [selectedPool, setSelectedPool] = React.useState('algo');
  const [duration, setDuration] = React.useState('30');

  const pools = {
    algo: { name: 'Algorand', apy: 8.5, symbol: 'ALGO' },
    usdc: { name: 'USDC Pool', apy: 12.3, symbol: 'USDC' },
    hyp: { name: 'High Yield', apy: 25.8, symbol: 'HYP' }
  };

  const calculateRewards = () => {
    const principal = parseFloat(amount) || 0;
    const apy = pools[selectedPool as keyof typeof pools].apy;
    const days = parseInt(duration);
    
    const dailyRate = apy / 365 / 100;
    const rewards = principal * dailyRate * days;
    const total = principal + rewards;
    
    return { rewards, total };
  };

  const { rewards, total } = calculateRewards();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-5 h-5 text-teal-600" />
        <h3 className="text-lg font-semibold text-slate-900">Staking Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stake Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount to stake"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Staking Pool
          </label>
          <select
            value={selectedPool}
            onChange={(e) => setSelectedPool(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {Object.entries(pools).map(([key, pool]) => (
              <option key={key} value={key}>
                {pool.name} - {pool.apy}% APY
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Staking Duration (Days)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="180">180 Days</option>
            <option value="365">365 Days</option>
          </select>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg space-y-3">
          <h4 className="font-medium text-slate-900">Estimated Returns</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Principal:</span>
              <span className="font-medium">{amount || '0'} {pools[selectedPool as keyof typeof pools].symbol}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-600">Estimated Rewards:</span>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600">
                  {rewards.toFixed(4)} {pools[selectedPool as keyof typeof pools].symbol}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="font-medium text-slate-900">Total:</span>
              <span className="font-semibold text-slate-900">
                {total.toFixed(4)} {pools[selectedPool as keyof typeof pools].symbol}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Rewards compound daily</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Important Notice</p>
              <p>These are estimated returns based on current APY rates. Actual returns may vary due to market conditions and pool performance.</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
          Start Staking
        </button>
      </div>
    </div>
  );
};

export default StakingCalculator;
