import { Shield, MapPin, Clock, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";

interface AuditEvent {
  id: string;
  type: 'login' | 'transaction' | 'setting_change' | 'security_event';
  description: string;
  timestamp: Date;
  location: string;
  ip: string;
  device: string;
  severity: 'low' | 'medium' | 'high';
}

const SecurityAuditLog = () => {
  // Mock audit data
  const auditEvents: AuditEvent[] = [
    {
      id: '1',
      type: 'login',
      description: 'Successful login to wallet',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      device: 'Chrome on macOS',
      severity: 'low'
    },
    {
      id: '2',
      type: 'transaction',
      description: 'Sent 150.5 ALGO to wallet address',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      device: 'Chrome on macOS',
      severity: 'low'
    },
    {
      id: '3',
      type: 'setting_change',
      description: 'Updated transaction notification preferences',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      device: 'Chrome on macOS',
      severity: 'low'
    },
    {
      id: '4',
      type: 'security_event',
      description: 'Failed login attempt detected',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      location: 'Unknown',
      ip: '203.0.113.1',
      device: 'Unknown Browser',
      severity: 'medium'
    }
  ];

  const getEventIcon = (type: AuditEvent['type']) => {
    switch (type) {
      case 'login':
        return '🔐';
      case 'transaction':
        return '💸';
      case 'setting_change':
        return '⚙️';
      case 'security_event':
        return '⚠️';
    }
  };

  const getSeverityColor = (severity: AuditEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl text-slate-900">
            Security Audit Log
          </h3>
          <p className="text-sm text-slate-500">
            Recent account activity and security events
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {auditEvents.map((event) => (
          <div key={event.id} className="flex items-start gap-4 p-4 border border-slate-500/10 rounded-lg hover:border-slate-500/20 transition-colors">
            <div className="text-2xl flex-shrink-0 mt-1">
              {getEventIcon(event.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">
                    {event.description}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(event.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
              </div>
              
              <div className="text-xs text-slate-400 space-y-1">
                <div>Device: {event.device}</div>
                <div>IP: {event.ip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {auditEvents.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-2">No security events</p>
          <p className="text-sm text-slate-400">
            Your account activity will appear here
          </p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-500/10">
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View Full Security Log
        </button>
      </div>
    </Card>
  );
};

export default SecurityAuditLog;
