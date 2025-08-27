export interface RestaurantInfo {
  name: string;
  tagline: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  page: number;
}

export type TemplateKey = 'classic' | 'modern' | 'rustic' | 'minimalist' | 'gourmet';

export interface Template {
  key: TemplateKey;
  name: string;
}

export type PrintSize = '8.5x11' | '11x17' | '11x14' | '5.5x8.5';

export interface PrintOption {
  key: PrintSize;
  name: string;
}

export interface PrebuiltMenu {
  id: string;
  name: string;
  description: string;
  restaurantInfo: RestaurantInfo;
  menuItems: MenuItem[];
}

export interface FontPairing {
    name: string;
    headingFont: string;
    bodyFont: string;
}

export interface CustomizationSettings {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    headingFont: string;
    bodyFont: string;
    columns: 'auto' | 1 | 2 | 3;
    fontSize: 'normal' | 'small' | 'smaller';
}

export interface AutoLayoutSuggestion {
    columns: 1 | 2 | 3;
    fontSize: 'normal' | 'small' | 'smaller';
    pages: 1 | 2;
    page2Categories: string[];
    reasoning: string;
    splitRecommendation?: {
        newMenuTitle: string;
        categoriesToMove: string[];
    }
}

export interface Menu {
    id: string;
    title: string;
    restaurantInfo: RestaurantInfo;
    menuItems: MenuItem[];
    selectedTemplate: TemplateKey;
    printSize: PrintSize;
    customizationSettings: CustomizationSettings;
    menuPages: 1 | 2;
}