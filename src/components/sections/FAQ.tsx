import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is AlgoWallet non-custodial?",
      answer: "Yes, AlgoWallet is completely non-custodial. You maintain full control of your private keys, which are stored locally on your device. We never have access to your funds or personal keys."
    },
    {
      question: "How do I back up my wallet?",
      answer: "During wallet creation, you'll receive a 25-word seed phrase. This phrase is your backup - store it securely offline. You can also create encrypted backups through the app's security settings."
    },
    {
      question: "Are fees high on Algorand?",
      answer: "Algorand transactions cost only 0.001 ALGO (typically less than $0.01). This makes it one of the most cost-effective blockchains for regular transactions and DeFi activities."
    },
    {
      question: "Is the code open source?",
      answer: "Yes, AlgoWallet is fully open source. You can review our code, contribute to development, and verify our security practices on GitHub. Transparency is core to our mission."
    },
    {
      question: "Does it support hardware wallets?",
      answer: "Hardware wallet support is coming soon. We're working on integrations with Ledger and other popular hardware wallets to provide an additional layer of security for large holdings."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team through our GitHub issues page, Discord community, or email support. We typically respond within 24 hours and provide comprehensive documentation."
    }
  ];

  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className=" mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about AlgoWallet security, features, and usage.
          </p>      
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="text-left font-sans font-semibold !text-white hover:text-primary">
                <AccordionTrigger className="text-left font-sans font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;