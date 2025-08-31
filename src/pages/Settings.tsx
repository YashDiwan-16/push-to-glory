import Navbar from "../components/sections/Navbar";
import SettingsHeader from "../components/settings/SettingsHeader";
import GeneralSettings from "../components/settings/GeneralSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";

const Settings = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SettingsHeader />
          
          <div className="space-y-8">
            <GeneralSettings />
            <SecuritySettings />
            <NotificationSettings />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
