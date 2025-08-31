import React from 'react';
import { Sprout, Clock, Target, Zap } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

interface YieldFarm {
  id: string;
  name: string;
  protocol: string;
  tokens: string[];
  apy: number;
  tvl: number;
  myStake: number;
  rewards: number;
  lockPeriod: string;
  status: 'active' | 'ended' | 'upcoming';
  risk: 'low' | 'medium' | 'high';
}

const YieldFarming: React.FC = () => {
  const [farms] = React.useState<YieldFarm[]>([
    {
      id: '1',
      name: 'ALGO-USDC LP',
      protocol: 'AlgoSwap',
      tokens: ['ALGO', 'USDC'],
      apy: 42.8,
      tvl: 1200000,
      myStake: 2500,
      rewards: 145.30,
      lockPeriod: 'No lock',
      status: 'active',
      risk: 'low'
    },
    {
      id: '2',
      name: 'HIGH YIELD FARM',
      protocol: 'DeFiMax',
      tokens: ['HYF', 'ALGO'],
      apy: 125.6,
      tvl: 450000,
      myStake: 1000,
      rewards: 89.45,
      lockPeriod: '30 days',
      status: 'active',
      risk: 'high'
    },
    {
      id: '3',
      name: 'Stable Farm',
      protocol: 'StableYield',
      tokens: ['USDC', 'USDT'],
      apy: 18.2,
      tvl: 2800000,
      myStake: 0,
      rewards: 0,
      lockPeriod: 'No lock',
      status: 'active',
      risk: 'low'
    },
    {
      id: '4',
      name: 'Beta Farm',
      protocol: 'NewDeFi',
      tokens: ['BETA', 'ALGO'],
      apy: 89.4,
      tvl: 150000,
      myStake: 0,
      rewards: 0,
      lockPeriod: '7 days',
      status: 'upcoming',
      risk: 'medium'
    }
  ]);

  const getTokenIcons = (tokens: string[]) => {
    const icons = {
      'ALGO': '🔵',
      'USDC': '💵',
      'USDT': '💰',
      'HYF': '🚀',
      'BETA': '🔬'
    };
    return tokens.map(token => icons[token as keyof typeof icons] || '🪙').join(' + ');
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const totalStaked = farms.reduce((sum, farm) => sum + farm.myStake, 0);
  const totalRewards = farms.reduce((sum, farm) => sum + farm.rewards, 0);
  const activeFarms = farms.filter(farm => farm.myStake > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Yield Farming</h2>
          <p className="text-slate-600 mt-1">Earn high yields by farming LP tokens</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Explore Farms
        </button>
      </div>

      {/* Farming Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Staked</p>
              <p className="text-2xl font-bold">${totalStaked.toLocaleString()}</p>
            </div>
            <Sprout className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Active Farms</p>
              <p className="text-2xl font-bold text-slate-900">{activeFarms}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Pending Rewards</p>
              <p className="text-2xl font-bold text-green-600">${totalRewards.toFixed(2)}</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Avg APY</p>
              <p className="text-2xl font-bold text-purple-600">67.2%</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Farm List */}
      <div className="space-y-4">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{getTokenIcons(farm.tokens)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{farm.name}</h3>
                  <p className="text-sm text-slate-500">{farm.protocol}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(farm.status)}`}>
                  {farm.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(farm.risk)}`}>
                  {farm.risk} risk
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">APY</p>
                <p className="text-lg font-bold text-green-600">{farm.apy}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">TVL</p>
                <p className="font-semibold text-slate-900">${farm.tvl.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">My Stake</p>
                <p className="font-semibold text-slate-900">${farm.myStake.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Rewards</p>
                <p className="font-semibold text-green-600">${farm.rewards.toFixed(2)}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Lock Period</p>
                <p className="font-semibold text-slate-900">{farm.lockPeriod}</p>
              </div>
            </div>

            {farm.myStake > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Farm Progress</span>
                  <span className="text-sm font-medium text-slate-900">
                    {((farm.myStake / farm.tvl) * 100).toFixed(3)}% of pool
                  </span>
                </div>
                <ProgressBar progress={(farm.myStake / farm.tvl) * 100 * 10} color="green" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500">
                <span>Tokens: {farm.tokens.join(' + ')}</span>
              </div>
              <div className="flex space-x-2">
                {farm.rewards > 0 && (
                  <button className="px-4 py-2 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    Harvest
                  </button>
                )}
                {farm.status === 'active' && (
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    {farm.myStake > 0 ? 'Manage' : 'Stake'}
                  </button>
                )}
                {farm.status === 'upcoming' && (
                  <button disabled className="px-4 py-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Warning */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 text-amber-600 mt-0.5">⚠️</div>
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Yield Farming Risks</p>
            <p>Yield farming involves risks including impermanent loss, smart contract bugs, and token price volatility. Higher APY farms typically carry higher risks. Always DYOR and never invest more than you can afford to lose.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldFarming;
