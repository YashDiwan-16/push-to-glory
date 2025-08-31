import Navbar from "../components/sections/Navbar";
import ContactForm from "../components/contact/ContactForm";
import BlockchainAnimation from "../components/contact/BlockchainAnimation";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Have questions about our Algorand wallet? We're here to help you secure your digital assets.
            </p>
          </div>
          
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Blockchain Animation */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <BlockchainAnimation />
                
                {/* Additional Info */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-600/10 flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-slate-900 mb-1">
                        Secure by Design
                      </h3>
                      <p className="text-slate-500">
                        Built on Algorand's secure blockchain infrastructure with enterprise-grade security.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-slate-900 mb-1">
                        24/7 Support
                      </h3>
                      <p className="text-slate-500">
                        We typically respond within 24 hours to help resolve any issues or questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
