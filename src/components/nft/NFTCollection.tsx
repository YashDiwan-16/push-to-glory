import React from 'react';
import { Image, Grid, List, Filter, Search, Star } from 'lucide-react';
import Badge from '../common/Badge';

interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  traits: { trait: string; value: string }[];
  lastSale: number;
  owner: boolean;
}

const NFTCollection: React.FC = () => {
  const [nfts] = React.useState<NFT[]>([
    {
      id: '1',
      name: 'Algorand Ape #1234',
      collection: 'Algorand Apes',
      image: '/api/placeholder/300/300',
      price: 45.5,
      rarity: 'rare',
      traits: [
        { trait: 'Background', value: 'Blue' },
        { trait: 'Eyes', value: 'Laser' },
        { trait: 'Hat', value: 'Cap' }
      ],
      lastSale: 42.0,
      owner: true
    },
    {
      id: '2',
      name: 'Algo Punk #567',
      collection: 'Algo Punks',
      image: '/api/placeholder/300/300',
      price: 78.2,
      rarity: 'epic',
      traits: [
        { trait: 'Hair', value: 'Mohawk' },
        { trait: 'Glasses', value: 'VR' },
        { trait: 'Jacket', value: 'Leather' }
      ],
      lastSale: 75.0,
      owner: true
    },
    {
      id: '3',
      name: 'Cosmic Cat #89',
      collection: 'Cosmic Cats',
      image: '/api/placeholder/300/300',
      price: 156.8,
      rarity: 'legendary',
      traits: [
        { trait: 'Fur', value: 'Galaxy' },
        { trait: 'Eyes', value: 'Cosmic' },
        { trait: 'Accessories', value: 'Crown' }
      ],
      lastSale: 150.0,
      owner: false
    },
    {
      id: '4',
      name: 'Digital Bird #345',
      collection: 'Digital Birds',
      image: '/api/placeholder/300/300',
      price: 23.1,
      rarity: 'common',
      traits: [
        { trait: 'Species', value: 'Eagle' },
        { trait: 'Color', value: 'Golden' },
        { trait: 'Wings', value: 'Spread' }
      ],
      lastSale: 20.0,
      owner: false
    }
  ]);

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState('price');
  const [filterRarity, setFilterRarity] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'secondary';
      case 'rare':
        return 'primary';
      case 'epic':
        return 'warning';
      case 'legendary':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const filteredNFTs = nfts
    .filter(nft => 
      (filterRarity === 'all' || nft.rarity === filterRarity) &&
      (searchTerm === '' || nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       nft.collection.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'collection') return a.collection.localeCompare(b.collection);
      return 0;
    });

  const myNFTs = nfts.filter(nft => nft.owner);
  const totalValue = myNFTs.reduce((sum, nft) => sum + nft.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">NFT Collection</h2>
          <p className="text-slate-600 mt-1">Discover and manage your NFT portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex border border-slate-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Browse Marketplace
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">My NFTs</p>
              <p className="text-2xl font-bold">{myNFTs.length}</p>
            </div>
            <Image className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Total Value</p>
              <p className="text-2xl font-bold text-slate-900">{totalValue.toFixed(1)} ALGO</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Collections</p>
              <p className="text-2xl font-bold text-slate-900">
                {new Set(myNFTs.map(nft => nft.collection)).size}
              </p>
            </div>
            <Grid className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">Avg Price</p>
              <p className="text-2xl font-bold text-slate-900">
                {myNFTs.length > 0 ? (totalValue / myNFTs.length).toFixed(1) : '0'} ALGO
              </p>
            </div>
            <Image className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={filterRarity}
              onChange={(e) => setFilterRarity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
              <option value="collection">Sort by Collection</option>
            </select>
          </div>

          <div>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none">
              <option value="all">All Status</option>
              <option value="owned">Owned</option>
              <option value="marketplace">Marketplace</option>
            </select>
          </div>
        </div>
      </div>

      {/* NFT Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-slate-100 relative">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={getRarityColor(nft.rarity) as any} size="sm">
                    {nft.rarity}
                  </Badge>
                </div>
                {nft.owner && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="success" size="sm">Owned</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-1">{nft.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{nft.collection}</p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-slate-500">Current Price</p>
                    <p className="font-semibold text-slate-900">{nft.price} ALGO</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Last Sale</p>
                    <p className="font-semibold text-slate-900">{nft.lastSale} ALGO</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Top Traits</p>
                  <div className="flex flex-wrap gap-1">
                    {nft.traits.slice(0, 2).map((trait, index) => (
                      <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                        {trait.trait}: {trait.value}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  {nft.owner ? 'View Details' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <div className="col-span-4">NFT</div>
            <div className="col-span-2">Collection</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Rarity</div>
            <div className="col-span-2">Status</div>
          </div>
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 hover:bg-slate-50">
              <div className="col-span-4 flex items-center space-x-3">
                <img src={nft.image} alt={nft.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-slate-900">{nft.name}</p>
                  <p className="text-sm text-slate-500">#{nft.id}</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="text-slate-900">{nft.collection}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-semibold text-slate-900">{nft.price} ALGO</p>
              </div>
              <div className="col-span-2 flex items-center">
                <Badge variant={getRarityColor(nft.rarity) as any} size="sm">
                  {nft.rarity}
                </Badge>
              </div>
              <div className="col-span-2 flex items-center">
                {nft.owner ? (
                  <Badge variant="success" size="sm">Owned</Badge>
                ) : (
                  <Badge variant="secondary" size="sm">Marketplace</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTCollection;
