import { Github, Twitter, MessageCircle, ExternalLink } from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Security", href: "#security" },
      { name: "Pricing", href: "#pricing" },
      { name: "Roadmap", href: "#roadmap" }
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Community", href: "#" }
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Contact", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Discord", icon: MessageCircle, href: "#" }
  ];

  return (
    <footer className="border-t border-slate-500/20 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="font-sans font-bold text-xl text-foreground mb-4">
              AlgoWallet
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The secure, non-custodial Algorand wallet designed for power users who demand control over their digital assets.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-sans font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 AlgoWallet. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for the Algorand community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;