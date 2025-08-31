import React from 'react';
import { Play, Download, ExternalLink, BookOpen } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="relative bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Future of
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Cryptocurrency Wallets
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Secure, fast, and user-friendly wallet for the Algorand ecosystem. 
            Manage your crypto, stake rewards, and explore DeFi opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-colors shadow-lg">
              <Download className="w-5 h-5 inline mr-2" />
              Download Wallet
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-colors">
              <Play className="w-5 h-5 inline mr-2" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$50M+</div>
              <div className="text-blue-200">Assets Secured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500K+</div>
              <div className="text-blue-200">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">
              Stay Updated
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Get the latest updates on new features and releases
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="relative bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a 
              href="#" 
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>API Reference</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Community</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
