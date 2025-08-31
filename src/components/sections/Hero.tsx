import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ExternalLink, Play } from "lucide-react";
import walletDashboard from "@/assets/wallet-dashboard.jpg";

const Hero = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Self-custody Algorand wallet for power users
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              A fast, secure, and intuitive non-custodial wallet that puts you in control of your Algorand assets. Built for developers and advanced users who demand security without compromise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                Try the Demo
              </Button>
              <Button variant="link" size="lg" className="text-blue-600 hover:text-blue-600/80 inline-flex items-center gap-2">
                View on GitHub <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-lg overflow-hidden rounded-2xl shadow-lg border border-slate-500/20 hover:shadow-xl transition-shadow duration-200">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 flex items-center justify-center">
                <img 
                  src={walletDashboard}
                  alt="AlgoWallet Dashboard Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;