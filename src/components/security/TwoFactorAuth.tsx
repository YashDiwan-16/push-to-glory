import { useState } from "react";
import { Smartphone, CheckCircle, QrCode, Copy, RefreshCw } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [backupCodes] = useState([
    "8d7f-9e2a", "3b4c-1a8d", "7f9e-2c4b",
    "5a8d-9e7f", "2c4b-7f9e", "1a8d-5c6b"
  ]);

  const secretKey = "JBSWY3DPEHPK3PXP";

  const handleToggle2FA = () => {
    if (isEnabled) {
      // Disable 2FA
      setIsEnabled(false);
    } else {
      // Enable 2FA
      setShowQR(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In real app, show toast notification
  };

  const regenerateBackupCodes = () => {
    // In real app, generate new backup codes
    console.log("Regenerating backup codes...");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isEnabled 
            ? 'bg-green-500/10 text-green-600' 
            : 'bg-slate-500/10 text-slate-500'
        }`}>
          <Smartphone className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-lg text-slate-900">
            Two-Factor Authentication
          </h3>
          <p className="text-sm text-slate-500">
            {isEnabled ? 'Currently enabled' : 'Currently disabled'}
          </p>
        </div>
      </div>

      {isEnabled ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              2FA is protecting your account
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Backup Codes</h4>
            <p className="text-sm text-slate-500">
              Save these codes in a secure location. You can use them to access your account if you lose your device.
            </p>
            
            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg font-mono text-sm">
              {backupCodes.map((code, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{code}</span>
                  <button
                    onClick={() => copyToClipboard(code)}
                    className="p-1 hover:bg-slate-200 rounded"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={regenerateBackupCodes}
              className="text-slate-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Codes
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleToggle2FA}
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            Disable 2FA
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Add an extra layer of security to your account with two-factor authentication using your mobile device.
          </p>

          {showQR ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-48 h-48 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 mb-2">
                  Scan this QR code with your authenticator app
                </p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">
                    {secretKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(secretKey)}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <Button
                onClick={() => {
                  setIsEnabled(true);
                  setShowQR(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                I've Added the Code
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleToggle2FA}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Enable 2FA
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default TwoFactorAuth;
