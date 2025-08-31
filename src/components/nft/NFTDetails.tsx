import React from 'react';
import { Eye, Heart, Share2, ExternalLink, Calendar, Award, TrendingUp } from 'lucide-react';
import Badge from '../common/Badge';

interface NFTDetailsProps {
  nftId: string;
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ nftId }) => {
  const [nft] = React.useState({
    id: nftId,
    name: 'Algorand Ape #1234',
    collection: 'Algorand Apes',
    image: '/api/placeholder/500/500',
    description: 'A unique and rare Algorand Ape with special traits. This NFT is part of the exclusive collection featuring 10,000 unique digital apes living on the Algorand blockchain.',
    price: 45.5,
    rarity: 'rare',
    rank: 234,
    owner: '0x742d35Cc6634C0532925a3b8D',
    creator: '0x742d35Cc6634C0532925a3b8D',
    royalties: 5,
    traits: [
      { trait: 'Background', value: 'Blue Sky', rarity: '12%' },
      { trait: 'Eyes', value: 'Laser Eyes', rarity: '5%' },
      { trait: 'Hat', value: 'Baseball Cap', rarity: '18%' },
      { trait: 'Mouth', value: 'Grin', rarity: '25%' },
      { trait: 'Fur', value: 'Golden', rarity: '8%' },
      { trait: 'Clothes', value: 'Hoodie', rarity: '15%' }
    ],
    history: [
      { event: 'Minted', price: 0, from: 'Creator', to: 'Owner', date: '2024-01-15', hash: 'ABC123' },
      { event: 'Sale', price: 25.0, from: 'FirstOwner', to: 'SecondOwner', date: '2024-06-20', hash: 'DEF456' },
      { event: 'Sale', price: 42.0, from: 'SecondOwner', to: 'CurrentOwner', date: '2024-11-10', hash: 'GHI789' }
    ],
    properties: {
      tokenStandard: 'ARC-69',
      blockchain: 'Algorand',
      contract: '0x742d35Cc6634C0532925a3b8D',
      tokenId: '1234',
      created: '2024-01-15'
    }
  });

  const [activeTab, setActiveTab] = React.useState('details');
  const [isLiked, setIsLiked] = React.useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <img 
              src={nft.image} 
              alt={nft.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                isLiked ? 'border-red-300 bg-red-50 text-red-600' : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>View on Explorer</span>
            </button>
          </div>
        </div>

        {/* NFT Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{nft.name}</h1>
              <Badge variant={getRarityColor(nft.rarity) as 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} size="lg">
                {nft.rarity}
              </Badge>
            </div>
            <p className="text-lg text-teal-600 mb-4">{nft.collection}</p>
            <p className="text-slate-600">{nft.description}</p>
          </div>

          {/* Price and Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Current Price</p>
              <p className="text-xl font-bold text-slate-900">{nft.price} ALGO</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Rarity Rank</p>
              <p className="text-xl font-bold text-slate-900">#{nft.rank}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500">Royalties</p>
              <p className="text-xl font-bold text-slate-900">{nft.royalties}%</p>
            </div>
          </div>

          {/* Owner Information */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Owner:</span>
              <span className="font-medium text-slate-900">{formatAddress(nft.owner)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Creator:</span>
              <span className="font-medium text-slate-900">{formatAddress(nft.creator)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Token Standard:</span>
              <span className="font-medium text-slate-900">{nft.properties.tokenStandard}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Blockchain:</span>
              <span className="font-medium text-slate-900">{nft.properties.blockchain}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
              Make Offer
            </button>
            <button className="flex-1 border border-teal-600 text-teal-600 py-3 rounded-lg hover:bg-teal-50 transition-colors font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-t border-slate-200 pt-8">
        <div className="border-b border-slate-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'details', label: 'Details', icon: Eye },
              { id: 'traits', label: 'Traits', icon: Award },
              { id: 'history', label: 'History', icon: Calendar },
              { id: 'activity', label: 'Activity', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Token ID</span>
                  <span className="font-medium text-slate-900">{nft.properties.tokenId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Contract Address</span>
                  <span className="font-medium text-slate-900">{formatAddress(nft.properties.contract)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Created</span>
                  <span className="font-medium text-slate-900">{nft.properties.created}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Blockchain</span>
                  <span className="font-medium text-slate-900">{nft.properties.blockchain}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Collection Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Total Supply</span>
                  <span className="font-medium text-slate-900">10,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Owners</span>
                  <span className="font-medium text-slate-900">6,420</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Floor Price</span>
                  <span className="font-medium text-slate-900">15.2 ALGO</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Volume Traded</span>
                  <span className="font-medium text-slate-900">125,430 ALGO</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traits' && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Traits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {nft.traits.map((trait, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-sm text-slate-500 mb-1">{trait.trait}</div>
                  <div className="font-semibold text-slate-900 mb-2">{trait.value}</div>
                  <div className="text-xs text-slate-500">{trait.rarity} have this trait</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Transaction History</h3>
            <div className="space-y-4">
              {nft.history.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{event.event}</p>
                      <p className="text-sm text-slate-500">
                        From {formatAddress(event.from)} to {formatAddress(event.to)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {event.price > 0 ? `${event.price} ALGO` : 'Free'}
                    </p>
                    <p className="text-sm text-slate-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Listed for sale</span>
                <span className="text-sm text-slate-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Price updated</span>
                <span className="text-sm text-slate-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Transfer</span>
                <span className="text-sm text-slate-500">3 days ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-600">Minted</span>
                <span className="text-sm text-slate-500">January 15, 2024</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetails;
