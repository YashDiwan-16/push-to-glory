import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = React.useState('7d');
  const [chartType, setChartType] = React.useState('balance');

  const balanceData = [
    { date: '2024-12-18', balance: 2200, rewards: 45 },
    { date: '2024-12-19', balance: 2245, rewards: 48 },
    { date: '2024-12-20', balance: 2293, rewards: 52 },
    { date: '2024-12-21', balance: 2345, rewards: 55 },
    { date: '2024-12-22', balance: 2400, rewards: 58 },
    { date: '2024-12-23', balance: 2458, rewards: 62 },
    { date: '2024-12-24', balance: 2520, rewards: 65 }
  ];

  const apyData = [
    { date: '2024-12-18', apy: 8.2 },
    { date: '2024-12-19', apy: 8.5 },
    { date: '2024-12-20', apy: 8.3 },
    { date: '2024-12-21', apy: 8.7 },
    { date: '2024-12-22', apy: 8.4 },
    { date: '2024-12-23', apy: 8.6 },
    { date: '2024-12-24', apy: 8.5 }
  ];

  const currentData = chartType === 'balance' ? balanceData : apyData;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Performance Chart</h3>
        <div className="flex space-x-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="balance">Balance</option>
            <option value="apy">APY</option>
          </select>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'balance' ? (
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#0d9488" 
                strokeWidth={2}
                fill="url(#balanceGradient)" 
              />
            </AreaChart>
          ) : (
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [`${value}%`, 'APY']}
              />
              <Line 
                type="monotone" 
                dataKey="apy" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
        <div className="text-center">
          <p className="text-sm text-slate-600">7-Day Change</p>
          <p className="text-lg font-semibold text-green-600">+14.5%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Best Day</p>
          <p className="text-lg font-semibold text-slate-900">+3.2%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Avg Daily Return</p>
          <p className="text-lg font-semibold text-slate-900">+2.1%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
