import React from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <div key={item.id} className="border-b border-slate-200">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full flex justify-between items-center py-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform ${
                openItems.includes(item.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openItems.includes(item.id) && (
            <div className="pb-4 text-slate-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
