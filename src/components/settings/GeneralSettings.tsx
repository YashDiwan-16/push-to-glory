import { useState } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const GeneralSettings = () => {
  const [profile, setProfile] = useState({
    displayName: "Algorand User",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "UTC-8 Pacific Time",
    language: "English",
    currency: "USD"
  });

  const handleSave = () => {
    console.log("Saving profile:", profile);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xl text-slate-900">
            General Settings
          </h3>
          <p className="text-sm text-slate-500">
            Manage your account information and preferences
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Timezone
          </label>
          <select
            value={profile.timezone}
            onChange={(e) => setProfile({...profile, timezone: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="UTC-8 Pacific Time">UTC-8 Pacific Time</option>
            <option value="UTC-5 Eastern Time">UTC-5 Eastern Time</option>
            <option value="UTC+0 Greenwich Mean Time">UTC+0 Greenwich Mean Time</option>
            <option value="UTC+1 Central European Time">UTC+1 Central European Time</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Language
          </label>
          <select
            value={profile.language}
            onChange={(e) => setProfile({...profile, language: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
            <option value="Japanese">日本語</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Currency
          </label>
          <select
            value={profile.currency}
            onChange={(e) => setProfile({...profile, currency: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
          Save Changes
        </Button>
      </div>
    </Card>
  );
};

export default GeneralSettings;
