import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DemoPanel = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-foreground mb-4">
            See AlgoWallet in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the clean, intuitive interface designed for both beginners and advanced users.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden rounded-2xl border border-slate-500/20 shadow-xl">
            <Tabs defaultValue="overview" className="w-full">
              <div className="border-b border-slate-500/10 bg-background">
                <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activity" 
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Activity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="send" 
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Send
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="m-0 p-8">
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                  <img 
                    src="/placeholder.svg?height=420&width=720&query=algorand-wallet-dashboard" 
                    alt="Wallet Overview Dashboard"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="m-0 p-8">
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                  <img 
                    src="/placeholder.svg?height=420&width=720&query=wallet-transaction-history" 
                    alt="Transaction Activity"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="send" className="m-0 p-8">
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center">
                  <img 
                    src="/placeholder.svg?height=420&width=720&query=send-crypto-interface" 
                    alt="Send Assets Interface"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoPanel;