import React from 'react';

interface PageLayoutOptionsProps {
  selectedPages: 1 | 2;
  onSelect: (pages: 1 | 2) => void;
}

export const PageLayoutOptions: React.FC<PageLayoutOptionsProps> = ({ selectedPages, onSelect }) => {
  const options: { key: 1 | 2; name: string }[] = [
    { key: 1, name: 'Single Page' },
    { key: 2, name: 'Two Pages' },
  ];

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Choose a layout for your menu. For longer menus, a two-page layout is recommended.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedPages === option.key
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}
          >
            <span className="block text-sm font-medium text-gray-700">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
