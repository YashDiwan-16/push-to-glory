import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Wallet, Shield, Zap } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: "Create or import wallet",
      description: "Generate a new wallet or import an existing one using your seed phrase. Your keys never leave your device."
    },
    {
      number: "02",
      icon: Shield,
      title: "Secure backup",
      description: "Create an encrypted backup of your seed phrase. Store it safely and never share it with anyone."
    },
    {
      number: "03",
      icon: Zap,
      title: "Start transacting",
      description: "Send, receive, and manage your Algorand assets. Connect to dApps and explore the ecosystem."
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to secure, self-custodial Algorand wallet management.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="p-8 rounded-2xl border border-slate-500/20 text-center">
                <div className="flex justify-center mb-6">
                  <Badge variant="outline" className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-sans font-bold border-primary text-primary">
                    {step.number}
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-xl text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;