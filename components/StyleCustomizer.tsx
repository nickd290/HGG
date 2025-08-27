import React from 'react';
import type { CustomizationSettings } from '../types';
import { FONT_PAIRINGS } from '../constants';

interface StyleCustomizerProps {
  settings: CustomizationSettings;
  setSettings: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
}

const ColorInput: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1 pr-2">
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 p-0 border-none rounded cursor-pointer"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm outline-none bg-transparent"
            />
        </div>
    </div>
);

const FontPairingSelector: React.FC<{
  settings: CustomizationSettings;
  onPairingChange: (headingFont: string, bodyFont: string) => void;
}> = ({ settings, onPairingChange }) => {
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPairing = FONT_PAIRINGS.find(p => p.name === e.target.value);
    if (selectedPairing) {
      onPairingChange(selectedPairing.headingFont, selectedPairing.bodyFont);
    }
  };

  const currentPairing = FONT_PAIRINGS.find(p => 
    p.headingFont === settings.headingFont && p.bodyFont === settings.bodyFont
  ) || FONT_PAIRINGS[0];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Font Pairing</label>
      <select
        value={currentPairing.name}
        onChange={handleSelectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {FONT_PAIRINGS.map(pairing => (
          <option key={pairing.name} value={pairing.name}>
            {pairing.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({ settings, setSettings }) => {

  const handleSettingChange = (key: keyof CustomizationSettings, value: string) => {
    setSettings(prev => ({...prev, [key]: value}));
  };
  
  const handleFontPairingChange = (headingFont: string, bodyFont: string) => {
      setSettings(prev => ({ ...prev, headingFont, bodyFont }));
  };

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <ColorInput
                label="Primary Color"
                value={settings.primaryColor}
                onChange={(value) => handleSettingChange('primaryColor', value)}
            />
            <ColorInput
                label="Secondary Color"
                value={settings.secondaryColor}
                onChange={(value) => handleSettingChange('secondaryColor', value)}
            />
        </div>
        <div>
            <ColorInput
                label="Background Color"
                value={settings.backgroundColor}
                onChange={(value) => handleSettingChange('backgroundColor', value)}
            />
        </div>
        <div className="grid grid-cols-1 gap-4">
             <FontPairingSelector settings={settings} onPairingChange={handleFontPairingChange} />
        </div>
    </div>
  );
};
