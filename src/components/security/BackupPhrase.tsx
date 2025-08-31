import { useState } from "react";
import { Key, Eye, EyeOff, Copy, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const BackupPhrase = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVerified] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  // Mock backup phrase - in real app, this would be encrypted/secured
  const backupPhrase = [
    "abandon", "ability", "able", "about", "above", "absent",
    "absorb", "abstract", "absurd", "abuse", "access", "accident"
  ];

  const handleReveal = () => {
    if (!isRevealed) {
      setShowWarning(true);
    } else {
      setIsRevealed(false);
      setShowWarning(false);
    }
  };

  const confirmReveal = () => {
    setIsRevealed(true);
    setShowWarning(false);
  };

  const copyPhrase = () => {
    const phrase = backupPhrase.join(" ");
    navigator.clipboard.writeText(phrase);
    // In real app, show toast notification
  };

  const downloadPhrase = () => {
    const phrase = backupPhrase.join(" ");
    const blob = new Blob([phrase], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-phrase.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isVerified 
            ? 'bg-green-500/10 text-green-600' 
            : 'bg-red-500/10 text-red-600'
        }`}>
          <Key className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-sans font-semibold text-lg text-slate-900">
            Backup Phrase
          </h3>
          <p className="text-sm text-slate-500">
            {isVerified ? 'Safely backed up' : 'Needs verification'}
          </p>
        </div>
      </div>

      {showWarning && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">
                Security Warning
              </h4>
              <p className="text-sm text-yellow-700 mb-3">
                Make sure you're in a private location and no one can see your screen. 
                Your backup phrase gives complete access to your wallet.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={confirmReveal}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  I Understand, Show Phrase
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowWarning(false)}
                  className="border-yellow-300 text-yellow-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {isVerified && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800">
              Backup phrase has been verified and secured
            </span>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-900">12-Word Recovery Phrase</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReveal}
              className="text-slate-600"
            >
              {isRevealed ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Reveal
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg">
            {backupPhrase.map((word, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-4">{index + 1}.</span>
                <span className="font-mono text-sm">
                  {isRevealed ? word : '•••••'}
                </span>
              </div>
            ))}
          </div>

          {isRevealed && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyPhrase}
                className="text-slate-600"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPhrase}
                className="text-slate-600"
              >
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Important:</strong> Store your backup phrase in a safe, offline location. 
            Never share it with anyone or store it digitally.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BackupPhrase;
