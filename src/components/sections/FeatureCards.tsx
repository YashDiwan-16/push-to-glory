import { Card } from "@/components/ui/card";
import { Zap, Shield, BarChart3, Key, Boxes, Github } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Send and receive Algorand assets with minimal fees and lightning-fast confirmation times."
    },
    {
      icon: Shield,
      title: "Non-Custodial Security",
      description: "You own your private keys. Your assets remain under your complete control at all times."
    },
    {
      icon: BarChart3,
      title: "Portfolio Insights",
      description: "Track balances, P&L, transaction history, and performance across all your Algorand assets."
    },
    {
      icon: Key,
      title: "Secure Backups",
      description: "Encrypted seed phrase backup and recovery system with multiple restore options."
    },
    {
      icon: Boxes,
      title: "DeFi Ready",
      description: "Seamlessly connect to Algorand dApps and DeFi protocols with WalletConnect integration."
    },
    {
      icon: Github,
      title: "Open Source",
      description: "Fully auditable code. Review our security practices and contribute to the project."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
            Built for power users
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your Algorand assets with confidence and precision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 rounded-2xl border border-slate-500/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;