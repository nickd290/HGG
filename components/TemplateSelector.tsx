import React from 'react';
import { TEMPLATES } from '../constants';
import type { TemplateKey } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateKey;
  onSelect: (template: TemplateKey) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelect }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.key}
            onClick={() => onSelect(template.key)}
            className={`p-2 border-2 rounded-lg text-center transition-all duration-200 ${
              selectedTemplate === template.key
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}
          >
            <span className="block text-sm font-medium text-gray-700">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
