

import { GoogleGenAI, Type } from "@google/genai";
import type { MenuItem, CustomizationSettings, TemplateKey, PrintSize } from '../types';
import { FONT_PAIRINGS, TEMPLATES, PRINT_OPTIONS } from "../constants";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateDescription = async (itemName: string): Promise<string> => {
  if (!process.env.API_KEY) return "API Key not configured.";
  try {
    const prompt = `Generate a short, enticing, and professional menu description for an item named "${itemName}". Keep it under 20 words. Do not use asterisks or formatting.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "Error generating description.";
  }
};

export const suggestMenuItems = async (existingItems: MenuItem[]): Promise<any> => {
    if (!process.env.API_KEY) return "API Key not configured.";
    try {
        const existingItemsWithPrices = existingItems.map(item => `${item.name} ($${item.price})`).join(', ');
        const prompt = `Based on the following menu items with their prices: ${existingItemsWithPrices}, suggest three new, complementary menu items. For each, provide a name, a category (like Appetizers, Main Courses, Desserts), a brief description, and a suggested price as a string (e.g., "12.50"). The price should be reasonable and in line with the existing menu items.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            category: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.STRING },
                        },
                        required: ["name", "category", "description", "price"],
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error suggesting menu items:", error);
        return { error: "Could not generate suggestions." };
    }
};

export const suggestDesignTheme = async (restaurantInfo: any, menuItems: MenuItem[]): Promise<any> => {
  if (!process.env.API_KEY) return { error: "API Key not configured." };

  const availableFontPairings = FONT_PAIRINGS.map(p => p.name).join('", "');
  const availableTemplates = TEMPLATES.map(t => t.key).join('", "');
  const itemExamples = menuItems.slice(0, 5).map(item => item.name).join(', ');

  const prompt = `
    You are an expert graphic designer specializing in restaurant menus.
    A user is creating a menu for a restaurant named "${restaurantInfo.name}" with the tagline "${restaurantInfo.tagline}".
    The menu includes items like: ${itemExamples}.
    
    Based on this information, suggest a complete design theme. The theme should evoke a specific mood (e.g., "upscale modern", "cozy rustic", "family friendly").
    
    Provide the following in a JSON object:
    1.  'primaryColor': A hex code for main headings.
    2.  'secondaryColor': A hex code for body text and accents that complements the primary color.
    3.  'backgroundColor': A hex code for the menu background. This should be subtle, often off-white or a very light pastel.
    4.  'fontPairingName': Choose the most appropriate font pairing from this list: ["${availableFontPairings}"].
    5.  'templateKey': Choose the best template from this list that fits the theme: ["${availableTemplates}"].
    6.  'reasoning': A brief, one-sentence explanation for your design choices.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryColor: { type: Type.STRING },
            secondaryColor: { type: Type.STRING },
            backgroundColor: { type: Type.STRING },
            fontPairingName: { type: Type.STRING },
            templateKey: { type: Type.STRING },
            reasoning: { type: Type.STRING },
          },
          required: ["primaryColor", "secondaryColor", "backgroundColor", "fontPairingName", "templateKey", "reasoning"],
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error("Error suggesting design theme:", error);
    return { error: "Could not generate design suggestions." };
  }
};

export const suggestAutoLayout = async (menuItems: MenuItem[], printSize: PrintSize, menuPages: 1 | 2): Promise<any> => {
  if (!process.env.API_KEY) return { error: "API Key not configured." };

  const totalItems = menuItems.length;
  const categoryItemCounts = menuItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const categoryCount = Object.keys(categoryItemCounts).length;
  const printSizeName = PRINT_OPTIONS.find(p => p.key === printSize)?.name || printSize;
  const allCategories = Object.keys(categoryItemCounts);


  const prompt = `
    You are an expert print layout designer. Your task is to automatically format a restaurant menu to ensure ALL content fits on the selected page layout.
    The absolute #1 priority is preventing text from being cut off. It is acceptable to use a very small font size or multiple columns to achieve this. The user will decide if the result is readable.

    **Menu Details:**
    - Categories: ${categoryCount} (${allCategories.join(', ')})
    - Total Items: ${totalItems}
    - Paper Size: "${printSizeName}"
    - **Required Page Layout:** ${menuPages} page(s)

    **Decision Logic & Priorities:**
    1.  **Strict Constraint:** You MUST format the content to fit onto exactly ${menuPages} page(s).
    2.  **Primary Goal: FIT EVERYTHING.** Your primary goal is to fit all items onto the page(s). You must use the full range of formatting tools to achieve this.
    3.  **Formatting Toolkit:** You have two tools:
        - Columns: You can choose 1, 2, or 3. More columns fit more text.
        - Font Size: You can choose 'normal', 'small', or 'smaller'. 'Smaller' is the most compact.
    4.  **Formatting Strategy:**
        - Start with the most readable settings ('normal' font, 1 or 2 columns).
        - If you estimate the content will overflow, be aggressive. Increase the column count to 3 first.
        - If it still overflows, keep the 3 columns and reduce the font size to 'small'.
        - If it *still* overflows, use the most compact setting: 3 columns and 'smaller' font size.
    5.  **Last Resort - Split Menu:** Only if you determine that the content is so extremely long that it is physically impossible to fit even with 3 columns and the 'smaller' font size, should you recommend splitting the menu into two separate documents. This should be rare.
        - If you must split, follow these rules: Identify secondary categories (Desserts, Drinks, Wines, Cocktails, Sides) and group them into a new, logically-named menu (e.g., "Dessert & Drinks Menu"). Do NOT move primary categories like 'Appetizers' or 'Main Courses'.

    **Return a JSON object with your final settings:**
    - 'columns': The optimal number of columns (number: 1, 2, or 3) to make everything fit.
    - 'fontSize': The best font size ('normal', 'small', 'smaller') to make everything fit.
    - 'pages': This must be ${menuPages}, as it is a fixed constraint from the user.
    - 'page2Categories': Array of category names to move to page 2 (only relevant if pages=2). If pages=1, this must be an empty array.
    - 'reasoning': Brief explanation for your choices, emphasizing how they help fit the content.
    - 'splitRecommendation': (OPTIONAL, RARELY USED) An object with 'newMenuTitle' and 'categoriesToMove' if a split is the ONLY option.
  `;

  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            columns: { type: Type.INTEGER },
            fontSize: { type: Type.STRING },
            pages: { type: Type.INTEGER },
            page2Categories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            reasoning: { type: Type.STRING },
            splitRecommendation: {
                type: Type.OBJECT,
                nullable: true,
                properties: {
                    newMenuTitle: { type: Type.STRING },
                    categoriesToMove: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            }
          },
          required: ["columns", "fontSize", "pages", "page2Categories", "reasoning"],
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error suggesting auto layout:", error);
    return { error: "Could not generate layout suggestions." };
  }
};