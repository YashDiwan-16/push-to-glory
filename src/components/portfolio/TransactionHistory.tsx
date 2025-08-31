import React from 'react';
import { Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';
import TransactionCard from '../transactions/TransactionCard';

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

const TransactionHistory: React.FC = () => {
  const [transactions] = React.useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      amount: 100,
      asset: 'ALGO',
      status: 'confirmed',
      timestamp: '2024-12-24 14:30',
      hash: 'ABC123XYZ789',
      from: 'SENDER_ADDRESS_123'
    },
    {
      id: '2',
      type: 'send',
      amount: 50,
      asset: 'USDC',
      status: 'confirmed',
      timestamp: '2024-12-24 12:15',
      hash: 'DEF456UVW012',
      to: 'RECEIVER_ADDRESS_456'
    },
    {
      id: '3',
      type: 'swap',
      amount: 25,
      asset: 'ALGO',
      status: 'pending',
      timestamp: '2024-12-24 11:45',
      hash: 'GHI789RST345'
    },
    {
      id: '4',
      type: 'stake',
      amount: 200,
      asset: 'ALGO',
      status: 'confirmed',
      timestamp: '2024-12-23 16:20',
      hash: 'JKL012MNO678'
    },
    {
      id: '5',
      type: 'receive',
      amount: 75,
      asset: 'ETH',
      status: 'failed',
      timestamp: '2024-12-23 09:30',
      hash: 'PQR345STU901',
      from: 'SENDER_ADDRESS_789'
    }
  ]);

  const [filteredTransactions, setFilteredTransactions] = React.useState(transactions);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('timestamp');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  React.useEffect(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.asset.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy as keyof Transaction];
      let bValue: string | number = b[sortBy as keyof Transaction];

      if (sortBy === 'amount') {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sortBy === 'timestamp') {
        aValue = new Date(a.timestamp).getTime();
        bValue = new Date(b.timestamp).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getTransactionStats = () => {
    const stats = {
      total: transactions.length,
      confirmed: transactions.filter(tx => tx.status === 'confirmed').length,
      pending: transactions.filter(tx => tx.status === 'pending').length,
      failed: transactions.filter(tx => tx.status === 'failed').length
    };
    return stats;
  };

  const stats = getTransactionStats();

  return (
    <div className="space-y-6">
      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-slate-600">Confirmed</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-slate-600">Pending</div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-sm text-slate-600">Failed</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="send">Send</option>
              <option value="receive">Receive</option>
              <option value="swap">Swap</option>
              <option value="stake">Stake</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleSort('timestamp')}
              className={`flex items-center space-x-1 px-3 py-2 border rounded-lg transition-colors ${
                sortBy === 'timestamp' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm">Date</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={`flex items-center space-x-1 px-3 py-2 border rounded-lg transition-colors ${
                sortBy === 'amount' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm">Amount</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No transactions found</h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>

      {/* Load More */}
      {filteredTransactions.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            Load More Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
