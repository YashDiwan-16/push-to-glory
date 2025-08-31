import React from 'react';
import { Activity, DollarSign, PieChart, Users } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

interface PoolStats {
  totalValueLocked: number;
  totalStakers: number;
  averageStake: number;
  totalRewardsDistributed: number;
  poolUtilization: number;
}

const StakingDashboard: React.FC = () => {
  const [stats] = React.useState<PoolStats>({
    totalValueLocked: 4500000,
    totalStakers: 1247,
    averageStake: 3612,
    totalRewardsDistributed: 125000,
    poolUtilization: 78
  });

  const [myStakingData] = React.useState({
    totalStaked: 2500,
    activeStakes: 3,
    pendingRewards: 142.35,
    nextRewardDate: '2024-12-25'
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Staking Dashboard</h2>
        <p className="text-slate-600 mt-1">Monitor your staking performance and pool statistics</p>
      </div>

      {/* My Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Total Staked</p>
              <p className="text-2xl font-bold">{myStakingData.totalStaked.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-teal-200" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Active Stakes</p>
              <p className="text-2xl font-bold text-slate-900">{myStakingData.activeStakes}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Pending Rewards</p>
              <p className="text-2xl font-bold text-green-600">${myStakingData.pendingRewards}</p>
            </div>
            <PieChart className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Next Reward</p>
              <p className="text-lg font-bold text-slate-900">{myStakingData.nextRewardDate}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Pool Statistics */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Pool Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Total Value Locked</span>
                <span className="font-semibold text-slate-900">
                  ${stats.totalValueLocked.toLocaleString()}
                </span>
              </div>
              <ProgressBar progress={85} color="teal" showPercentage />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Pool Utilization</span>
                <span className="font-semibold text-slate-900">{stats.poolUtilization}%</span>
              </div>
              <ProgressBar progress={stats.poolUtilization} color="blue" showPercentage />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Reward Distribution</span>
                <span className="font-semibold text-slate-900">92%</span>
              </div>
              <ProgressBar progress={92} color="green" showPercentage />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-slate-100">
              <span className="text-slate-600">Total Stakers</span>
              <span className="font-semibold text-slate-900">{stats.totalStakers.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-slate-100">
              <span className="text-slate-600">Average Stake</span>
              <span className="font-semibold text-slate-900">${stats.averageStake.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-slate-100">
              <span className="text-slate-600">Total Rewards Distributed</span>
              <span className="font-semibold text-green-600">${stats.totalRewardsDistributed.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-slate-600">Network Fee</span>
              <span className="font-semibold text-slate-900">0.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Staked 500 ALGO', time: '2 hours ago', type: 'stake' },
            { action: 'Claimed 12.5 ALGO rewards', time: '1 day ago', type: 'claim' },
            { action: 'Unstaked 200 USDC', time: '3 days ago', type: 'unstake' },
            { action: 'Joined High Yield Pool', time: '1 week ago', type: 'join' }
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'stake' ? 'bg-green-500' :
                  activity.type === 'claim' ? 'bg-blue-500' :
                  activity.type === 'unstake' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}></div>
                <span className="text-slate-900">{activity.action}</span>
              </div>
              <span className="text-sm text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StakingDashboard;
