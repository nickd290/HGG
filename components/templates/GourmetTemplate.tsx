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
    case 'auto': default: return 'grid-cols-1'; // Gourmet is single-column by default
  }
};

const getLayoutStyles = (size: 'normal' | 'small' | 'smaller') => {
  switch (size) {
    case 'small': return {
      padding: 'p-8',
      innerPadding: 'p-6',
      fontSizes: { h1: 'text-4xl', p: 'text-base', h2: 'text-2xl', h3: 'text-base', pDesc: 'text-xs leading-tight' }
    };
    case 'smaller': return {
      padding: 'p-6',
      innerPadding: 'p-4',
      fontSizes: { h1: 'text-3xl', p: 'text-sm', h2: 'text-xl', h3: 'text-sm', pDesc: 'text-[10px] leading-tight' }
    };
    case 'normal': default: return {
      padding: 'p-10',
      innerPadding: 'p-8',
      fontSizes: { h1: 'text-5xl', p: 'text-lg', h2: 'text-3xl', h3: 'text-xl', pDesc: 'text-sm' }
    };
  }
};


export const GourmetTemplate: React.FC<TemplateProps> = ({ restaurantInfo, groupedItems, customization, isSecondPage }) => {
  const bodyStyle = { fontFamily: customization.bodyFont, backgroundColor: customization.backgroundColor === '#FFFFFF' ? '#F8F7F5' : customization.backgroundColor };
  const headingStyle = { fontFamily: customization.headingFont, color: customization.primaryColor };
  const secondaryStyle = { color: customization.secondaryColor };
  
  const columnClass = getColumnClass(customization.columns);
  const { padding, innerPadding, fontSizes } = getLayoutStyles(customization.fontSize);
  
  const regularCategories = Object.keys(groupedItems).filter(c => c !== 'Disclaimers');
  const disclaimers = groupedItems['Disclaimers'] || [];

  return (
    <div className={`${padding} h-full overflow-hidden`} style={bodyStyle}>
      <div className={`border-2 ${innerPadding} h-full`} style={{ borderColor: customization.primaryColor }}>
        {!isSecondPage && (
            <header className="text-center mb-10">
                <h1 className={`${fontSizes.h1} font-bold`} style={{...headingStyle, fontFamily: "'Dancing Script', cursive"}}>{restaurantInfo.name}</h1>
                <p className={`${fontSizes.p} mt-2 tracking-wider`} style={secondaryStyle}>{restaurantInfo.tagline}</p>
            </header>
        )}
        {isSecondPage && (
             <header className="text-center mb-10">
                <h1 className="text-3xl font-bold" style={{...headingStyle, fontFamily: "'Dancing Script', cursive"}}>{restaurantInfo.name}</h1>
            </header>
        )}

        <div className="space-y-10">
          {regularCategories.map((category) => (
            <div key={category}>
              <div className="text-center mb-6">
                 <h2 className={`inline-block ${fontSizes.h2} font-semibold tracking-widest border-b-2 pb-2`} style={{ ...headingStyle, borderColor: customization.secondaryColor }}>{category}</h2>
              </div>
              <div className={`grid ${columnClass} gap-x-8 gap-y-6`}>
                {groupedItems[category].map(item => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className={`font-semibold ${fontSizes.h3}`} style={{color: customization.primaryColor}}>{item.name}</h3>
                      <p className={`font-bold ${fontSizes.h3} text-right pl-2`} style={{color: customization.primaryColor}}>{item.price}</p>
                    </div>
                    {item.description && (
                       <p className={`${fontSizes.pDesc} italic mt-1`} style={secondaryStyle}>{item.description}</p>
                    )}
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
    </div>
  );
};
