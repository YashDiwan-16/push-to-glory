import React from 'react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started with cryptocurrency',
      features: [
        'Create and manage wallet',
        'Send and receive crypto',
        'Basic transaction history',
        'Mobile app access',
        'Community support'
      ],
      limitations: [
        'Limited to 3 cryptocurrencies',
        'Basic security features'
      ],
      recommended: false,
      buttonText: 'Get Started',
      buttonStyle: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'Advanced features for serious crypto enthusiasts',
      features: [
        'Everything in Basic',
        'Unlimited cryptocurrencies',
        'Advanced portfolio analytics',
        'Staking rewards tracking',
        'Priority customer support',
        'DeFi integrations',
        'NFT gallery management',
        'Advanced security options'
      ],
      limitations: [],
      recommended: true,
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-teal-600 text-white hover:bg-teal-700'
    },
    {
      name: 'Enterprise',
      price: '$49.99',
      period: '/month',
      description: 'Complete solution for businesses and institutions',
      features: [
        'Everything in Pro',
        'Multi-user management',
        'API access and integrations',
        'Advanced reporting tools',
        'Dedicated account manager',
        'White-label solutions',
        'Custom integrations',
        'SLA guarantees',
        'Audit trail and compliance'
      ],
      limitations: [],
      recommended: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core security features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-lg border-2 p-8 ${
                plan.recommended
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Features included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 border-2 border-slate-300 rounded-full mt-0.5"></div>
                          <span className="text-slate-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${plan.buttonStyle}`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {plan.name === 'Pro' && (
                <p className="text-center text-sm text-slate-500 mt-3">
                  14-day free trial, no credit card required
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-slate-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We offer tailored solutions for large organizations, exchanges, and financial institutions. 
              Contact our enterprise team to discuss your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Schedule a Demo
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                View Enterprise Features
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            All plans include 256-bit encryption, 24/7 monitoring, and our satisfaction guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
