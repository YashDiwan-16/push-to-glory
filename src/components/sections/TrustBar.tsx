const TrustBar = () => {
  const partners = [
    { name: "TechCrunch", logo: "/placeholder.svg?height=48&width=120&query=techcrunch-logo" },
    { name: "Algorand Foundation", logo: "/placeholder.svg?height=48&width=120&query=algorand-foundation" },
    { name: "DeFi Pulse", logo: "/placeholder.svg?height=48&width=120&query=defi-pulse" },
    { name: "CoinDesk", logo: "/placeholder.svg?width=120&height=48&query=coindesk-logo" },
    { name: "Crypto News", logo: "/placeholder.svg?width=120&height=48&query=crypto-news" },
    { name: "Web3 Weekly", logo: "/placeholder.svg?width=120&height=48&query=web3-weekly" }
  ];

  return (
    <section className="py-16 border-t border-slate-500/10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by developers and teams
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div key={index} className="opacity-60 hover:opacity-100 transition-opacity duration-200">
              <img 
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-8 w-auto max-w-full grayscale hover:grayscale-0 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;