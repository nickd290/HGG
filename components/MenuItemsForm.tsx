import React, { useState, useMemo } from 'react';
import type { MenuItem } from '../types';
import { generateDescription } from '../services/geminiService';
import { TrashIcon, MagicWandIcon, ChevronDownIcon, PageIcon } from './icons/Icons';

interface MenuItemEditorProps {
  item: MenuItem;
  onUpdate: (id: string, updatedItem: Partial<MenuItem>) => void;
  onDelete: (id: string) => void;
}

const MenuItemEditor: React.FC<MenuItemEditorProps> = ({ item, onUpdate, onDelete }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDescriptionGeneration = async () => {
    setIsGenerating(true);
    const newDescription = await generateDescription(item.name);
    onUpdate(item.id, { description: newDescription });
    setIsGenerating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate(item.id, { [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="flex-grow px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <input
          type="text"
          name="price"
          value={item.price}
          onChange={handleChange}
          placeholder="$ Price / format"
          className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <button onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors">
            <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="relative">
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Description"
          rows={2}
          className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <button
          onClick={handleDescriptionGeneration}
          disabled={isGenerating || !item.name}
          title="Generate with AI"
          className="absolute bottom-2 right-2 p-1 text-purple-600 rounded-md hover:bg-purple-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? <div className="w-4 h-4 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div> : <MagicWandIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};


interface MenuItemsFormProps {
  items: MenuItem[];
  onAdd: (category: string) => void;
  onUpdate: (id: string, updatedItem: Partial<MenuItem>) => void;
  onDelete: (id: string) => void;
  onUpdateCategoryPage: (category: string, newPage: 1 | 2) => void;
  menuPages: 1 | 2;
}

export const MenuItemsForm: React.FC<MenuItemsFormProps> = ({ items, onAdd, onUpdate, onDelete, onUpdateCategoryPage, menuPages }) => {
  const [newCategory, setNewCategory] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, MenuItem[]>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [items]);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && !groupedItems[newCategory]) {
      onAdd(newCategory);
      setNewCategory('');
      setOpenCategories(prev => ({...prev, [newCategory]: true}));
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({...prev, [category]: !prev[category]}));
  };

  const categories = Object.keys(groupedItems);

  return (
    <div>
      <div className="space-y-6">
        {categories.length > 0 ? categories.map(category => {
          const page = groupedItems[category][0]?.page || 1;
          const targetPage = page === 1 ? 2 : 1;
          
          return (
            <div key={category}>
              <div 
                className="flex justify-between items-center bg-gray-100 p-2 rounded-t-lg border-b border-gray-300"
              >
                <div className="flex items-center flex-grow cursor-pointer" onClick={() => toggleCategory(category)}>
                    <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
                    <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-300 ${openCategories[category] ? 'rotate-180' : ''}`} />
                </div>
                {menuPages === 2 && (
                    <button 
                        onClick={() => onUpdateCategoryPage(category, targetPage)}
                        title={`Move to Page ${targetPage}`}
                        className="flex items-center text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-full px-2 py-1 hover:bg-gray-50 transition-colors"
                    >
                       <PageIcon className="w-4 h-4 mr-1" />
                       P. {page}
                    </button>
                )}
              </div>
              <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${openCategories[category] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                      <div className="space-y-4 p-4 border border-t-0 border-gray-200 rounded-b-lg">
                          {groupedItems[category].map(item => (
                          <MenuItemEditor key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
                          ))}
                          <button onClick={() => onAdd(category)} className="w-full text-sm text-blue-600 font-semibold hover:text-blue-800 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                          + Add Item to {category}
                          </button>
                      </div>
                  </div>
              </div>
            </div>
        )}) : <p className="text-gray-500">No menu items yet. Add a category below to get started.</p>}
      </div>

      <form onSubmit={handleAddCategory} className="mt-8 pt-6 border-t border-gray-200">
        <label htmlFor="new-category" className="block text-sm font-medium text-gray-700 mb-1">
          Add New Category
        </label>
        <div className="flex space-x-2">
          <input
            id="new-category"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g., Appetizers"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};