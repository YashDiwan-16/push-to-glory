import React from 'react';
import { TrendingUp, Calendar, Award, Lock } from 'lucide-react';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

interface StakingPool {
  id: string;
  name: string;
  symbol: string;
  apy: number;
  totalStaked: number;
  myStake: number;
  minStake: number;
  lockPeriod: string;
  status: 'active' | 'ended' | 'coming-soon';
  timeLeft?: string;
}

const StakingPools: React.FC = () => {
  const [pools] = React.useState<StakingPool[]>([
    {
      id: '1',
      name: 'Algorand Staking',
      symbol: 'ALGO',
      apy: 8.5,
      totalStaked: 1500000,
      myStake: 1000,
      minStake: 100,
      lockPeriod: '30 days',
      status: 'active',
      timeLeft: '25 days'
    },
    {
      id: '2',
      name: 'USDC Liquidity Pool',
      symbol: 'USDC',
      apy: 12.3,
      totalStaked: 2300000,
      myStake: 500,
      minStake: 50,
      lockPeriod: '90 days',
      status: 'active',
      timeLeft: '67 days'
    },
    {
      id: '3',
      name: 'High Yield Pool',
      symbol: 'HYP',
      apy: 25.8,
      totalStaked: 750000,
      myStake: 0,
      minStake: 200,
      lockPeriod: '180 days',
      status: 'coming-soon'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'ended':
        return 'secondary';
      case 'coming-soon':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Staking Pools</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Create Pool
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <div key={pool.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{pool.name}</h3>
                <p className="text-sm text-slate-500">{pool.symbol}</p>
              </div>
              <Badge variant={getStatusColor(pool.status) as 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} size="sm">
                {pool.status.replace('-', ' ')}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">APY</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-green-600">{pool.apy}%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Total Staked</span>
                  <span className="font-medium">{pool.totalStaked.toLocaleString()} {pool.symbol}</span>
                </div>
                <ProgressBar progress={75} color="teal" size="sm" />
              </div>

              {pool.myStake > 0 && (
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">My Stake</span>
                    <span className="font-medium">{pool.myStake} {pool.symbol}</span>
                  </div>
                  {pool.timeLeft && (
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{pool.timeLeft} remaining</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Min: {pool.minStake} {pool.symbol}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{pool.lockPeriod}</span>
                </div>
              </div>

              <button 
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  pool.status === 'active' 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
                disabled={pool.status !== 'active'}
              >
                {pool.myStake > 0 ? 'Manage Stake' : 'Stake Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StakingPools;
