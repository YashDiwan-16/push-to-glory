import React from 'react';
import PortfolioOverview from '../components/portfolio/PortfolioOverview';
import TransactionHistory from '../components/portfolio/TransactionHistory';
import InvestmentGoals from '../components/portfolio/InvestmentGoals';
import Tabs from '../components/common/Tabs';

const Portfolio: React.FC = () => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <PortfolioOverview />
    },
    {
      id: 'transactions',
      label: 'Transactions',
      content: <TransactionHistory />
    },
    {
      id: 'goals',
      label: 'Goals',
      content: <InvestmentGoals />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="text-slate-600 mt-2">Track your investments and manage your goals</p>
        </div>

        <Tabs tabs={tabs} defaultTab="overview" />
      </div>
    </div>
  );
};

export default Portfolio;
