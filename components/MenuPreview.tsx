import React, { useMemo } from 'react';
import type { Menu, TemplateKey } from '../types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { RusticTemplate } from './templates/RusticTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { GourmetTemplate } from './templates/GourmetTemplate';
import { PRINT_OPTIONS, TEMPLATES } from '../constants';
import { MenuTabs } from './MenuTabs';

interface MenuPreviewProps {
  menus: Menu[];
  activeMenu: Menu;
  setActiveMenuId: (id: string) => void;
  updateActiveMenu: (updates: Partial<Omit<Menu, 'id'>>) => void;
}

const groupItems = (items: Menu['menuItems']) => {
  return items.reduce((acc: Record<string, Menu['menuItems']>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

export const MenuPreview: React.FC<MenuPreviewProps> = ({ menus, activeMenu, setActiveMenuId, updateActiveMenu }) => {
  const { 
    selectedTemplate, 
    restaurantInfo, 
    menuItems, 
    printSize, 
    customizationSettings, 
    menuPages 
  } = activeMenu;

  const page1Items = useMemo(() => menuItems.filter(item => item.page === 1), [menuItems]);
  const page2Items = useMemo(() => menuItems.filter(item => item.page === 2), [menuItems]);

  const groupedPage1Items = useMemo(() => groupItems(page1Items), [page1Items]);
  const groupedPage2Items = useMemo(() => groupItems(page2Items), [page2Items]);
  
  const setSelectedTemplate = (template: TemplateKey) => {
    updateActiveMenu({ selectedTemplate: template });
  };
  
  const renderTemplate = (pageNumber: 1 | 2) => {
    const isSecondPage = pageNumber === 2;
    const props = { 
        restaurantInfo, 
        groupedItems: isSecondPage ? groupedPage2Items : groupedPage1Items,
        customization: customizationSettings,
        isSecondPage,
    };

    switch (selectedTemplate) {
      case 'classic': return <ClassicTemplate {...props} />;
      case 'modern': return <ModernTemplate {...props} />;
      case 'rustic': return <RusticTemplate {...props} />;
      case 'minimalist': return <MinimalistTemplate {...props} />;
      case 'gourmet': return <GourmetTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  const sizeClasses: Record<Menu['printSize'], string> = {
    '8.5x11': 'aspect-[8.5/11] max-w-xl',
    '11x17': 'aspect-[11/17] max-w-2xl',
    '11x14': 'aspect-[11/14] max-w-2xl',
    '5.5x8.5': 'aspect-[5.5/8.5] max-w-md',
  };

  const selectedPrintOption = PRINT_OPTIONS.find(option => option.key === printSize);
  const pagesToRender = menuPages === 2 ? [1, 2] : [1];

  return (
    <div id="menu-preview-container" className="w-full flex flex-col items-center">
        {/* Menu Tabs */}
        {menus.length > 1 && (
            <MenuTabs menus={menus} activeMenuId={activeMenu.id} setActiveMenuId={setActiveMenuId} />
        )}
        
        {/* Template Switcher */}
        <div className="w-full max-w-4xl my-4 no-print">
            <div className="flex justify-center items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200 space-x-2">
                <span className="text-sm font-semibold text-gray-600 mr-2">Preview Template:</span>
                {TEMPLATES.map((template) => (
                    <button
                        key={template.key}
                        onClick={() => setSelectedTemplate(template.key)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            selectedTemplate === template.key
                                ? 'bg-blue-600 text-white shadow'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {template.name}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="relative flex flex-row items-start justify-center gap-8 print:block w-full">
            {/* Visual print size indicator */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-mono no-print whitespace-nowrap">
                {selectedPrintOption?.name || printSize} {menuPages === 2 && '(Two Pages)'}
            </div>

            {pagesToRender.map(page => (
                <div 
                    key={page}
                    id={`page-${page}`}
                    className={`printable-page w-full bg-white shadow-menu print:shadow-none print:outline-none transition-all duration-300 ease-in-out ${sizeClasses[printSize]} outline outline-1 outline-dashed outline-gray-400`}
                >
                    {renderTemplate(page as 1 | 2)}
                </div>
            ))}
        </div>
    </div>
  );
};