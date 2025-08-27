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
    case 'auto': default: return 'grid-cols-1'; // Classic default is single column
  }
};

const getLayoutStyles = (size: 'normal' | 'small' | 'smaller') => {
  switch (size) {
    case 'small': return {
      padding: 'p-10',
      fontSizes: { h1: 'text-4xl', p: 'text-base', h2: 'text-xl', h3: 'text-base', pDesc: 'text-xs leading-tight' }
    };
    case 'smaller': return {
      padding: 'p-8',
      fontSizes: { h1: 'text-3xl', p: 'text-sm', h2: 'text-lg', h3: 'text-sm', pDesc: 'text-[10px] leading-tight' }
    };
    case 'normal': default: return {
      padding: 'p-12',
      fontSizes: { h1: 'text-6xl', p: 'text-xl', h2: 'text-3xl', h3: 'text-xl', pDesc: 'text-sm' }
    };
  }
};

export const ClassicTemplate: React.FC<TemplateProps> = ({ restaurantInfo, groupedItems, customization, isSecondPage }) => {
  const bodyStyle = { fontFamily: customization.bodyFont, backgroundColor: customization.backgroundColor };
  const headingStyle = { fontFamily: customization.headingFont, color: customization.primaryColor };

  const { padding, fontSizes } = getLayoutStyles(customization.fontSize);
  const columnClass = getColumnClass(customization.columns);
  
  const regularCategories = Object.keys(groupedItems).filter(c => c !== 'Disclaimers');
  const disclaimers = groupedItems['Disclaimers'] || [];
  
  return (
    <div className={`${padding} font-serif h-full text-gray-900 border-4 overflow-hidden`} style={{...bodyStyle, borderColor: customization.primaryColor}}>
      {!isSecondPage && (
        <header className="text-center mb-12">
            <h1 className={`${fontSizes.h1} font-bold`} style={headingStyle}>{restaurantInfo.name}</h1>
            <p className={`${fontSizes.p} italic mt-3`} style={{ color: customization.secondaryColor }}>{restaurantInfo.tagline}</p>
        </header>
      )}
       {isSecondPage && (
        <header className="text-center mb-12">
            <h1 className="text-3xl font-bold" style={headingStyle}>{restaurantInfo.name}</h1>
        </header>
      )}
      
      <div className="space-y-10">
        {regularCategories.map((category) => (
          <div key={category} className="text-center">
            <h2 className={`${fontSizes.h2} font-bold mb-6 tracking-wide`} style={headingStyle}>{category}</h2>
            <div className={`grid ${columnClass} gap-x-8 gap-y-6 max-w-4xl mx-auto`}>
              {groupedItems[category].map(item => (
                <div key={item.id} className="text-left">
                  <div className="flex justify-between items-end">
                    <h3 className={`${fontSizes.h3} font-semibold`} style={{ color: customization.primaryColor }}>{item.name}</h3>
                    <div className="flex-grow border-b-2 border-dotted mx-2" style={{ borderColor: customization.secondaryColor, opacity: 0.5 }}></div>
                    <p className={`${fontSizes.h3} font-semibold text-right pl-2`} style={{ color: customization.primaryColor }}>{item.price}</p>
                  </div>
                  <p className={`${fontSizes.pDesc} italic text-left mt-1`} style={{ color: customization.secondaryColor }}>{item.description}</p>
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
