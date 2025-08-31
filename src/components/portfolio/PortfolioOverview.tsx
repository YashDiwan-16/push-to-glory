import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  percentage: number;
  icon: string;
}

const PortfolioOverview: React.FC = () => {
  const [assets] = React.useState<Asset[]>([
    {
      symbol: 'ALGO',
      name: 'Algorand',
      balance: 2500,
      value: 875.00,
      change24h: 5.2,
      percentage: 45.8,
      icon: '🔵'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 650,
      value: 650.00,
      change24h: 0.1,
      percentage: 34.0,
      icon: '💵'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 0.15,
      value: 386.25,
      change24h: -2.1,
      percentage: 20.2,
      icon: '⚡'
    }
  ]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange24h = assets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0);
  const totalChangePercent = (totalChange24h / totalValue) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-teal-200" />
          </div>
          <div className="mt-2 flex items-center space-x-1">
            {totalChangePercent >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-300" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-300" />
            )}
            <span className={`text-sm font-medium ${
              totalChangePercent >= 0 ? 'text-green-300' : 'text-red-300'
            }`}>
              {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">24h Change</p>
              <p className={`text-2xl font-bold ${
                totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalChange24h >= 0 ? '+' : ''}${totalChange24h.toFixed(2)}
              </p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Assets</p>
              <p className="text-2xl font-bold text-slate-900">{assets.length}</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Avg Growth</p>
              <p className="text-2xl font-bold text-green-600">+8.4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Asset Allocation</h3>
        
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.symbol} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{asset.icon}</span>
                  <div>
                    <div className="font-medium text-slate-900">{asset.symbol}</div>
                    <div className="text-sm text-slate-500">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">${asset.value.toLocaleString()}</div>
                  <div className="text-sm text-slate-500">{asset.balance.toLocaleString()} {asset.symbol}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <ProgressBar 
                    progress={asset.percentage} 
                    color={asset.symbol === 'ALGO' ? 'teal' : asset.symbol === 'USDC' ? 'green' : 'blue'}
                    size="sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{asset.percentage}%</span>
                  <div className={`flex items-center space-x-1 ${
                    asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-medium">
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-medium text-slate-900 mb-4">Best Performer</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔵</span>
            <div>
              <div className="font-semibold text-slate-900">ALGO</div>
              <div className="text-green-600 text-sm font-medium">+5.2%</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-medium text-slate-900 mb-4">Largest Holding</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔵</span>
            <div>
              <div className="font-semibold text-slate-900">ALGO</div>
              <div className="text-slate-600 text-sm">45.8% of portfolio</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-medium text-slate-900 mb-4">Diversification</h4>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-slate-600">Assets</div>
            <div className="text-xs text-slate-500 mt-1">Well diversified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
