import { useState } from "react";
import { Shield, Lock, Smartphone, Key, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorEnabled: true,
    biometricEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30",
    requirePasswordChange: false
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl text-slate-900">
            Security Settings
          </h3>
          <p className="text-sm text-slate-500">
            Configure security features and authentication methods
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-slate-600" />
            <div>
              <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-500">Add an extra layer of security</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorEnabled}
              onChange={() => handleToggle('twoFactorEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Biometric Authentication */}
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-slate-600" />
            <div>
              <h4 className="font-medium text-slate-900">Biometric Authentication</h4>
              <p className="text-sm text-slate-500">Use fingerprint or face recognition</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.biometricEnabled}
              onChange={() => handleToggle('biometricEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Login Notifications */}
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-slate-600" />
            <div>
              <h4 className="font-medium text-slate-900">Login Notifications</h4>
              <p className="text-sm text-slate-500">Get notified of new login attempts</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.loginNotifications}
              onChange={() => handleToggle('loginNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Session Timeout */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="h-5 w-5 text-slate-600" />
            <div>
              <h4 className="font-medium text-slate-900">Session Timeout</h4>
              <p className="text-sm text-slate-500">Automatically log out after inactivity</p>
            </div>
          </div>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => setSettings(prev => ({...prev, sessionTimeout: e.target.value}))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
        </div>

        {/* Password Management */}
        <div className="p-4 border border-slate-200 rounded-lg">
          <h4 className="font-medium text-slate-900 mb-3">Password Management</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download Backup Codes
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              Revoke All Sessions
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SecuritySettings;
