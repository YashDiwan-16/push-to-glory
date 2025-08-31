import { TrendingUp, Eye, Heart, Star } from "lucide-react";
import { Card } from "../ui/card";

const NFTStats = () => {
  const stats = [
    {
      title: "Total NFTs",
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: Eye,
      description: "in your collection"
    },
    {
      title: "Total Value",
      value: "1,250 ALGO",
      change: "+15.2%",
      changeType: "positive" as const, 
      icon: TrendingUp,
      description: "estimated worth"
    },
    {
      title: "Favorites",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Heart,
      description: "marked as favorite"
    },
    {
      title: "Rare Items",
      value: "6",
      change: "+1",
      changeType: "positive" as const,
      icon: Star,
      description: "epic or legendary"
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
                  ? 'bg-teal-500/10 text-teal-600' 
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

export default NFTStats;
