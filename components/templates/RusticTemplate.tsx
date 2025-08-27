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
    case 'auto': default: return 'grid-cols-1'; // Rustic is single-column by default
  }
};

const getLayoutStyles = (size: 'normal' | 'small' | 'smaller') => {
  switch (size) {
    case 'small': return {
      padding: 'p-8',
      fontSizes: { h1: 'text-4xl', p: 'text-base', h2: 'text-2xl', h3: 'text-lg', pDesc: 'text-sm leading-tight' }
    };
    case 'smaller': return {
      padding: 'p-6',
      fontSizes: { h1: 'text-3xl', p: 'text-sm', h2: 'text-xl', h3: 'text-base', pDesc: 'text-xs leading-tight' }
    };
    case 'normal': default: return {
      padding: 'p-10',
      fontSizes: { h1: 'text-5xl', p: 'text-lg', h2: 'text-3xl', h3: 'text-xl', pDesc: 'text-base' }
    };
  }
};

export const RusticTemplate: React.FC<TemplateProps> = ({ restaurantInfo, groupedItems, customization, isSecondPage }) => {
  const bodyStyle = { fontFamily: customization.bodyFont, backgroundColor: customization.backgroundColor === '#FFFFFF' ? '#fdfaf4' : customization.backgroundColor };
  const headingStyle = { fontFamily: customization.headingFont, color: customization.primaryColor };
  
  const columnClass = getColumnClass(customization.columns);
  const { padding, fontSizes } = getLayoutStyles(customization.fontSize);
  
  const regularCategories = Object.keys(groupedItems).filter(c => c !== 'Disclaimers');
  const disclaimers = groupedItems['Disclaimers'] || [];
  
  return (
    <div className={`${padding} font-serif h-full border-2 overflow-hidden`} style={{...bodyStyle, borderColor: customization.secondaryColor}}>
      {!isSecondPage && (
        <header className="text-center mb-10 pb-4 border-b-2" style={{borderColor: customization.secondaryColor}}>
            <h1 className={fontSizes.h1} style={{...headingStyle, fontFamily: "'Dancing Script', cursive"}}>{restaurantInfo.name}</h1>
            <p className={`${fontSizes.p} mt-2`} style={{color: customization.secondaryColor}}>{restaurantInfo.tagline}</p>
        </header>
      )}
      {isSecondPage && (
         <header className="text-center mb-10 pb-4 border-b-2" style={{borderColor: customization.secondaryColor}}>
            <h1 className="text-3xl" style={{...headingStyle, fontFamily: "'Dancing Script', cursive"}}>{restaurantInfo.name}</h1>
        </header>
      )}

      <div className="space-y-10">
        {regularCategories.map((category) => (
          <div key={category}>
            <h2 className={`${fontSizes.h2} font-bold text-center mb-6`} style={headingStyle}>{category}</h2>
            <div className={`grid ${columnClass} gap-x-6 gap-y-4`}>
              {groupedItems[category].map(item => (
                <div key={item.id} className="text-center">
                  <div className="flex justify-center items-baseline space-x-2">
                    <h3 className={`font-bold ${fontSizes.h3}`} style={{color: customization.primaryColor}}>{item.name}</h3>
                    <span className={fontSizes.h3} style={{color: customization.secondaryColor}}>&#x2022;</span>
                    <p className={`font-bold ${fontSizes.h3}`} style={{color: customization.primaryColor}}>{item.price}</p>
                  </div>
                  <p className={`${fontSizes.pDesc} italic max-w-md mx-auto`} style={{color: customization.secondaryColor}}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
         {disclaimers.length > 0 && (
          <div className="pt-4 mt-10 border-t" style={{borderColor: customization.secondaryColor}}>
            <div className="text-center space-y-1">
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
