import React from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Globe, Settings } from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'transaction' | 'security' | 'staking' | 'swap' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      type: 'transaction',
      title: 'Transaction Confirmed',
      message: 'Your transaction of 100 ALGO has been confirmed',
      time: '2 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'staking',
      title: 'Staking Rewards Available',
      message: 'You have earned 5.2 ALGO in staking rewards',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'security',
      title: 'New Login Detected',
      message: 'New login from Chrome on Windows',
      time: '3 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: '4',
      type: 'swap',
      title: 'Swap Completed',
      message: 'Successfully swapped 50 USDC for 52.3 ALGO',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      time: '2 days ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = React.useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return '💸';
      case 'security':
        return '🔒';
      case 'staking':
        return '📈';
      case 'swap':
        return '🔄';
      case 'system':
        return '⚙️';
      default:
        return '📱';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-slate-200 bg-white';
      default:
        return 'border-slate-200 bg-white';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-teal-600" />
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Mark all as read
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All' },
            { id: 'transaction', label: 'Transactions' },
            { id: 'security', label: 'Security' },
            { id: 'staking', label: 'Staking' },
            { id: 'swap', label: 'Swaps' },
            { id: 'system', label: 'System' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No notifications</h3>
            <p className="text-slate-500">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors hover:shadow-md ${
                notification.read ? 'bg-white border-slate-200' : getPriorityColor(notification.priority)
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      notification.read ? 'text-slate-600' : 'text-slate-900'
                    }`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-slate-500">{notification.time}</span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    notification.read ? 'text-slate-500' : 'text-slate-700'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      notification.type === 'transaction' ? 'bg-blue-100 text-blue-800' :
                      notification.type === 'security' ? 'bg-red-100 text-red-800' :
                      notification.type === 'staking' ? 'bg-green-100 text-green-800' :
                      notification.type === 'swap' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {notification.type}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Delivery Methods</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <Mail className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">Email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">SMS notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <Smartphone className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">Push notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">Browser notifications</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-900">Notification Types</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Transaction alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Security alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Staking rewards</span>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Price alerts</span>
                <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-slate-700">System updates</span>
                <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
