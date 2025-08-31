import { useState } from "react";
import { Bell, Mail, Smartphone, DollarSign, Shield } from "lucide-react";
import { Card } from "../ui/card";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailSecurity: true,
    emailMarketing: false,
    pushTransactions: true,
    pushSecurity: true,
    pushPrice: false,
    smsTransactions: false,
    smsSecurity: true
  });

  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const notificationGroups = [
    {
      title: "Email Notifications",
      icon: Mail,
      settings: [
        { key: 'emailTransactions', label: 'Transaction confirmations', description: 'Get notified when transactions complete' },
        { key: 'emailSecurity', label: 'Security alerts', description: 'Important security notifications' },
        { key: 'emailMarketing', label: 'Marketing updates', description: 'News and product updates' }
      ]
    },
    {
      title: "Push Notifications", 
      icon: Smartphone,
      settings: [
        { key: 'pushTransactions', label: 'Transaction updates', description: 'Real-time transaction status' },
        { key: 'pushSecurity', label: 'Security alerts', description: 'Urgent security notifications' },
        { key: 'pushPrice', label: 'Price alerts', description: 'ALGO price change notifications' }
      ]
    },
    {
      title: "SMS Notifications",
      icon: Bell,
      settings: [
        { key: 'smsTransactions', label: 'Transaction confirmations', description: 'SMS for large transactions' },
        { key: 'smsSecurity', label: 'Security alerts', description: 'Critical security warnings' }
      ]
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl text-slate-900">
            Notification Settings
          </h3>
          <p className="text-sm text-slate-500">
            Choose how and when you receive notifications
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {notificationGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <div key={groupIndex}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-slate-600" />
                <h4 className="font-medium text-slate-900">{group.title}</h4>
              </div>
              
              <div className="space-y-3 pl-7">
                {group.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-slate-900">{setting.label}</h5>
                      <p className="text-sm text-slate-500">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[setting.key as keyof typeof notifications]}
                        onChange={() => handleToggle(setting.key as keyof typeof notifications)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800">
              <strong>Security notifications cannot be completely disabled.</strong> 
              Critical security alerts will always be sent to ensure your account safety.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
