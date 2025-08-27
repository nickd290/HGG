import type { RestaurantInfo, MenuItem, Template, PrintOption, FontPairing, CustomizationSettings } from './types';

export const sampleData: { restaurantInfo: RestaurantInfo; menuItems: MenuItem[] } = {
  restaurantInfo: {
    name: "The Golden Spoon",
    tagline: "Where every bite is a treasure",
  },
  menuItems: [
    { id: '1', category: 'Appetizers', name: 'Bruschetta', description: 'Toasted baguette with fresh tomatoes, garlic, basil, and olive oil.', price: '8.50', page: 1 },
    { id: '2', category: 'Appetizers', name: 'Stuffed Mushrooms', description: 'Mushroom caps filled with seasoned breadcrumbs, herbs, and cheese.', price: '9.00', page: 1 },
    { id: '3', category: 'Main Courses', name: 'Grilled Salmon', description: 'Salmon fillet seasoned and grilled to perfection, served with asparagus.', price: '22.00', page: 1 },
    { id: '4', category: 'Main Courses', name: 'Chicken Parmesan', description: 'Breaded chicken breast topped with marinara sauce and mozzarella.', price: '18.00', page: 1 },
    { id: '5', category: 'Main Courses', name: 'Filet Mignon', description: '8oz center-cut filet, cooked to your liking, with a red wine reduction.', price: '35.00', page: 1 },
    { id: '6', category: 'Desserts', name: 'Tiramisu', description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.', price: '7.50', page: 1 },
    { id: '7', category: 'Desserts', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', price: '8.00', page: 1 },
  ],
};

export const TEMPLATES: Template[] = [
    { key: 'modern', name: 'Modern Chic' },
    { key: 'classic', name: 'Classic Elegance' },
    { key: 'rustic', name: 'Rustic Charm' },
    { key: 'minimalist', name: 'Minimalist' },
    { key: 'gourmet', name: 'Gourmet' },
];

export const PRINT_OPTIONS: PrintOption[] = [
    { key: '8.5x11', name: 'Letter (8.5" x 11")' },
    { key: '11x17', name: 'Tabloid (11" x 17")' },
    { key: '11x14', name: 'Legal (11" x 14")' },
    { key: '5.5x8.5', name: 'Half Letter (5.5" x 8.5")' },
];

export const FONT_PAIRINGS: FontPairing[] = [
    { name: 'Elegant Serif / Modern Sans', headingFont: "'Playfair Display', serif", bodyFont: "'Roboto', sans-serif" },
    { name: 'Clean & Modern', headingFont: "'Montserrat', sans-serif", bodyFont: "'Lato', sans-serif" },
    { name: 'Whimsical Script / Simple Sans', headingFont: "'Dancing Script', cursive", bodyFont: "'Lato', sans-serif" },
    { name: 'Classic Sans-Serif Duo', headingFont: "'Lato', sans-serif", bodyFont: "'Roboto', sans-serif" },
    { name: 'Bold & Refined', headingFont: "'Playfair Display', serif", bodyFont: "'Montserrat', sans-serif" },
];

export const DEFAULT_CUSTOMIZATION_SETTINGS: CustomizationSettings = {
    primaryColor: '#111827', // Default: text-gray-900
    secondaryColor: '#6B7280', // Default: text-gray-500
    backgroundColor: '#FFFFFF',
    headingFont: FONT_PAIRINGS[0].headingFont,
    bodyFont: FONT_PAIRINGS[0].bodyFont,
    columns: 'auto',
    fontSize: 'normal',
};