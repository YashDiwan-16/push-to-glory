import React from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: 'savings' | 'investment' | 'staking' | 'trading';
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
}

const InvestmentGoals: React.FC = () => {
  const [goals] = React.useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      target: 5000,
      current: 3250,
      deadline: '2025-06-01',
      category: 'savings',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'ALGO Portfolio',
      target: 10000,
      current: 8750,
      deadline: '2025-03-15',
      category: 'investment',
      status: 'ahead'
    },
    {
      id: '3',
      title: 'Staking Rewards',
      target: 1000,
      current: 450,
      deadline: '2025-12-31',
      category: 'staking',
      status: 'behind'
    },
    {
      id: '4',
      title: 'DeFi Portfolio',
      target: 2500,
      current: 2500,
      deadline: '2024-12-31',
      category: 'trading',
      status: 'completed'
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings':
        return '💰';
      case 'investment':
        return '📈';
      case 'staking':
        return '🏦';
      case 'trading':
        return '🔄';
      default:
        return '🎯';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'ahead':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'behind':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Target className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'ahead':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'behind':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'ahead':
        return 'blue';
      case 'behind':
        return 'yellow';
      default:
        return 'teal';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Investment Goals</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Add New Goal
        </button>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{goals.length}</div>
            <div className="text-sm text-slate-600">Total Goals</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {goals.filter(g => g.status === 'completed').length}
            </div>
            <div className="text-sm text-slate-600">Completed</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {goals.filter(g => g.status === 'ahead').length}
            </div>
            <div className="text-sm text-slate-600">Ahead</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {goals.filter(g => g.status === 'behind').length}
            </div>
            <div className="text-sm text-slate-600">Behind</div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          const daysRemaining = getDaysRemaining(goal.deadline);
          
          return (
            <div key={goal.id} className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{goal.title}</h3>
                    <p className="text-sm text-slate-500 capitalize">{goal.category} goal</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(goal.status)}`}>
                  {getStatusIcon(goal.status)}
                  <span className="text-sm font-medium capitalize">{goal.status.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Progress</span>
                    <span className="text-sm font-medium text-slate-900">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar 
                    progress={progress} 
                    color={getProgressColor(goal.status) as any}
                    showPercentage 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Remaining: </span>
                    <span className="font-medium text-slate-900">
                      ${(goal.target - goal.current).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Deadline: </span>
                    <span className="font-medium text-slate-900">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Days left: </span>
                    <span className={`font-medium ${
                      daysRemaining < 30 ? 'text-red-600' : 
                      daysRemaining < 90 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {daysRemaining > 0 ? daysRemaining : 'Overdue'}
                    </span>
                  </div>
                </div>

                {goal.status !== 'completed' && (
                  <div className="flex space-x-3 pt-2">
                    <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Add Funds
                    </button>
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                      Edit Goal
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Goal Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p className="text-sm text-slate-700">
              Consider increasing your Emergency Fund contribution by $200/month to reach your goal on time.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-slate-700">
              Your ALGO Portfolio is ahead of schedule. Consider setting a higher target or starting a new goal.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <p className="text-sm text-slate-700">
              Your Staking Rewards goal is behind. Consider staking more ALGO or extending the deadline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGoals;
