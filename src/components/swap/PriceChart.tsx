import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/card";

const PriceChart = () => {
  // Mock price data
  const priceData = {
    current: 2.28,
    change24h: 5.67,
    isPositive: true,
    high24h: 2.31,
    low24h: 2.15,
    volume24h: "12.5M"
  };

  const chartPoints = [
    { time: "00:00", price: 2.15 },
    { time: "04:00", price: 2.18 },
    { time: "08:00", price: 2.22 },
    { time: "12:00", price: 2.28 },
    { time: "16:00", price: 2.31 },
    { time: "20:00", price: 2.28 },
    { time: "24:00", price: 2.28 }
  ];

  // Generate SVG path for the chart
  const generatePath = () => {
    const width = 400;
    const height = 200;
    const padding = 20;
    
    const minPrice = Math.min(...chartPoints.map(p => p.price));
    const maxPrice = Math.max(...chartPoints.map(p => p.price));
    const priceRange = maxPrice - minPrice;
    
    const points = chartPoints.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartPoints.length - 1);
      const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-sans font-semibold text-xl text-slate-900 mb-2">
            ALGO/USD Price
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-slate-900">
              ${priceData.current}
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
              priceData.isPositive 
                ? 'bg-green-500/10 text-green-600' 
                : 'bg-red-500/10 text-red-600'
            }`}>
              {priceData.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {priceData.isPositive ? '+' : ''}{priceData.change24h}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="text-sm text-slate-500">
            <span className="font-medium">24h High:</span> ${priceData.high24h}
          </div>
          <div className="text-sm text-slate-500">
            <span className="font-medium">24h Low:</span> ${priceData.low24h}
          </div>
          <div className="text-sm text-slate-500">
            <span className="font-medium">Volume:</span> ${priceData.volume24h}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          width="100%"
          height="200"
          viewBox="0 0 400 200"
          className="border border-slate-500/10 rounded-lg bg-gradient-to-b from-teal-50 to-white"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#0d9488"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {chartPoints.map((point, index) => {
            const width = 400;
            const height = 200;
            const padding = 20;
            const minPrice = Math.min(...chartPoints.map(p => p.price));
            const maxPrice = Math.max(...chartPoints.map(p => p.price));
            const priceRange = maxPrice - minPrice;
            
            const x = padding + (index * (width - 2 * padding)) / (chartPoints.length - 1);
            const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#0d9488"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Time labels */}
        <div className="flex justify-between mt-2 px-5 text-xs text-slate-500">
          {chartPoints.map((point, index) => (
            <span key={index}>{point.time}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PriceChart;
