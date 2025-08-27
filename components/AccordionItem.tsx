import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  startOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  const id = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h2 id={`accordion-header-${id}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-expanded={isOpen}
          aria-controls={`accordion-body-${id}`}
        >
          <span className="text-xl font-bold text-gray-800">{title}</span>
          <ChevronDownIcon className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </h2>
      <div
          id={`accordion-body-${id}`}
          aria-labelledby={`accordion-header-${id}`}
          className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
            <div className="p-5 border-t border-gray-200">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};
