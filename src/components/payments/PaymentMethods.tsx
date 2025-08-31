import React from 'react';
import { Wallet, CreditCard, Smartphone, Globe } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'wallet' | 'card' | 'bank' | 'crypto';
  name: string;
  details: string;
  isDefault: boolean;
  status: 'active' | 'inactive' | 'expired';
}

const PaymentMethods: React.FC = () => {
  const [methods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'wallet',
      name: 'Pera Wallet',
      details: 'Connected',
      isDefault: true,
      status: 'active'
    },
    {
      id: '2',
      type: 'card',
      name: 'Visa ****1234',
      details: 'Expires 12/25',
      isDefault: false,
      status: 'active'
    },
    {
      id: '3',
      type: 'bank',
      name: 'Bank Account',
      details: '****6789',
      isDefault: false,
      status: 'active'
    }
  ]);

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'wallet':
        return <Wallet className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'bank':
        return <Smartphone className="w-5 h-5" />;
      case 'crypto':
        return <Globe className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      <div className="p-6 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Payment Methods</h3>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Add Method
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {methods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-slate-600">
                  {getMethodIcon(method.type)}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{method.name}</div>
                  <div className="text-sm text-slate-500">{method.details}</div>
                </div>
                {method.isDefault && (
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex w-2 h-2 rounded-full ${
                  method.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                <button className="text-slate-400 hover:text-slate-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
