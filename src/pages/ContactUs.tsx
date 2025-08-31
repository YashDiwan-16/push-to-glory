import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="font-sans font-bold text-4xl md:text-5xl text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get in touch with our team for support, partnerships, or any questions about AlgoWallet.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="font-sans font-bold text-2xl text-slate-900 mb-8 text-center">
            How can we help you?
          </h2>
          <ContactInfo />
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
