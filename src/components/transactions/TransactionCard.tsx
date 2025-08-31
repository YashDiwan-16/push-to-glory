import { Clock, ExternalLink, Copy } from 'lucide-react';
import Badge from '../common/Badge';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  amount: number;
  asset: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  hash: string;
  from?: string;
  to?: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'send':
        return '↗️';
      case 'receive':
        return '↙️';
      case 'swap':
        return '🔄';
      case 'stake':
        return '📈';
      default:
        return '💰';
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getTypeIcon()}</div>
          <div>
            <div className="font-medium text-slate-900 capitalize">
              {transaction.type} {transaction.asset}
            </div>
            <div className="text-sm text-slate-500 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{transaction.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-semibold ${
            transaction.type === 'receive' ? 'text-green-600' : 'text-slate-900'
          }`}>
            {transaction.type === 'receive' ? '+' : '-'}{transaction.amount} {transaction.asset}
          </div>
          <Badge variant={getStatusColor() as 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} size="sm">
            {transaction.status}
          </Badge>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>Hash:</span>
            <span className="font-mono">{transaction.hash.slice(0, 10)}...</span>
            <button onClick={() => copyToClipboard(transaction.hash)}>
              <Copy className="w-3 h-3 hover:text-teal-600" />
            </button>
          </div>
          <button className="flex items-center space-x-1 hover:text-teal-600">
            <span>View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
