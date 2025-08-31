import { Button } from "../ui/button";
import { Card } from "../ui/card";

const ContactForm = () => {
  return (
    <Card className="p-8 rounded-2xl border border-slate-500/20">
      <h3 className="font-sans font-bold text-2xl text-slate-900 mb-6">
        Send us a message
      </h3>
      
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-slate-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Subject
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            placeholder="What's this about?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-slate-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
            placeholder="Tell us more about your inquiry..."
          />
        </div>
        
        <Button className="w-full bg-teal-600 text-white hover:bg-teal-600/90">
          Send Message
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
