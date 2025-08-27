import React, { useState } from 'react';
import { suggestDesignTheme } from '../services/geminiService';
import type { MenuItem, CustomizationSettings, TemplateKey } from '../types';
import { MagicWandIcon } from './icons/Icons';
import { FONT_PAIRINGS } from '../constants';

interface AIDesignAssistantProps {
    restaurantInfo: { name: string; tagline: string; };
    menuItems: MenuItem[];
    setCustomizationSettings: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
    setSelectedTemplate: (template: TemplateKey) => void;
}

interface Suggestion {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontPairingName: string;
    templateKey: TemplateKey;
    reasoning: string;
}

export const AIDesignAssistant: React.FC<AIDesignAssistantProps> = ({ restaurantInfo, menuItems, setCustomizationSettings, setSelectedTemplate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSuggestTheme = async () => {
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await suggestDesignTheme(restaurantInfo, menuItems);
            if (result.error) {
                setError(result.error);
            } else {
                setSuggestion(result);
            }
        } catch (e) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const applySuggestion = () => {
        if (!suggestion) return;
        
        const fontPairing = FONT_PAIRINGS.find(p => p.name === suggestion.fontPairingName) || FONT_PAIRINGS[0];

        setCustomizationSettings(prev => ({
            ...prev,
            primaryColor: suggestion.primaryColor,
            secondaryColor: suggestion.secondaryColor,
            backgroundColor: suggestion.backgroundColor,
            headingFont: fontPairing.headingFont,
            bodyFont: fontPairing.bodyFont,
        }));
        setSelectedTemplate(suggestion.templateKey);
        setSuggestion(null);
    };

    return (
        <div>
            <button
                onClick={handleSuggestTheme}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
                <MagicWandIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Designing...' : 'Suggest a Design Theme'}
            </button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {suggestion && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-800">AI Design Suggestion:</h3>
                        <p className="text-sm text-gray-600 italic mt-1">"{suggestion.reasoning}"</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700">Colors:</span>
                        <div className="flex space-x-2">
                           <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: suggestion.primaryColor }} title={`Primary: ${suggestion.primaryColor}`}></div>
                           <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: suggestion.secondaryColor }} title={`Secondary: ${suggestion.secondaryColor}`}></div>
                           <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: suggestion.backgroundColor }} title={`Background: ${suggestion.backgroundColor}`}></div>
                        </div>
                    </div>
                     <p className="text-sm"><span className="font-medium text-gray-700">Font Pairing:</span> {suggestion.fontPairingName}</p>
                     <p className="text-sm"><span className="font-medium text-gray-700">Template:</span> {suggestion.templateKey}</p>
                    <button
                        onClick={applySuggestion}
                        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm"
                    >
                        Apply This Design
                    </button>
                </div>
            )}
        </div>
    );
};