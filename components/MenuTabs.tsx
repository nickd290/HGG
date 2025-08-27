import React from 'react';
import type { Menu } from '../types';

interface MenuTabsProps {
  menus: Menu[];
  activeMenuId: string;
  setActiveMenuId: (id: string) => void;
}

export const MenuTabs: React.FC<MenuTabsProps> = ({ menus, activeMenuId, setActiveMenuId }) => {
  return (
    <div className="w-full max-w-4xl no-print">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveMenuId(menu.id)}
              className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors
                ${
                  menu.id === activeMenuId
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={menu.id === activeMenuId ? 'page' : undefined}
            >
              {menu.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};