import { Card } from "../ui/card";

interface ContactCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  href: string;
}

const ContactCard = ({ title, description, icon, action, href }: ContactCardProps) => {
  return (
    <Card className="p-6 rounded-2xl border border-slate-500/20 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-lg bg-teal-600/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="font-sans font-semibold text-xl text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-slate-500 mb-4">
          {description}
        </p>
        <a 
          href={href}
          className="text-teal-600 hover:text-teal-600/80 font-medium transition-colors"
        >
          {action}
        </a>
      </div>
    </Card>
  );
};

export default ContactCard;
