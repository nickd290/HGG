
import React from 'react';
import { PRINT_OPTIONS } from '../constants';
import type { PrintSize } from '../types';

interface PrintOptionsProps {
  selectedSize: PrintSize;
  onSelect: (size: PrintSize) => void;
}

export const PrintOptions: React.FC<PrintOptionsProps> = ({ selectedSize, onSelect }) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Select a size for your menu. The preview will adjust to the correct aspect ratio for an accurate visual.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {PRINT_OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedSize === option.key
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
