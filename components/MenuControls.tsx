import React from 'react';
import type { RestaurantInfo, MenuItem, TemplateKey, PrintSize, PrebuiltMenu, CustomizationSettings, Menu } from '../types';
import { TemplateSelector } from './TemplateSelector';
import { RestaurantInfoForm } from './RestaurantInfoForm';
import { MenuItemsForm } from './MenuItemsForm';
import { AIContentAssistant } from './AITools';
import { AccordionItem } from './AccordionItem';
import { PrintOptions } from './PrintOptions';
import { PrebuiltMenuSelector } from './PrebuiltMenuSelector';
import { StyleCustomizer } from './StyleCustomizer';
import { AIDesignAssistant } from './AIDesignAssistant';
import { PageLayoutOptions } from './PageLayoutOptions';
import { AIAutoFormatter } from './AIAutoFormatter';

interface MenuControlsProps {
  activeMenu: Menu;
  updateActiveMenu: (updates: Partial<Omit<Menu, 'id'>>) => void;
  addMenuItem: (category: string) => void;
  updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateCategoryPage: (category: string, newPage: 1 | 2) => void;
  applyPageSplit: (page2Categories: string[]) => void;
  splitActiveMenu: (categoriesToMove: string[], newMenuTitle: string) => void;
  loadPrebuiltMenu: (menu: PrebuiltMenu) => void;
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; // For AI Content Assistant
}

export const MenuControls: React.FC<MenuControlsProps> = (props) => {
  const { activeMenu, updateActiveMenu } = props;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <AccordionItem title="1. Menu Setup" startOpen={true}>
        <p className="text-sm text-gray-600 mb-4">
          Get started quickly by selecting a pre-built menu. This will replace the content of your currently selected menu tab.
        </p>
        <PrebuiltMenuSelector onSelect={props.loadPrebuiltMenu} />
      </AccordionItem>
      
      <AccordionItem title="2. Customize Design">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Template</h3>
            <TemplateSelector selectedTemplate={activeMenu.selectedTemplate} onSelect={(template) => updateActiveMenu({ selectedTemplate: template })} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Colors & Fonts</h3>
            <StyleCustomizer settings={activeMenu.customizationSettings} setSettings={(settings) => updateActiveMenu({ customizationSettings: typeof settings === 'function' ? settings(activeMenu.customizationSettings) : settings })} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Page Layout</h3>
            <PageLayoutOptions selectedPages={activeMenu.menuPages} onSelect={(pages) => updateActiveMenu({ menuPages: pages })} />
          </div>
          <div>
             <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Design Assistant</h3>
             <p className="text-sm text-gray-600 mb-4">Let our AI designer suggest a complete visual theme for your menu.</p>
             <AIDesignAssistant
                restaurantInfo={activeMenu.restaurantInfo}
                menuItems={activeMenu.menuItems}
                setCustomizationSettings={(settings) => updateActiveMenu({ customizationSettings: typeof settings === 'function' ? settings(activeMenu.customizationSettings) : settings })}
                setSelectedTemplate={(template) => updateActiveMenu({ selectedTemplate: template })}
             />
          </div>
           <div>
             <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Auto-Format Layout</h3>
             <p className="text-sm text-gray-600 mb-4">Let AI analyze your menu and suggest the best layout to fit all your content on the selected number of pages.</p>
             <AIAutoFormatter
                menuItems={activeMenu.menuItems}
                printSize={activeMenu.printSize}
                menuPages={activeMenu.menuPages}
                setCustomizationSettings={(settings) => updateActiveMenu({ customizationSettings: typeof settings === 'function' ? settings(activeMenu.customizationSettings) : settings })}
                setMenuPages={(pages) => updateActiveMenu({ menuPages: typeof pages === 'function' ? pages(activeMenu.menuPages) : pages })}
                applyPageSplit={props.applyPageSplit}
                splitActiveMenu={props.splitActiveMenu}
             />
          </div>
        </div>
      </AccordionItem>
      
      <AccordionItem title="3. Edit Menu Content">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Details</h3>
            <RestaurantInfoForm info={activeMenu.restaurantInfo} setInfo={(info) => updateActiveMenu({ restaurantInfo: typeof info === 'function' ? info(activeMenu.restaurantInfo) : info })} />
          </div>
           <div>
             <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Content Assistant</h3>
             <p className="text-sm text-gray-600 mb-4">Need inspiration? Let AI suggest new, complementary items based on your current menu.</p>
             <AIContentAssistant menuItems={activeMenu.menuItems} setMenuItems={props.setMenuItems} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu Items</h3>
            <p className="text-sm text-gray-600 mb-4">Add, edit, and organize your menu items by category. If using a two-page layout, you can move categories between pages here.</p>
            <MenuItemsForm
              items={activeMenu.menuItems}
              onAdd={props.addMenuItem}
              onUpdate={props.updateMenuItem}
              onDelete={props.deleteMenuItem}
              onUpdateCategoryPage={props.updateCategoryPage}
              menuPages={activeMenu.menuPages}
            />
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title="4. Finalize & Print">
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Print Size</h3>
                <PrintOptions selectedSize={activeMenu.printSize} onSelect={(size) => updateActiveMenu({ printSize: size })} />
            </div>
        </div>
      </AccordionItem>
    </div>
  );
};