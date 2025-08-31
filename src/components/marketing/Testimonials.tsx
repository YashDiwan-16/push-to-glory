import React from 'react';
import { Star, MessageCircle, Calendar } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

const Testimonials: React.FC = () => {
  const [testimonials] = React.useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'DeFi Trader',
      company: 'CryptoVentures',
      content: 'AlgoWallet has completely transformed how I manage my cryptocurrency portfolio. The staking features are incredible and the interface is so intuitive.',
      rating: 5,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-20'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Blockchain Developer',
      company: 'TechStartup Inc',
      content: 'As a developer, I appreciate the technical excellence behind AlgoWallet. The security features and API integration make it perfect for our projects.',
      rating: 5,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-18'
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Investment Advisor',
      company: 'Wealth Management Co',
      content: 'The goal tracking and portfolio analytics in AlgoWallet help me advise my clients better. It\'s become an essential tool in my practice.',
      rating: 5,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-15'
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Crypto Enthusiast',
      company: 'Independent',
      content: 'I\'ve tried many wallets, but none come close to the user experience of AlgoWallet. The transaction speed is amazing and fees are minimal.',
      rating: 4,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-12'
    },
    {
      id: '5',
      name: 'Jennifer Brown',
      role: 'NFT Artist',
      company: 'Creative Studio',
      content: 'The NFT gallery feature is fantastic! It beautifully showcases my digital art collection and makes trading so much easier.',
      rating: 5,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-10'
    },
    {
      id: '6',
      name: 'Alex Thompson',
      role: 'DeFi Protocol Lead',
      company: 'DeFi Labs',
      content: 'AlgoWallet\'s integration capabilities are outstanding. We\'ve successfully integrated it into our DeFi protocol with zero issues.',
      rating: 5,
      avatar: '/api/placeholder/60/60',
      date: '2024-12-08'
    }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real users think about AlgoWallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <div className="mb-4">
                <MessageCircle className="w-5 h-5 text-teal-500 mb-2" />
                <p className="text-slate-700 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">
                      {formatDate(testimonial.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">4.9</div>
                <div className="flex justify-center space-x-1 mb-1">
                  {renderStars(5)}
                </div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2,500+</div>
                <div className="text-sm text-slate-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-sm text-slate-600">Satisfaction Rate</div>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Join thousands of satisfied users who trust AlgoWallet for their cryptocurrency needs
            </p>
            
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
