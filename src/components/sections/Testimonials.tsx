import { Card } from "../ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AlgoWallet has become my go-to solution for Algorand. The security features are top-notch and the interface is incredibly intuitive.",
      name: "Sarah Chen",
      role: "DeFi Developer",
      company: "Algorand Labs",
      avatar: "/placeholder.svg?height=48&width=48&query=professional-woman"
    },
    {
      quote: "Finally, a wallet that doesn't compromise on security or usability. The open-source approach gives me complete confidence in the platform.",
      name: "Marcus Rodriguez",
      role: "Blockchain Security Auditor",
      company: "CyberSec Pro",
      avatar: "/placeholder.svg?height=48&width=48&query=professional-man"
    },
    {
      quote: "The portfolio insights and DeFi integration make managing my Algorand assets effortless. Best wallet I've used for the ecosystem.",
      name: "Alex Kim",
      role: "Crypto Portfolio Manager",
      company: "Digital Assets Fund",
      avatar: "/placeholder.svg?height=48&width=48&query=business-professional"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
            Trusted by the community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what developers and users are saying about AlgoWallet.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 rounded-2xl border border-slate-500/20">
              <div className="mb-4">
                <Quote className="h-8 w-8 text-primary/60 mb-4" />
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar}
                  alt={`${testimonial.name} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-sans font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;