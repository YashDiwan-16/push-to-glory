import { Settings, User, Palette, Globe } from "lucide-react";

const SettingsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-slate-500/10 flex items-center justify-center">
          <Settings className="h-6 w-6 text-slate-600" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900">
            Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your account preferences and security settings
          </p>
        </div>
      </div>
      
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium text-slate-900">
          <User className="h-4 w-4" />
          General
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900">
          <Settings className="h-4 w-4" />
          Security
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900">
          <Palette className="h-4 w-4" />
          Appearance
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900">
          <Globe className="h-4 w-4" />
          Language
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
