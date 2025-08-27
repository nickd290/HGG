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
    case 'auto': default: return 'grid-cols-2';
  }
};

const getLayoutStyles = (size: 'normal' | 'small' | 'smaller') => {
  switch (size) {
    case 'small': return {
      padding: 'p-8',
      fontSizes: { h1: 'text-3xl', p: 'text-sm', h2: 'text-xl', h3: 'text-base', pDesc: 'text-xs leading-tight' }
    };
    case 'smaller': return {
      padding: 'p-6',
      fontSizes: { h1: 'text-2xl', p: 'text-xs', h2: 'text-lg', h3: 'text-sm', pDesc: 'text-[10px] leading-tight' }
    };
    case 'normal': default: return {
      padding: 'p-10',
      fontSizes: { h1: 'text-5xl', p: 'text-base', h2: 'text-2xl', h3: 'text-lg', pDesc: 'text-sm' }
    };
  }
};


export const ModernTemplate: React.FC<TemplateProps> = ({ restaurantInfo, groupedItems, customization, isSecondPage }) => {
  const bodyStyle = { fontFamily: customization.bodyFont, backgroundColor: customization.backgroundColor };
  const headingStyle = { fontFamily: customization.headingFont, color: customization.primaryColor };

  const columnClass = getColumnClass(customization.columns);
  const { padding, fontSizes } = getLayoutStyles(customization.fontSize);

  const regularCategories = Object.keys(groupedItems).filter(c => c !== 'Disclaimers');
  const disclaimers = groupedItems['Disclaimers'] || [];

  return (
    <div className={`${padding} font-sans h-full overflow-hidden`} style={bodyStyle}>
      {!isSecondPage && (
        <header className="text-center mb-10">
          <h1 className={`${fontSizes.h1} font-bold tracking-wider uppercase`} style={headingStyle}>{restaurantInfo.name}</h1>
          <p className={`${fontSizes.p} mt-2 tracking-widest`} style={{color: customization.secondaryColor}}>{restaurantInfo.tagline}</p>
        </header>
      )}
      {isSecondPage && (
        <header className="text-center mb-10">
            <h1 className="text-2xl font-bold tracking-wider uppercase" style={headingStyle}>{restaurantInfo.name}</h1>
        </header>
      )}

      <div className="space-y-10">
        {regularCategories.map((category) => (
          <div key={category}>
            <div className="flex items-center mb-6">
              <h2 className={`${fontSizes.h2} font-bold uppercase tracking-widest`} style={{ color: customization.primaryColor, fontFamily: customization.headingFont }}>{category}</h2>
              <div className="flex-grow h-px ml-4" style={{ backgroundColor: customization.secondaryColor, opacity: 0.5 }}></div>
            </div>
            <div className={`grid ${columnClass} gap-x-6 gap-y-5`}>
              {groupedItems[category].map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-semibold ${fontSizes.h3}`} style={{color: customization.primaryColor}}>{item.name}</h3>
                    <p className={`font-bold ${fontSizes.h3} pl-2 text-right`} style={{color: customization.primaryColor}}>{item.price}</p>
                  </div>
                  <p className={`${fontSizes.pDesc} mt-1`} style={{color: customization.secondaryColor}}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {disclaimers.length > 0 && (
          <div className="pt-4 mt-10 border-t" style={{borderColor: customization.secondaryColor}}>
             <h2 className={`${fontSizes.h2} font-bold uppercase tracking-widest text-center mb-4`} style={{ color: customization.primaryColor, fontFamily: customization.headingFont }}>Disclaimers</h2>
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
