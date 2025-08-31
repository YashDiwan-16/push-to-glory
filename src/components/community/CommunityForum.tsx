import React from 'react';
import { MessageSquare, ThumbsUp, Reply, MoreHorizontal, Pin, Lock, Flame } from 'lucide-react';
import Avatar from '../common/Avatar';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  timestamp: string;
  isPinned: boolean;
  isLocked: boolean;
  isTrending: boolean;
  tags: string[];
}

const CommunityForum: React.FC = () => {
  const [posts] = React.useState<ForumPost[]>([
    {
      id: '1',
      title: 'Best staking strategies for 2025',
      content: 'Looking for advice on the most effective staking strategies. What are your recommendations for maximizing rewards while minimizing risk?',
      author: 'CryptoExpert',
      authorAvatar: '/api/placeholder/40/40',
      category: 'Staking',
      replies: 24,
      likes: 45,
      views: 312,
      timestamp: '2 hours ago',
      isPinned: true,
      isLocked: false,
      isTrending: true,
      tags: ['staking', 'strategy', 'rewards']
    },
    {
      id: '2',
      title: 'AlgoWallet v2.1 Feature Discussion',
      content: 'The new version includes some amazing features! Let\'s discuss what you like most about the update.',
      author: 'WalletUser123',
      authorAvatar: '/api/placeholder/40/40',
      category: 'General',
      replies: 18,
      likes: 32,
      views: 156,
      timestamp: '4 hours ago',
      isPinned: false,
      isLocked: false,
      isTrending: true,
      tags: ['update', 'features', 'feedback']
    },
    {
      id: '3',
      title: 'DeFi protocol comparison on Algorand',
      content: 'Has anyone compared the different DeFi protocols available on Algorand? Which ones offer the best yields?',
      author: 'DeFiTrader',
      authorAvatar: '/api/placeholder/40/40',
      category: 'DeFi',
      replies: 15,
      likes: 28,
      views: 203,
      timestamp: '6 hours ago',
      isPinned: false,
      isLocked: false,
      isTrending: false,
      tags: ['defi', 'algorand', 'yields']
    },
    {
      id: '4',
      title: 'Security tips for new users',
      content: 'Essential security practices every AlgoWallet user should know. Please share your best tips!',
      author: 'SecurityGuru',
      authorAvatar: '/api/placeholder/40/40',
      category: 'Security',
      replies: 31,
      likes: 67,
      views: 445,
      timestamp: '1 day ago',
      isPinned: true,
      isLocked: false,
      isTrending: false,
      tags: ['security', 'tips', 'newbie']
    },
    {
      id: '5',
      title: 'NFT marketplace integration feedback',
      content: 'The NFT gallery is great, but how about marketplace integration? What features would you like to see?',
      author: 'NFTCollector',
      authorAvatar: '/api/placeholder/40/40',
      category: 'NFTs',
      replies: 12,
      likes: 19,
      views: 89,
      timestamp: '2 days ago',
      isPinned: false,
      isLocked: true,
      isTrending: false,
      tags: ['nft', 'marketplace', 'feature-request']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('latest');

  const categories = [
    'All',
    'General',
    'Staking',
    'DeFi',
    'Security',
    'NFTs',
    'Technical',
    'Feature Requests'
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'General': 'bg-blue-100 text-blue-800',
      'Staking': 'bg-green-100 text-green-800',
      'DeFi': 'bg-purple-100 text-purple-800',
      'Security': 'bg-red-100 text-red-800',
      'NFTs': 'bg-orange-100 text-orange-800',
      'Technical': 'bg-gray-100 text-gray-800',
      'Feature Requests': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'All' || post.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Community Forum</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          New Post
        </button>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-teal-600">1,247</div>
          <div className="text-sm text-slate-600">Total Posts</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">456</div>
          <div className="text-sm text-slate-600">Active Users</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">89</div>
          <div className="text-sm text-slate-600">Online Now</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">24</div>
          <div className="text-sm text-slate-600">New Today</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="latest">Latest</option>
            <option value="trending">Trending</option>
            <option value="most-replies">Most Replies</option>
            <option value="most-likes">Most Likes</option>
          </select>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <Avatar src={post.authorAvatar} alt={post.author} size="md" />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.isPinned && <Pin className="w-4 h-4 text-teal-600" />}
                    {post.isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                    {post.isTrending && <Flame className="w-4 h-4 text-orange-500" />}
                    <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-medium text-slate-900">{post.author}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500">{post.timestamp}</span>
                </div>

                <p className="text-slate-700 mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-slate-500 hover:text-teal-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{post.replies}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-slate-500 hover:text-red-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <span className="text-sm text-slate-500">{post.views} views</span>
                  </div>
                  
                  <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default CommunityForum;
