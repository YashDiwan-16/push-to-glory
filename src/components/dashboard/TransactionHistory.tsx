import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card } from "../ui/card";

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  asset: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  address: string;
  txHash: string;
}

const TransactionHistory = () => {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'receive',
      amount: 150.50,
      asset: 'ALGO',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      address: 'XBYQ...N7KL',
      txHash: 'A4B2C1D5E6F7G8H9'
    },
    {
      id: '2',
      type: 'send',
      amount: 75.25,
      asset: 'ALGO',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      address: 'MNOP...Q8RS',
      txHash: 'B5C3D7E9F1G2H4I6'
    },
    {
      id: '3',
      type: 'receive',
      amount: 200.00,
      asset: 'USDC',
      status: 'pending',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      address: 'TUVW...X9YZ',
      txHash: 'C6D4E8F0G3H5I7J9'
    },
    {
      id: '4',
      type: 'send',
      amount: 50.00,
      asset: 'ALGO',
      status: 'failed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      address: 'ABCD...E1FG',
      txHash: 'D7E5F9G1H4I6J8K0'
    }
  ];

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sans font-semibold text-xl text-slate-900">
          Recent Transactions
        </h3>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-500/10 hover:border-slate-500/20 transition-colors">
            <div className="flex items-center gap-4">
              {/* Transaction Type Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'send' 
                  ? 'bg-red-500/10 text-red-600' 
                  : 'bg-green-500/10 text-green-600'
              }`}>
                {tx.type === 'send' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownLeft className="h-5 w-5" />
                )}
              </div>

              {/* Transaction Details */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-slate-900 capitalize">
                    {tx.type} {tx.asset}
                  </p>
                  {getStatusIcon(tx.status)}
                </div>
                <p className="text-sm text-slate-500">
                  {tx.type === 'send' ? 'To' : 'From'}: {tx.address}
                </p>
                <p className="text-xs text-slate-400">
                  {formatTime(tx.timestamp)} • {getStatusText(tx.status)}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`font-semibold ${
                tx.type === 'send' ? 'text-red-600' : 'text-green-600'
              }`}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.asset}
              </p>
              <p className="text-sm text-slate-500">
                ${(tx.amount * (tx.asset === 'ALGO' ? 2.28 : 1.00)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 mb-2">No transactions yet</p>
          <p className="text-sm text-slate-400">
            Your transaction history will appear here
          </p>
        </div>
      )}
    </Card>
  );
};

export default TransactionHistory;
