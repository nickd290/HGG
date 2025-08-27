import React from 'react';
import { PREBUILT_MENUS } from '../prebuiltMenus';
import type { PrebuiltMenu } from '../types';

interface PrebuiltMenuSelectorProps {
  onSelect: (menu: PrebuiltMenu) => void;
}

export const PrebuiltMenuSelector: React.FC<PrebuiltMenuSelectorProps> = ({ onSelect }) => {
  return (
    <div>
      <div className="space-y-3">
        {PREBUILT_MENUS.map((menu) => (
          <button
            key={menu.id}
            onClick={() => onSelect(menu)}
            className="w-full p-4 border-2 border-gray-300 bg-white rounded-lg text-left transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <p className="font-bold text-gray-800">{menu.name}</p>
            <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};