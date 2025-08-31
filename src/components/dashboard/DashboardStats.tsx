import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card } from "../ui/card";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$2,834.21",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Portfolio Growth",
      value: "+18.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "this month"
    },
    {
      title: "Active Stakes",
      value: "4",
      change: "+1",
      changeType: "positive" as const,
      icon: Activity,
      description: "currently earning"
    },
    {
      title: "DeFi Protocols",
      value: "7",
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
      description: "connected"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.changeType === 'positive' 
                  ? 'bg-green-500/10 text-green-600' 
                  : 'bg-red-500/10 text-red-600'
              }`}>
                <Icon className="h-6 w-6" />
              </div>
              
              <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive'
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-slate-600 mb-1">
                {stat.title}
              </p>
              <p className="text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
