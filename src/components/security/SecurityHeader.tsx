import { Shield, CheckCircle, AlertTriangle, Settings } from "lucide-react";

const SecurityHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
          <Shield className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900">
            Security Center
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your wallet security settings and monitor account activity
          </p>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-900">
              Your wallet is secure
            </p>
            <p className="text-sm text-green-700">
              All security measures are properly configured and active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityHeader;
