import React from 'react';
import { Zap, Shield, Coins, Users, Award, TrendingUp } from 'lucide-react';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'Lightning Fast',
      description: 'Execute transactions in seconds with Algorand\'s fast consensus',
      stats: '< 5 sec confirmation'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Bank-Level Security',
      description: 'Multi-layer security with hardware wallet integration',
      stats: '256-bit encryption'
    },
    {
      icon: <Coins className="w-8 h-8 text-green-500" />,
      title: 'Low Fees',
      description: 'Minimal transaction fees for maximum value',
      stats: '< $0.01 per tx'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: 'Community Driven',
      description: 'Built by the community, for the community',
      stats: '10K+ users'
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'Proven Track Record',
      description: 'Trusted by thousands of crypto enthusiasts',
      stats: '99.9% uptime'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-teal-500" />,
      title: 'Growing Ecosystem',
      description: 'Access to DeFi, NFTs, and staking opportunities',
      stats: '50+ integrations'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Choose AlgoWallet?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience the future of digital finance with our comprehensive wallet solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-teal-600">
                    {feature.stats}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust AlgoWallet for their cryptocurrency needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Create Wallet
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
