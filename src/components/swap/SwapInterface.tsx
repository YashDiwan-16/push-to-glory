import { useState } from "react";
import { ArrowUpDown, Settings, Zap } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState("ALGO");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");

  const tokens = [
    { symbol: "ALGO", name: "Algorand", balance: "1,245.67" },
    { symbol: "USDC", name: "USD Coin", balance: "850.32" },
    { symbol: "USDT", name: "Tether", balance: "1,100.50" },
    { symbol: "BTC", name: "Bitcoin", balance: "0.0234" },
  ];

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const calculateOutput = (input: string) => {
    if (!input) return "";
    const rate = fromToken === "ALGO" ? 2.28 : 0.44; // Mock rates
    return (parseFloat(input) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateOutput(value));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sans font-semibold text-xl text-slate-900">
          Swap Tokens
        </h2>
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* From Token */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            From
          </label>
          <div className="relative">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="absolute left-3 top-3 bg-transparent border-none outline-none font-medium"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="w-full pl-20 pr-4 py-3 border border-slate-300 rounded-lg text-right text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
            <div className="absolute right-3 bottom-1 text-xs text-slate-500">
              Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapTokens}
            className="p-2 rounded-full border-2 border-slate-300 hover:border-teal-600"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            To
          </label>
          <div className="relative">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="absolute left-3 top-3 bg-transparent border-none outline-none font-medium"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="w-full pl-20 pr-4 py-3 border border-slate-300 rounded-lg text-right text-lg font-medium bg-slate-50"
            />
            <div className="absolute right-3 bottom-1 text-xs text-slate-500">
              Balance: {tokens.find(t => t.symbol === toToken)?.balance}
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && (
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Rate</span>
              <span className="font-medium">1 {fromToken} = {calculateOutput("1")} {toToken}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Slippage tolerance</span>
              <span className="font-medium">{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Network fee</span>
              <span className="font-medium">0.001 ALGO</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button 
          className="w-full bg-teal-600 hover:bg-teal-700 py-3"
          disabled={!fromAmount || !toAmount}
        >
          <Zap className="h-4 w-4 mr-2" />
          {fromAmount ? "Swap Tokens" : "Enter an amount"}
        </Button>
      </div>
    </Card>
  );
};

export default SwapInterface;
