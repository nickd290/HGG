import React from 'react';
import type { RestaurantInfo, MenuItem, CustomizationSettings } from '../../types';

interface TemplateProps {
  restaurantInfo: RestaurantInfo;
  groupedItems: Record<string, MenuItem[]>;
  customization: CustomizationSettings;
  isSecondPage?: boolean;
}

const getColumnClass = (columns: 'auto' | 1 | 2 | 3) => {
  switch (columns) {
    case 1: return 'grid-cols-1';
    case 2: return 'grid-cols-2';
    case 3: return 'grid-cols-3';
    case 'auto': default: return 'grid-cols-1'; // Minimalist is single-column by default
  }
};

const getLayoutStyles = (size: 'normal' | 'small' | 'smaller') => {
  switch (size) {
    case 'small': return {
      padding: 'p-10',
      fontSizes: { h1: 'text-3xl', h2: 'text-base', h3: 'text-sm', pDesc: 'text-xs leading-tight' }
    };
    case 'smaller': return {
      padding: 'p-8',
      fontSizes: { h1: 'text-2xl', h2: 'text-sm', h3: 'text-xs', pDesc: 'text-[10px] leading-tight' }
    };
    case 'normal': default: return {
      padding: 'p-12',
      fontSizes: { h1: 'text-4xl', h2: 'text-lg', h3: 'text-lg', pDesc: 'text-sm' }
    };
  }
};

export const MinimalistTemplate: React.FC<TemplateProps> = ({ restaurantInfo, groupedItems, customization, isSecondPage }) => {
  const bodyStyle = { fontFamily: customization.bodyFont, color: customization.secondaryColor, backgroundColor: customization.backgroundColor };
  const headingStyle = { fontFamily: customization.headingFont, color: customization.primaryColor };
  
  const columnClass = getColumnClass(customization.columns);
  const { padding, fontSizes } = getLayoutStyles(customization.fontSize);

  const regularCategories = Object.keys(groupedItems).filter(c => c !== 'Disclaimers');
  const disclaimers = groupedItems['Disclaimers'] || [];

  return (
    <div className={`${padding} h-full overflow-hidden`} style={bodyStyle}>
      <header className="mb-12">
        <h1 
            className={`font-normal tracking-widest uppercase ${isSecondPage ? 'text-2xl' : fontSizes.h1}`}
            style={headingStyle}
        >
            {restaurantInfo.name}
        </h1>
      </header>

      <div className="space-y-12">
        {regularCategories.map((category) => (
          <div key={category}>
            <h2 className={`${fontSizes.h2} font-semibold tracking-[0.2em] uppercase mb-6`} style={{ ...headingStyle, letterSpacing: '0.2em' }}>{category}</h2>
            <div className={`grid ${columnClass} gap-x-8 gap-y-6`}>
              {groupedItems[category].map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`${fontSizes.h3} font-medium`} style={{ color: customization.primaryColor }}>{item.name}</h3>
                    <p className={`${fontSizes.h3} font-medium text-right pl-2`} style={{ color: customization.primaryColor }}>{item.price}</p>
                  </div>
                  {item.description && (
                    <p className={`${fontSizes.pDesc} mt-1 pr-8`}>{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
         {disclaimers.length > 0 && (
          <div className="pt-4 mt-10">
            <div className="text-left space-y-1">
              {disclaimers.map(item => (
                 <p key={item.id} className="text-xs" style={{color: customization.secondaryColor}}>{item.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
