import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const NFTFilters = () => {
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const collections = [
    "All Collections", "Algorand Apes", "Pixel Dragons", "Crypto Llamas", "Space Cats"
  ];

  const rarities = ["All", "Common", "Rare", "Epic", "Legendary"];

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg text-slate-900 mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Collection Filter */}
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Collection</h4>
          <select 
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg"
          >
            {collections.map((collection, index) => (
              <option key={index} value={collection.toLowerCase().replace(/\s+/g, '_')}>
                {collection}
              </option>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Rarity</h4>
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <label key={rarity} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rarity"
                  value={rarity.toLowerCase()}
                  checked={selectedRarity === rarity.toLowerCase()}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="text-teal-600 focus:ring-teal-600"
                />
                <span className="text-sm text-slate-700">{rarity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-slate-900 mb-2">Price Range (ALGO)</h4>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full p-2 border border-slate-300 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full p-2 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>
    </Card>
  );
};

export default NFTFilters;
