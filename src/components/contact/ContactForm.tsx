import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "../../lib/validations/contact";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 rounded-2xl border border-slate-500/20 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-600/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-teal-600" />
        </div>
        <h3 className="font-sans font-bold text-2xl text-slate-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-slate-500">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 rounded-2xl border border-slate-500/20">
      <div className="text-center mb-6">
        <h3 className="font-sans font-bold text-2xl text-slate-900 mb-2">
          Get in Touch
        </h3>
        <p className="text-slate-500">
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all ${
              errors.email ? "border-red-500" : "border-slate-500/20"
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Message *
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none transition-all ${
              errors.message ? "border-red-500" : "border-slate-500/20"
            }`}
            placeholder="Tell us about your inquiry, feedback, or how we can help you..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white hover:bg-teal-600/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
