import { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  price?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  assetId: string;
}

const NFTGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock NFT data
  const nfts: NFT[] = [
    {
      id: "1",
      name: "Algorand Ape #123",
      image: "/nft-placeholder.jpg",
      collection: "Algorand Apes",
      price: 50,
      rarity: "rare",
      assetId: "ASA123456789"
    },
    {
      id: "2", 
      name: "Pixel Dragon #456",
      image: "/nft-placeholder.jpg",
      collection: "Pixel Dragons",
      price: 100,
      rarity: "epic",
      assetId: "ASA987654321"
    },
    {
      id: "3",
      name: "Crypto Llama #789",
      image: "/nft-placeholder.jpg", 
      collection: "Crypto Llamas",
      rarity: "common",
      assetId: "ASA456789123"
    },
    {
      id: "4",
      name: "Space Cat #012",
      image: "/nft-placeholder.jpg",
      collection: "Space Cats",
      price: 75,
      rarity: "legendary",
      assetId: "ASA789123456"
    }
  ];

  const getRarityColor = (rarity: NFT['rarity']) => {
    switch (rarity) {
      case "common":
        return "bg-slate-100 text-slate-600";
      case "rare":
        return "bg-blue-100 text-blue-600";
      case "epic":
        return "bg-purple-100 text-purple-600";
      case "legendary":
        return "bg-yellow-100 text-yellow-600";
    }
  };

  const filteredNFTs = nfts.filter(nft =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="rarity">Sort by Rarity</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2"
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* NFT Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredNFTs.map((nft) => (
          <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            {viewMode === "grid" ? (
              <>
                {/* NFT Image */}
                <div className="aspect-square bg-slate-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    🖼️ NFT Image
                  </div>
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </div>
                </div>
                
                {/* NFT Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">{nft.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{nft.collection}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">#{nft.assetId.slice(-6)}</span>
                    {nft.price && (
                      <span className="font-semibold text-teal-600">{nft.price} ALGO</span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0">
                  🖼️
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{nft.name}</h3>
                  <p className="text-sm text-slate-500">{nft.collection}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
                <div className="text-right">
                  {nft.price && (
                    <span className="font-semibold text-teal-600">{nft.price} ALGO</span>
                  )}
                  <p className="text-xs text-slate-400">#{nft.assetId.slice(-6)}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🖼️</div>
          <p className="text-slate-500 mb-2">No NFTs found</p>
          <p className="text-sm text-slate-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default NFTGrid;
