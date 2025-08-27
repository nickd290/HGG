import React, { useState } from 'react';
import { suggestMenuItems } from '../services/geminiService';
import type { MenuItem } from '../types';
import { MagicWandIcon, PlusCircleIcon } from './icons/Icons';

interface AIContentAssistantProps {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

interface Suggestion {
    name: string;
    category: string;
    description: string;
    price: string;
}

export const AIContentAssistant: React.FC<AIContentAssistantProps> = ({ menuItems, setMenuItems }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSuggestItems = async () => {
        setIsLoading(true);
        setError(null);
        setSuggestions([]);
        try {
            const result = await suggestMenuItems(menuItems);
            if (result.error) {
                setError(result.error);
            } else {
                setSuggestions(result);
            }
        } catch (e) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const addSuggestionToMenu = (suggestion: Suggestion) => {
        setMenuItems(prev => [...prev, {
            ...suggestion,
            id: Date.now().toString(),
            page: 1, // Add new items to page 1 by default
        }]);
        setSuggestions(current => current.filter(s => s.name !== suggestion.name));
    };

    return (
        <div>
            <button
                onClick={handleSuggestItems}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
            >
                <MagicWandIcon className="w-5 h-5 mr-2" />
                {isLoading ? 'Thinking...' : 'Suggest New Items'}
            </button>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {suggestions.length > 0 && (
                <div className="mt-4 space-y-3">
                    <h3 className="font-semibold text-gray-700">AI Suggestions:</h3>
                    {suggestions.map((s, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-grow mr-4">
                                    <div className="flex justify-between items-baseline">
                                        <p className="font-bold text-gray-800">{s.name}</p>
                                        <p className="font-semibold text-gray-700">${s.price}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{s.category}</p>
                                    <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                                </div>
                                <button onClick={() => addSuggestionToMenu(s)} title="Add to menu" className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0">
                                    <PlusCircleIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};