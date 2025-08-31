import Navbar from "../components/sections/Navbar";
import SwapInterface from "../components/swap/SwapInterface";
import SwapHistory from "../components/swap/SwapHistory";
import PriceChart from "../components/swap/PriceChart";

const Swap = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              Token Swap
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Swap tokens instantly on the Algorand network with the best rates and lowest fees.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Swap Interface */}
            <div className="lg:col-span-1">
              <SwapInterface />
            </div>
            
            {/* Right Column - Chart & History */}
            <div className="lg:col-span-2 space-y-8">
              <PriceChart />
              <SwapHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;
