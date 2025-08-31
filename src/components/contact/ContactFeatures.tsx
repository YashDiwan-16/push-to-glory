import { Shield, Clock, Users, Zap } from "lucide-react";

const ContactFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Communication",
      description: "All messages are encrypted and your privacy is our priority.",
      color: "teal"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "We typically respond within 24 hours or less.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our team consists of blockchain and security experts.",
      color: "teal"
    },
    {
      icon: Zap,
      title: "Fast Resolution",
      description: "We prioritize resolving your issues as quickly as possible.",
      color: "blue"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const bgColor = feature.color === "teal" ? "bg-teal-600/10" : "bg-blue-600/10";
        const iconColor = feature.color === "teal" ? "text-teal-600" : "text-blue-600";
        
        return (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-slate-500/10 hover:border-slate-500/20 transition-colors">
            <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-sm text-slate-900 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-500">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactFeatures;
