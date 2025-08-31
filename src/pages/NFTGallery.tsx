import Navbar from "../components/sections/Navbar";
import NFTGrid from "../components/nft/NFTGrid";
import NFTFilters from "../components/nft/NFTFilters";
import NFTStats from "../components/nft/NFTStats";

const NFTGallery = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 mb-4">
              NFT Collection
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Manage and showcase your NFT collection on the Algorand blockchain.
            </p>
          </div>
          
          <NFTStats />
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <NFTFilters />
            </div>
            
            {/* Main Content - NFT Grid */}
            <div className="lg:col-span-3">
              <NFTGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NFTGallery;
