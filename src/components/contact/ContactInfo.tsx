import ContactCard from "./ContactCard";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";

const ContactInfo = () => {
  const contactMethods = [
    {
      title: "Email Support",
      description: "Get help with technical issues or general inquiries",
      icon: <Mail className="h-6 w-6 text-teal-600" />,
      action: "support@algowallet.io",
      href: "mailto:support@algowallet.io"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: <MessageCircle className="h-6 w-6 text-teal-600" />,
      action: "Start chat",
      href: "#"
    },
    {
      title: "Phone Support",
      description: "Call us for urgent matters and complex issues",
      icon: <Phone className="h-6 w-6 text-teal-600" />,
      action: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      title: "Office Location",
      description: "Visit our headquarters for in-person meetings",
      icon: <MapPin className="h-6 w-6 text-teal-600" />,
      action: "View on maps",
      href: "#"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactMethods.map((method, index) => (
        <ContactCard
          key={index}
          title={method.title}
          description={method.description}
          icon={method.icon}
          action={method.action}
          href={method.href}
        />
      ))}
    </div>
  );
};

export default ContactInfo;
