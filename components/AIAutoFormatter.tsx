import React, { useState } from 'react';
import { suggestAutoLayout } from '../services/geminiService';
import type { MenuItem, CustomizationSettings, PrintSize, AutoLayoutSuggestion } from '../types';
import { SparklesIcon } from './icons/Icons';

interface AIAutoFormatterProps {
    menuItems: MenuItem[];
    printSize: PrintSize;
    menuPages: 1 | 2;
    setCustomizationSettings: React.Dispatch<React.SetStateAction<CustomizationSettings>>;
    setMenuPages: React.Dispatch<React.SetStateAction<1 | 2>>;
    applyPageSplit: (page2Categories: string[]) => void;
    splitActiveMenu: (categoriesToMove: string[], newMenuTitle: string) => void;
}

export const AIAutoFormatter: React.FC<AIAutoFormatterProps> = ({ menuItems, printSize, menuPages, setCustomizationSettings, setMenuPages, applyPageSplit, splitActiveMenu }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<AutoLayoutSuggestion | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSuggestLayout = async () => {
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await suggestAutoLayout(menuItems, printSize, menuPages);
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
        
        if (suggestion.splitRecommendation) {
            splitActiveMenu(suggestion.splitRecommendation.categoriesToMove, suggestion.splitRecommendation.newMenuTitle);
        }

        setCustomizationSettings(prev => ({
            ...prev,
            columns: suggestion.columns,
            fontSize: suggestion.fontSize,
        }));
        
        setMenuPages(suggestion.pages);
        if(!suggestion.splitRecommendation){
            applyPageSplit(suggestion.page2Categories);
        }

        setSuggestion(null);
    };

    return (
        <div>
            <button
                onClick={handleSuggestLayout}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
                <SparklesIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Formatting...' : 'AI Auto-Format Layout'}
            </button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {suggestion && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-800">AI Layout Suggestion:</h3>
                        <p className="text-sm text-gray-600 italic mt-1">"{suggestion.reasoning}"</p>
                    </div>
                    
                     {suggestion.splitRecommendation ? (
                        <div className="p-3 bg-indigo-100 border border-indigo-200 rounded-md">
                            <p className="font-bold text-indigo-800">Menu Split Recommended!</p>
                            <p className="text-sm text-indigo-700 mt-1">
                                This menu is too long. The AI suggests creating a new <strong>"{suggestion.splitRecommendation.newMenuTitle}"</strong> with the following categories: {suggestion.splitRecommendation.categoriesToMove.join(', ')}.
                            </p>
                        </div>
                     ) : (
                        <ul className="text-sm space-y-1">
                            <li><span className="font-medium text-gray-700">Pages:</span> {suggestion.pages}</li>
                            {suggestion.pages === 2 && suggestion.page2Categories.length > 0 && (
                                <li><span className="font-medium text-gray-700">Page 2 Categories:</span> {suggestion.page2Categories.join(', ')}</li>
                            )}
                        </ul>
                     )}
                    
                    <ul className="text-sm space-y-1">
                        <li><span className="font-medium text-gray-700">Columns:</span> {suggestion.columns}</li>
                        <li><span className="font-medium text-gray-700">Font Size:</span> {suggestion.fontSize}</li>
                    </ul>

                    <button
                        onClick={applySuggestion}
                        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm"
                    >
                        {suggestion.splitRecommendation ? 'Apply & Split Menu' : 'Apply This Layout'}
                    </button>
                </div>
            )}
        </div>
    );
};