import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-900 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Ready to own your Algorand experience?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust AlgoWallet for secure, self-custodial Algorand asset management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
            <Button variant="link" size="lg" className="text-slate-300 hover:text-white inline-flex items-center gap-2">
              Read the docs <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;