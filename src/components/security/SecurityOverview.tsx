import { Shield, Lock, Key, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";

const SecurityOverview = () => {
  const securityItems = [
    {
      title: "Backup Phrase",
      description: "Secret recovery phrase stored securely",
      status: "secure",
      icon: Key,
      lastChecked: "Verified today"
    },
    {
      title: "Two-Factor Authentication",
      description: "Additional layer of account protection",
      status: "secure",
      icon: Lock,
      lastChecked: "Active since setup"
    },
    {
      title: "Connection Security",
      description: "Encrypted connections to Algorand network",
      status: "secure",
      icon: Shield,
      lastChecked: "Always encrypted"
    },
    {
      title: "Privacy Mode",
      description: "Control what data is shared publicly",
      status: "warning",
      icon: Eye,
      lastChecked: "Review recommended"
    }
  ];

  const getStatusIcon = (status: string) => {
    return status === "secure" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === "secure" 
      ? "bg-green-500/10 text-green-600" 
      : "bg-yellow-500/10 text-yellow-600";
  };

  return (
    <Card className="p-6 mb-8">
      <h2 className="font-sans font-semibold text-xl text-slate-900 mb-6">
        Security Overview
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {securityItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-slate-500/10 hover:border-slate-500/20 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                  {getStatusIcon(item.status)}
                </div>
                <p className="text-sm text-slate-500 mb-2">
                  {item.description}
                </p>
                <p className="text-xs text-slate-400">
                  {item.lastChecked}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SecurityOverview;
