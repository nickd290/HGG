import React, { useState, useCallback, useMemo } from 'react';
import { MenuControls } from './components/MenuControls';
import { MenuPreview } from './components/MenuPreview';
import type { RestaurantInfo, MenuItem, TemplateKey, PrintSize, PrebuiltMenu, CustomizationSettings, Menu } from './types';
import { sampleData, DEFAULT_CUSTOMIZATION_SETTINGS, FONT_PAIRINGS } from './constants';
import { Dashboard } from './components/Dashboard';
import { DashboardIcon } from './components/icons/Icons';

const createInitialMenu = (title = 'Main Menu'): Menu => {
  return {
    id: `menu-${Date.now()}`,
    title: title,
    restaurantInfo: sampleData.restaurantInfo,
    menuItems: sampleData.menuItems,
    selectedTemplate: 'modern',
    printSize: '8.5x11',
    customizationSettings: DEFAULT_CUSTOMIZATION_SETTINGS,
    menuPages: 1,
  }
};

const App: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([createInitialMenu()]);
  const [activeMenuId, setActiveMenuId] = useState<string>(menus[0].id);
  const [view, setView] = useState<'dashboard' | 'editor'>('dashboard');

  const activeMenu = useMemo(() => menus.find(m => m.id === activeMenuId)!, [menus, activeMenuId]);
  
  const updateActiveMenu = useCallback((updates: Partial<Omit<Menu, 'id'>>) => {
    setMenus(prevMenus => prevMenus.map(menu => 
      menu.id === activeMenuId ? { ...menu, ...updates } : menu
    ));
  }, [activeMenuId]);

  const addMenuItem = useCallback((category: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      category,
      name: 'New Item',
      description: 'Delicious description',
      price: '0.00',
      page: 1,
    };
    updateActiveMenu({ menuItems: [...activeMenu.menuItems, newItem] });
  }, [activeMenu, updateActiveMenu]);

  const updateMenuItem = useCallback((id: string, updatedItem: Partial<MenuItem>) => {
    const newItems = activeMenu.menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item);
    updateActiveMenu({ menuItems: newItems });
  }, [activeMenu, updateActiveMenu]);
  
  const updateCategoryPage = useCallback((category: string, newPage: 1 | 2) => {
    const newItems = activeMenu.menuItems.map(item => item.category === category ? { ...item, page: newPage } : item);
    updateActiveMenu({ menuItems: newItems });
  }, [activeMenu, updateActiveMenu]);
  
  const applyPageSplit = useCallback((page2Categories: string[]) => {
    let newItems: MenuItem[];
    if (page2Categories.length === 0) {
      newItems = activeMenu.menuItems.map(item => ({ ...item, page: 1 }));
    } else {
      newItems = activeMenu.menuItems.map(item => ({
        ...item,
        page: page2Categories.includes(item.category) ? 2 : 1
      }));
    }
    updateActiveMenu({ menuItems: newItems });
  }, [activeMenu, updateActiveMenu]);
  
  const splitActiveMenu = useCallback((categoriesToMove: string[], newMenuTitle: string) => {
    const mainMenuItems = activeMenu.menuItems.filter(item => !categoriesToMove.includes(item.category));
    const newMenuItems = activeMenu.menuItems.filter(item => categoriesToMove.includes(item.category));

    const newMenu: Menu = {
        ...activeMenu,
        id: `menu-${Date.now()}`,
        title: newMenuTitle,
        menuItems: newMenuItems.map(item => ({ ...item, page: 1 })), // Reset to page 1 for the new menu
        menuPages: 1, // The new menu starts as 1 page
    };

    // Update the current menu to remove the moved items
    updateActiveMenu({ 
        menuItems: mainMenuItems,
        menuPages: mainMenuItems.some(i => i.page === 2) ? 2 : 1, // Recalculate pages for main menu
    });
    
    // Add the new menu to the list
    setMenus(prev => [...prev, newMenu]);

  }, [activeMenu, updateActiveMenu]);


  const deleteMenuItem = useCallback((id: string) => {
    const newItems = activeMenu.menuItems.filter(item => item.id !== id);
    updateActiveMenu({ menuItems: newItems });
  }, [activeMenu, updateActiveMenu]);

  const loadPrebuiltMenu = useCallback((menu: PrebuiltMenu) => {
    const itemsWithPages = menu.menuItems.map(item => ({...item, page: item.page || 1}));
    const hasPage2 = itemsWithPages.some(item => item.page === 2);
    
    updateActiveMenu({
        restaurantInfo: menu.restaurantInfo,
        menuItems: itemsWithPages,
        menuPages: hasPage2 ? 2 : 1,
    });
  }, [updateActiveMenu]);
  
  // --- Dashboard Functions ---
  
  const createNewMenu = useCallback(() => {
    const newMenu = createInitialMenu(`New Menu ${menus.length + 1}`);
    setMenus(prev => [...prev, newMenu]);
    setActiveMenuId(newMenu.id);
    setView('editor');
  }, [menus.length]);
  
  const editMenu = useCallback((id: string) => {
    setActiveMenuId(id);
    setView('editor');
  }, []);

  const deleteMenu = useCallback((idToDelete: string) => {
    if (menus.length <= 1) {
        alert("You cannot delete the last menu.");
        return;
    }
    
    setMenus(prevMenus => {
      const newMenus = prevMenus.filter(m => m.id !== idToDelete);
      if (activeMenuId === idToDelete) {
        setActiveMenuId(newMenus[0].id);
      }
      return newMenus;
    });
  }, [menus.length, activeMenuId]);


  const handlePrint = () => {
    if (!activeMenu) return;

    const sizeStyles: Record<PrintSize, string> = {
      '8.5x11': '8.5in 11in',
      '11x17': '11in 17in',
      '11x14': '11in 14in',
      '5.5x8.5': '5.5in 8.5in',
    };

    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        @page {
          size: ${sizeStyles[activeMenu.printSize]};
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .printable-page {
          width: 100%;
          height: 100%;
          max-width: none;
          box-shadow: none;
          border: none;
          transform: scale(1);
          margin: 0;
          padding: 0;
          page-break-after: always;
        }
        .printable-page:last-child {
          page-break-after: auto;
        }
        #menu-preview-container > div {
           display: block !important; /* Ensure pages are block-level for printing */
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    
    const existingStyle = document.getElementById('print-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
    window.print();
  };
  
  if (view === 'dashboard') {
    return (
        <Dashboard 
            menus={menus}
            onEdit={editMenu}
            onDelete={deleteMenu}
            onCreate={createNewMenu}
        />
    );
  }

  if (!activeMenu) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-sm p-4 print:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('dashboard')}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors text-sm"
              >
                <DashboardIcon className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900 hidden md:block">AI Menu Creator</h1>
          </div>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Finalize & Order Print
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-white p-6 print:hidden overflow-y-auto h-screen-minus-header">
          <MenuControls
            activeMenu={activeMenu}
            updateActiveMenu={updateActiveMenu}
            addMenuItem={addMenuItem}
            updateMenuItem={updateMenuItem}
            deleteMenuItem={deleteMenuItem}
            updateCategoryPage={updateCategoryPage}
            applyPageSplit={applyPageSplit}
            splitActiveMenu={splitActiveMenu}
            loadPrebuiltMenu={loadPrebuiltMenu}
            setMenuItems={(newItems) => updateActiveMenu({ menuItems: typeof newItems === 'function' ? newItems(activeMenu.menuItems) : newItems })}
          />
        </div>

        <div className="w-full lg:w-2/3 xl:w-3/4 p-8 bg-gray-100 flex flex-col items-center overflow-y-auto h-screen-minus-header print:w-full print:p-0 print:m-0 print:bg-white">
          <MenuPreview 
            menus={menus}
            activeMenu={activeMenu}
            setActiveMenuId={setActiveMenuId}
            updateActiveMenu={updateActiveMenu}
          />
        </div>
      </main>
    </div>
  );
};

// Custom CSS to subtract header height for scrolling containers
const style = document.createElement('style');
style.innerHTML = `
  .h-screen-minus-header {
    height: calc(100vh - 68px); /* Adjust 68px to your header's actual height */
  }
`;
document.head.appendChild(style);

export default App;