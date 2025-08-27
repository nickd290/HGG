import React from 'react';
import type { Menu } from '../types';
import { TEMPLATES } from '../constants';
import { EditIcon, TrashIcon, PlusIcon } from './icons/Icons';

interface DashboardProps {
  menus: Menu[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

const MenuCard: React.FC<{ menu: Menu; onEdit: () => void; onDelete: () => void }> = ({ menu, onEdit, onDelete }) => {
    const templateName = TEMPLATES.find(t => t.key === menu.selectedTemplate)?.name || 'Unknown';
    
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 text-white flex flex-col transition-all duration-300 hover:bg-white/20 hover:border-white/30">
            <div className="flex-grow">
                <h3 className="text-2xl font-bold font-serif mb-2">{menu.title}</h3>
                <p className="text-sm text-white/80 mb-1"><span className="font-semibold">Restaurant:</span> {menu.restaurantInfo.name}</p>
                <p className="text-sm text-white/80"><span className="font-semibold">Template:</span> {templateName}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-white/20">
                <button
                    onClick={onDelete}
                    className="p-2 rounded-full hover:bg-red-500/50 text-white transition-colors"
                    title="Delete Menu"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={onEdit}
                    className="flex items-center px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <EditIcon className="w-5 h-5 mr-2" />
                    Edit
                </button>
            </div>
        </div>
    );
};

export const Dashboard: React.FC<DashboardProps> = ({ menus, onEdit, onDelete, onCreate }) => {
  return (
    <div 
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2940&auto=format&fit=crop')" }}
    >
      <div className="min-h-screen bg-gray-900/70 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12 text-white">
          <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-shadow-lg">Heritage Golf Management</h1>
            <h2 className="text-2xl md:text-3xl font-light mt-2 text-white/90">Club Menu Dashboard</h2>
          </header>

          <div className="flex justify-center mb-12">
            <button
                onClick={onCreate}
                className="flex items-center px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
                <PlusIcon className="w-6 h-6 mr-3" />
                Create New Menu
            </button>
          </div>
          
          <div className="border-t border-white/20 pt-8">
              <h3 className="text-3xl font-semibold text-center mb-8">Your Menus</h3>
              {menus.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {menus.map(menu => (
                        <MenuCard 
                            key={menu.id}
                            menu={menu}
                            onEdit={() => onEdit(menu.id)}
                            onDelete={() => onDelete(menu.id)}
                        />
                    ))}
                </div>
              ) : (
                <div className="text-center text-white/70 py-16">
                    <p>You don't have any menus yet.</p>
                    <p>Click "Create New Menu" to get started!</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};