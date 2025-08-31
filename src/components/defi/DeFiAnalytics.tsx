import React from 'react';
import { BarChart3, Activity, TrendingUp, Calendar } from 'lucide-react';

const DeFiAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = React.useState('7d');

  const analyticsData = {
    totalValueLocked: 12500000,
    totalVolume24h: 1850000,
    totalFees24h: 12450,
    totalUsers: 8432,
    protocols: [
      { name: 'AlgoSwap', tvl: 4200000, change: 8.5 },
      { name: 'DeFiMax', tvl: 3100000, change: -2.1 },
      { name: 'StableYield', tvl: 2800000, change: 15.3 },
      { name: 'YieldFarm', tvl: 1900000, change: 4.7 },
      { name: 'LiquidityHub', tvl: 500000, change: 22.1 }
    ],
    categoryBreakdown: [
      { category: 'DEX', percentage: 42, value: 5250000 },
      { category: 'Lending', percentage: 28, value: 3500000 },
      { category: 'Staking', percentage: 18, value: 2250000 },
      { category: 'Yield Farming', percentage: 12, value: 1500000 }
    ]
  };

  const portfolioMetrics = {
    totalInvested: 8750,
    currentValue: 9420,
    totalGain: 670,
    gainPercentage: 7.66,
    impermanentLoss: -125,
    feesEarned: 245
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">DeFi Analytics</h2>
          <p className="text-slate-600 mt-1">Track DeFi protocols and your portfolio performance</p>
        </div>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                timeframe === period
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Overall DeFi Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total TVL</p>
              <p className="text-2xl font-bold">${(analyticsData.totalValueLocked / 1000000).toFixed(1)}M</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-200" />
          </div>
          <div className="mt-2 text-sm text-blue-100">+12.4% from last week</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">24h Volume</p>
              <p className="text-2xl font-bold text-slate-900">
                ${(analyticsData.totalVolume24h / 1000000).toFixed(1)}M
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2 text-sm text-green-600">+8.7% from yesterday</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">24h Fees</p>
              <p className="text-2xl font-bold text-slate-900">${analyticsData.totalFees24h.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-2 text-sm text-purple-600">+15.2% from yesterday</div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-slate-900">{analyticsData.totalUsers.toLocaleString()}</p>
            </div>
            <Calendar className="w-8 h-8 text-teal-500" />
          </div>
          <div className="mt-2 text-sm text-teal-600">+5.3% from last week</div>
        </div>
      </div>

      {/* My Portfolio Performance */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">My DeFi Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600">Invested</p>
            <p className="text-lg font-bold text-slate-900">${portfolioMetrics.totalInvested.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Current Value</p>
            <p className="text-lg font-bold text-teal-600">${portfolioMetrics.currentValue.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Total Gain</p>
            <p className="text-lg font-bold text-green-600">+${portfolioMetrics.totalGain}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Gain %</p>
            <p className="text-lg font-bold text-green-600">+{portfolioMetrics.gainPercentage}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">IL</p>
            <p className="text-lg font-bold text-red-600">${portfolioMetrics.impermanentLoss}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Fees Earned</p>
            <p className="text-lg font-bold text-blue-600">${portfolioMetrics.feesEarned}</p>
          </div>
        </div>
      </div>

      {/* Protocol Rankings */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Protocols by TVL</h3>
        <div className="space-y-4">
          {analyticsData.protocols.map((protocol, index) => (
            <div key={protocol.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{protocol.name}</p>
                  <p className="text-sm text-slate-500">${(protocol.tvl / 1000000).toFixed(1)}M TVL</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  protocol.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {protocol.change >= 0 ? '+' : ''}{protocol.change}%
                </p>
                <p className="text-xs text-slate-500">7d change</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">TVL by Category</h3>
        <div className="space-y-4">
          {analyticsData.categoryBreakdown.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-900">{category.category}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-900">
                    ${(category.value / 1000000).toFixed(1)}M
                  </span>
                  <span className="text-xs text-slate-500 ml-2">({category.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Trending Protocols</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• LiquidityHub gained 22.1% TVL in the last 7 days</li>
              <li>• StableYield reached new all-time high TVL</li>
              <li>• New yield farming opportunities on AlgoSwap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Market Trends</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• DeFi TVL increased 12.4% this week</li>
              <li>• Lending protocols showing strong growth</li>
              <li>• Average APY across farms: 67.2%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiAnalytics;
