import React from 'react';
import { Droplets, Plus, Minus, TrendingUp, Info } from 'lucide-react';
import Badge from '../common/Badge';

interface Pool {
  id: string;
  name: string;
  token1: { symbol: string; amount: number };
  token2: { symbol: string; amount: number };
  apy: number;
  totalLiquidity: number;
  volume24h: number;
  fees24h: number;
  userLiquidity: number;
  userShare: number;
}

const LiquidityPools: React.FC = () => {
  const [pools] = React.useState<Pool[]>([
    {
      id: '1',
      name: 'ALGO/USDC',
      token1: { symbol: 'ALGO', amount: 125000 },
      token2: { symbol: 'USDC', amount: 45000 },
      apy: 12.5,
      totalLiquidity: 285000,
      volume24h: 125000,
      fees24h: 1250,
      userLiquidity: 5000,
      userShare: 1.75
    },
    {
      id: '2',
      name: 'ETH/USDC',
      token1: { symbol: 'ETH', amount: 85 },
      token2: { symbol: 'USDC', amount: 215000 },
      apy: 18.3,
      totalLiquidity: 432000,
      volume24h: 89000,
      fees24h: 890,
      userLiquidity: 2500,
      userShare: 0.58
    },
    {
      id: '3',
      name: 'ALGO/ETH',
      token1: { symbol: 'ALGO', amount: 95000 },
      token2: { symbol: 'ETH', amount: 45 },
      apy: 15.7,
      totalLiquidity: 195000,
      volume24h: 45000,
      fees24h: 450,
      userLiquidity: 0,
      userShare: 0
    }
  ]);

  const getPoolIcon = (tokenA: string, tokenB: string) => {
    const icons = {
      'ALGO': '🔵',
      'USDC': '💵',
      'ETH': '⚡',
      'USDT': '💰'
    };
    return `${icons[tokenA as keyof typeof icons] || '🪙'} / ${icons[tokenB as keyof typeof icons] || '🪙'}`;
  };

  const totalMyLiquidity = pools.reduce((sum, pool) => sum + pool.userLiquidity, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Liquidity Pools</h2>
          <p className="text-slate-600 mt-1">Provide liquidity and earn trading fees</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Liquidity</span>
        </button>
      </div>

      {/* My Liquidity Summary */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-100">My Total Liquidity</p>
            <p className="text-3xl font-bold">${totalMyLiquidity.toLocaleString()}</p>
          </div>
          <Droplets className="w-8 h-8 text-teal-200" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-teal-100 text-sm">Positions</p>
            <p className="text-lg font-semibold">{pools.filter(p => p.userLiquidity > 0).length}</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">24h Fees Earned</p>
            <p className="text-lg font-semibold">$24.85</p>
          </div>
          <div>
            <p className="text-teal-100 text-sm">Avg APY</p>
            <p className="text-lg font-semibold">12.8%</p>
          </div>
        </div>
      </div>

      {/* Pool List */}
      <div className="space-y-4">
        {pools.map((pool) => (
          <div key={pool.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{getPoolIcon(pool.token1.symbol, pool.token2.symbol)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{pool.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>TVL: ${pool.totalLiquidity.toLocaleString()}</span>
                    <span>Volume: ${pool.volume24h.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-lg font-semibold text-green-600">{pool.apy}% APY</span>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">My Liquidity</p>
                <p className="font-semibold text-slate-900">${pool.myLiquidity.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">24h Fees</p>
                <p className="font-semibold text-green-600">${pool.fees24h}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Price Impact</p>
                <p className="font-semibold text-slate-900">{pool.priceImpact}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Pool Share</p>
                <p className="font-semibold text-slate-900">
                  {((pool.myLiquidity / pool.tvl) * 100).toFixed(3)}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Info className="w-4 h-4" />
                <span>Liquidity rewards updated every block</span>
              </div>
              <div className="flex space-x-2">
                {pool.myLiquidity > 0 && (
                  <button className="flex items-center space-x-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Minus className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                )}
                <button 
                  onClick={() => setSelectedPool(pool.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{pool.myLiquidity > 0 ? 'Add More' : 'Add Liquidity'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pool Analytics */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pool Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">$9.5M</div>
            <div className="text-sm text-slate-600">Total TVL</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">$480K</div>
            <div className="text-sm text-slate-600">24h Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">14.2%</div>
            <div className="text-sm text-slate-600">Avg APY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPools;
