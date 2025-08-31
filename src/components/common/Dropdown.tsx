import React from 'react';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, position = 'right' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positionClasses = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={`absolute z-50 mt-2 ${positionClasses} min-w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, danger = false }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700'
      }`}
    >
      {children}
    </button>
  );
};

export default Dropdown;
