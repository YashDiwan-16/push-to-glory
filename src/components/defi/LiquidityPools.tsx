import React from 'react';
import { Droplets, Plus, Minus, TrendingUp, Info } from 'lucide-react';
import Badge from '../common/Badge';

interface LiquidityPool {
  id: string;
  name: string;
  tokenA: string;
  tokenB: string;
  apy: number;
  tvl: number;
  myLiquidity: number;
  fees24h: number;
  volume24h: number;
  priceImpact: number;
}

const LiquidityPools: React.FC = () => {
  const [pools] = React.useState<LiquidityPool[]>([
    {
      id: '1',
      name: 'ALGO/USDC',
      tokenA: 'ALGO',
      tokenB: 'USDC',
      apy: 15.4,
      tvl: 2500000,
      myLiquidity: 1250,
      fees24h: 145.80,
      volume24h: 89500,
      priceImpact: 0.02
    },
    {
      id: '2',
      name: 'ETH/ALGO',
      tokenA: 'ETH',
      tokenB: 'ALGO',
      apy: 18.9,
      tvl: 1800000,
      myLiquidity: 0,
      fees24h: 298.45,
      volume24h: 156300,
      priceImpact: 0.05
    },
    {
      id: '3',
      name: 'USDC/USDT',
      tokenA: 'USDC',
      tokenB: 'USDT',
      apy: 8.2,
      tvl: 5200000,
      myLiquidity: 850,
      fees24h: 67.20,
      volume24h: 234500,
      priceImpact: 0.01
    }
  ]);

  const [selectedPool, setSelectedPool] = React.useState<string | null>(null);

  const getPoolIcon = (tokenA: string, tokenB: string) => {
    const icons = {
      'ALGO': '🔵',
      'USDC': '💵',
      'ETH': '⚡',
      'USDT': '💰'
    };
    return `${icons[tokenA as keyof typeof icons] || '🪙'} / ${icons[tokenB as keyof typeof icons] || '🪙'}`;
  };

  const totalMyLiquidity = pools.reduce((sum, pool) => sum + pool.myLiquidity, 0);

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
            <p className="text-lg font-semibold">{pools.filter(p => p.myLiquidity > 0).length}</p>
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
                <div className="text-3xl">{getPoolIcon(pool.tokenA, pool.tokenB)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{pool.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>TVL: ${pool.tvl.toLocaleString()}</span>
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
