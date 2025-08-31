import { Send, ArrowLeftRight, Coins, Shield, Plus, ExternalLink } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const QuickActions = () => {
  const actions = [
    {
      icon: Send,
      title: "Send",
      description: "Transfer ALGO or ASAs",
      color: "teal",
      action: () => console.log("Send clicked")
    },
    {
      icon: Plus,
      title: "Receive",
      description: "Get your wallet address",
      color: "blue",
      action: () => console.log("Receive clicked")
    },
    {
      icon: ArrowLeftRight,
      title: "Swap",
      description: "Exchange tokens",
      color: "teal",
      action: () => console.log("Swap clicked")
    },
    {
      icon: Coins,
      title: "Stake",
      description: "Earn rewards",
      color: "blue",
      action: () => console.log("Stake clicked")
    }
  ];

  const getColorClasses = (color: string) => {
    return color === "teal" 
      ? "bg-teal-600/10 text-teal-600 group-hover:bg-teal-600/20"
      : "bg-blue-600/10 text-blue-600 group-hover:bg-blue-600/20";
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-sans font-semibold text-lg text-slate-900 mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="group p-4 rounded-lg border border-slate-500/10 hover:border-slate-500/20 transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${getColorClasses(action.color)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{action.title}</h4>
                <p className="text-sm text-slate-500">{action.description}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Security Status */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg text-slate-900">
              Security Status
            </h3>
            <p className="text-sm text-green-600">All systems secure</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Backup Phrase</span>
            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
              Secured
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">2FA Enabled</span>
            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Last Security Check</span>
            <span className="text-xs text-slate-500">2 hours ago</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4 text-slate-600 border-slate-500/20 hover:bg-slate-50"
        >
          Security Settings
        </Button>
      </Card>

      {/* Market Data */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-semibold text-lg text-slate-900">
            ALGO Price
          </h3>
          <ExternalLink className="h-4 w-4 text-slate-400" />
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">$2.28</span>
              <span className="text-sm bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                +5.67%
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">24h change</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-500/10">
            <div>
              <p className="text-xs text-slate-500 mb-1">24h High</p>
              <p className="font-semibold text-slate-900">$2.31</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">24h Low</p>
              <p className="font-semibold text-slate-900">$2.15</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuickActions;
