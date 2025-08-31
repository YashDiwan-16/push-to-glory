import React from 'react';
import StakingDashboard from '../components/staking/StakingDashboard';
import StakingPools from '../components/staking/StakingPools';
import StakingCalculator from '../components/staking/StakingCalculator';
import Tabs from '../components/common/Tabs';

const Staking: React.FC = () => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      content: <StakingDashboard />
    },
    {
      id: 'pools',
      label: 'Staking Pools',
      content: <StakingPools />
    },
    {
      id: 'calculator',
      label: 'Calculator',
      content: <StakingCalculator />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Staking</h1>
          <p className="text-slate-600 mt-2">Earn rewards by staking your cryptocurrency</p>
        </div>

        <Tabs tabs={tabs} defaultTab="dashboard" />
      </div>
    </div>
  );
};

export default Staking;
