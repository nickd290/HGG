import type { PrebuiltMenu } from './types';

const grandCafeBarList: PrebuiltMenu = {
  id: 'grand-cafe-bar',
  name: "Grand Café Bar List",
  description: "An extensive list of cocktails, beers, and fine wines from the Grand Café.",
  restaurantInfo: {
    name: "Grand Café",
    tagline: "Wine & Cocktail List",
  },
  menuItems: [
    // Cocktails
    { id: 'gc_c1', category: 'Cocktails', name: 'Strawberry Margarita', description: 'Patrón, triple sec, lime juice, fresh strawberries', price: '$14.00', page: 1 },
    { id: 'gc_c2', category: 'Cocktails', name: 'French Martini', description: 'Grey Goose Vodka, Chambord, pineapple juice', price: '$15.00', page: 1 },
    { id: 'gc_c3', category: 'Cocktails', name: 'Caribbean Martini', description: 'Absolut Vodka, Malibu Rum, passionfruit, pineapple juice', price: '$14.00', page: 1 },
    { id: 'gc_c4', category: 'Cocktails', name: 'Chocolate Martini', description: 'Tito’s Vodka, crème de cacao, Irish cream', price: '$14.00', page: 1 },
    { id: 'gc_c5', category: 'Cocktails', name: 'Lemon Drop Martini', description: 'Tito’s Vodka, triple sec, sour mix', price: '$15.00', page: 1 },
    { id: 'gc_c6', category: 'Cocktails', name: 'Kahlua Martini', description: 'Absolut Vodka, Kahlúa, Baileys', price: '$13.00', page: 1 },
    { id: 'gc_c7', category: 'Cocktails', name: 'Espresso Martini', description: 'Tito’s Vodka, chocolate liqueur, espresso', price: '$14.00', page: 1 },
    // Draft Beers
    { id: 'gc_db1', category: 'Draft Beers', name: 'Yuengling', description: 'America’s Oldest Brewery, Pottsville, PA', price: '$7.50', page: 1 },
    { id: 'gc_db2', category: 'Draft Beers', name: 'Screaming Reels IPA', description: 'Saltwater Brewery, Delray Beach, FL', price: '$7.50', page: 1 },
    { id: 'gc_db3', category: 'Draft Beers', name: 'Hop Gun IPA 7.0%', description: 'Funky Buddha Brewery, Oakland Park, FL', price: '$7.50', page: 1 },
    { id: 'gc_db4', category: 'Draft Beers', name: 'The Wizard Wit 5.5%', description: 'Barrel of Monks Brewing, Boca Raton, FL', price: '$7.50', page: 1 },
    // Bottled Beers
    { id: 'gc_bb1', category: 'Bottled Beers', name: 'Amstel Light', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb2', category: 'Bottled Beers', name: 'Bud Light', description: '', price: '$6.50', page: 1 },
    { id: 'gc_bb3', category: 'Bottled Beers', name: 'Corona', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb4', category: 'Bottled Beers', name: 'Goose IPA', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb5', category: 'Bottled Beers', name: 'Guinness', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb6', category: 'Bottled Beers', name: 'Heineken', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb7', category: 'Bottled Beers', name: 'Miller Lite', description: '', price: '$6.50', page: 1 },
    { id: 'gc_bb8', category: 'Bottled Beers', name: 'Michelob Ultra', description: '', price: '$6.50', page: 1 },
    { id: 'gc_bb9', category: 'Bottled Beers', name: 'Stella Artois', description: '', price: '$7.50', page: 1 },
    { id: 'gc_bb10', category: 'Bottled Beers', name: 'St Pauli N.A.', description: '', price: '$6.50', page: 1 },
    { id: 'gc_bb11', category: 'Bottled Beers', name: 'Yuengling (Bottle)', description: '', price: '$6.50', page: 1 },
    // Sparkling
    { id: 'gc_s1', category: 'Sparkling', name: 'Moët & Chandon Impérial 750 ml', description: 'France', price: '$90', page: 2 },
    { id: 'gc_s2', category: 'Sparkling', name: 'Prosecco Zonin 750 ml', description: 'Italy', price: '$11 / $35', page: 2 },
    { id: 'gc_s3', category: 'Sparkling', name: 'William Wycliff Brut', description: 'California', price: '$9.50 / $28', page: 2 },
    // Whites
    { id: 'gc_w1', category: 'Whites', name: 'Oyster Bay, Sauvignon Blanc', description: 'New Zealand', price: '$12 / $34', page: 2 },
    { id: 'gc_w2', category: 'Whites', name: 'Kim Crawford, Sauvignon Blanc', description: 'New Zealand', price: '$12 / $37', page: 2 },
    { id: 'gc_w3', category: 'Whites', name: 'Whitehaven Marlborough, Sauvignon Blanc', description: 'New Zealand', price: '$12 / $38', page: 2 },
    { id: 'gc_w4', category: 'Whites', name: 'William Hill Central Coast, Chardonnay', description: 'California', price: '$12 / $37', page: 2 },
    { id: 'gc_w5', category: 'Whites', name: 'Kendall-Jackson Vintner’s Reserve, Chardonnay', description: 'California', price: '$13 / $43', page: 2 },
    { id: 'gc_w6', category: 'Whites', name: 'Meiomi, Chardonnay', description: 'California', price: '$13 / $38', page: 2 },
    { id: 'gc_w7', category: 'Whites', name: 'Santa Margherita, Pinot Grigio', description: 'Italy', price: '$14 / $49', page: 2 },
    { id: 'gc_w8', category: 'Whites', name: 'Thomas Schmitt, QbA, Riesling', description: 'Germany', price: '$11 / $32', page: 2 },
    { id: 'gc_w9', category: 'Whites', name: 'M de Minuty, Rosé', description: 'Provence, France', price: '$12 / $39', page: 2 },
    // Reds
    { id: 'gc_r1', category: 'Reds', name: 'Daou Estate, Cabernet Sauvignon', description: 'California', price: '$15 / $49', page: 2 },
    { id: 'gc_r2', category: 'Reds', name: 'Louis Martini, Cabernet Sauvignon', description: 'California', price: '$11 / $34', page: 2 },
    { id: 'gc_r3', category: 'Reds', name: 'Dreaming Tree, Cabernet Sauvignon', description: 'California', price: '$12 / $39', page: 2 },
    { id: 'gc_r4', category: 'Reds', name: 'Hess Select, Cabernet Sauvignon', description: 'California', price: '$12 / $49', page: 2 },
    { id: 'gc_r5', category: 'Reds', name: 'Meiomi, Pinot Noir', description: 'California', price: '$13 / $38', page: 2 },
    { id: 'gc_r6', category: 'Reds', name: 'Alamos, Malbec', description: 'Argentina', price: '$11 / $30', page: 2 },
    { id: 'gc_r7', category: 'Reds', name: 'Penfolds, Shiraz “Koonunga Hills”', description: 'Australia', price: '$10 / $29', page: 2 },
    // International & Specialty
    { id: 'gc_is1', category: 'International & Specialty', name: 'Masi, Bonacosta Valpolicella', description: 'Italy', price: '$10.50 / $30', page: 2 },
    { id: 'gc_is2', category: 'International & Specialty', name: 'Masi, Campo Fiorin', description: 'Italy', price: '$12 / $34', page: 2 },
    { id: 'gc_is3', category: 'International & Specialty', name: 'Masi, Costasera Amarone Classico', description: 'Italy', price: '$60', page: 2 },
    { id: 'gc_is4', category: 'International & Specialty', name: 'Banfi, Chianti Classico', description: 'Italy', price: '$40', page: 2 },
    { id: 'gc_is5', category: 'International & Specialty', name: 'Marqués de Riscal', description: 'Spain', price: '$50', page: 2 },
    { id: 'gc_is6', category: 'International & Specialty', name: 'Moillard Bourgogne, Pinot Noir', description: 'France', price: '$50', page: 2 },
    { id: 'gc_is7', category: 'International & Specialty', name: 'Silver Oak, Cabernet Sauvignon', description: 'California', price: '$140', page: 2 },
  ],
};

const tavern28Menu: PrebuiltMenu = {
  id: 'tavern-28',
  name: "Tavern 28 Main Menu",
  description: "A classic tavern menu with shareables, pizzas, handhelds, and entrees.",
  restaurantInfo: {
    name: "Tavern 28",
    tagline: "Main Menu",
  },
  menuItems: [
    // Shareables
    { id: 't28_sh1', category: 'Shareables', name: 'Pretzel Bites', description: 'with Cheddar Cheese Dip', price: '$12.00', page: 1 },
    { id: 't28_sh2', category: 'Shareables', name: 'Legends Pub Wings', description: 'Buffalo, Spicy Barbecue, or Lemon Pepper', price: '$18.00', page: 1 },
    { id: 't28_sh3', category: 'Shareables', name: 'Toasted Ravioli', description: 'with Parmesan Cheese, Marinara', price: '$10.00', page: 1 },
    { id: 't28_sh4', category: 'Shareables', name: 'Deviled Eggs of the Week', description: 'Ask your server', price: '$10.00', page: 1 },
    { id: 't28_sh5', category: 'Shareables', name: 'Pub Chips & Dip', description: 'with French Onion Dip', price: '$10.00', page: 1 },
    { id: 't28_sh6', category: 'Shareables', name: 'Baked Goat Cheese', description: 'Marinara, Basil, Grilled Sourdough', price: '$10.00', page: 1 },
    
    // Pizza
    { id: 't28_p1', category: 'Pizza', name: 'Margherita', description: 'Tomato, Basil, Mozzarella, Marinara. Cauliflower crust available for +$2.', price: '12" $14 / 16" $22', page: 1 },
    { id: 't28_p2', category: 'Pizza', name: 'Hawaiian', description: 'Ham, Bacon, Pineapple, Mozzarella, Marinara. Cauliflower crust available for +$2.', price: '12" $14 / 16" $22', page: 1 },
    { id: 't28_p3', category: 'Pizza', name: 'Salsiccia', description: 'Sausage, Fennel, Onion, Green Olive, Calabrian Peppers, Mozzarella, Marinara. Cauliflower crust available for +$2.', price: '12" $14 / 16" $22', page: 1 },
    { id: 't28_p4', category: 'Pizza', name: 'Supremo', description: 'Pepperoni, Mushroom, Kalamata Olives, Pepperoncini, Red Onion, Basil, Mozzarella, Marinara. Cauliflower crust available for +$2.', price: '12" $14 / 16" $22', page: 1 },
    { id: 't28_p5', category: 'Pizza', name: 'Build Your Own', description: 'Two toppings included; additional +$2 each. Toppings: Pepperoni, Ham, Sausage, Mushroom, Olives, Onion & more. Cauliflower crust available for +$2.', price: '12" $14 / 16" $22', page: 1 },

    // Handhelds
    { id: 't28_h1', category: 'Handhelds', name: 'Chicken Tenders & Fries', description: 'Buttermilk fried jumbo tenders. Served with choice of one side.', price: '$15.00', page: 1 },
    { id: 't28_h2', category: 'Handhelds', name: 'French Dip', description: 'Angus beef, caramelized onions, provolone, horseradish cream, au jus. Served with choice of one side.', price: '$18.00', page: 1 },
    { id: 't28_h3', category: 'Handhelds', name: 'Shrimp Po Boy', description: 'Fried shrimp, remoulade, lettuce, tomato, pickle. Served with choice of one side.', price: '$18.00', page: 1 },
    { id: 't28_h4', category: 'Handhelds', name: 'Legendary Smashburger', description: 'Double patty, Russian sauce, American, LTP, brioche. Served with choice of one side.', price: '$15.00', page: 1 },
    { id: 't28_h5', category: 'Handhelds', name: 'Grilled Chicken Club', description: 'Bacon, lemon aioli, lettuce, tomato, provolone, brioche. Served with choice of one side.', price: '$18.00', page: 1 },
    { id: 't28_h6', category: 'Handhelds', name: 'Nashville Hot Chicken', description: 'Nashville hot sauce, sriracha mayo, pickles, brioche. Served with choice of one side.', price: '$17.00', page: 1 },
    { id: 't28_h7', category: 'Handhelds', name: 'Turkey BLT', description: 'Turkey, bacon, lettuce, tomato, sriracha mayo, toasted sourdough. Served with choice of one side.', price: '$14.00', page: 1 },
    { id: 't28_h8', category: 'Handhelds', name: 'Quesadilla', description: 'Pepper jack & cheddar, pico; add chicken +$7, shrimp +$10. Served with choice of one side.', price: '$10.00', page: 1 },
    { id: 't28_h9', category: 'Handhelds', name: 'Buffalo Chicken Wrap', description: 'Crispy chicken, buffalo, ranch, cheddar, tomato, red onion. Served with choice of one side.', price: '$15.00', page: 1 },
    
    // Greens
    { id: 't28_g1', category: 'Greens', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, Caesar (Side Caesar $6). Add: Chicken +$7, Shrimp +$10, Salmon +$10.', price: '$12.00', page: 2 },
    { id: 't28_g2', category: 'Greens', name: 'Legendary Cobb', description: 'Romaine, grilled chicken, bacon, egg, avocado, cherry tomatoes, bleu cheese. Add: Shrimp +$10, Salmon +$10.', price: '$16.00', page: 2 },
    { id: 't28_g3', category: 'Greens', name: 'Citrus Salad', description: 'Bibb, arugula, radicchio, spiced pepitas, strawberries, citrus vinaigrette. Add: Chicken +$7, Shrimp +$10, Salmon +$10.', price: '$14.00', page: 2 },
    { id: 't28_g4', category: 'Greens', name: 'House Salad', description: 'Romaine, feta, tomato, cucumber, carrot, honey-thyme vinaigrette (Side House $6). Add: Chicken +$7, Shrimp +$10, Salmon +$10.', price: '$12.00', page: 2 },
    
    // Entrees
    { id: 't28_e1', category: 'Entrees', name: 'Chicken Parmesan', description: 'Crispy breast, provolone, marinara, basil; grilled asparagus; roasted garlic mash.', price: '$28.00', page: 2 },
    { id: 't28_e2', category: 'Entrees', name: 'Steak Frites', description: 'Grilled New York strip, bordelaise butter, truffle fries.', price: '$46.00', page: 2 },
    { id: 't28_e3', category: 'Entrees', name: 'Parmesan Gnocchi', description: 'Creamy roasted-garlic pea sauce, peas, pancetta, Reggianito, farm egg.', price: '$26.00', page: 2 },
    { id: 't28_e4', category: 'Entrees', name: 'Chicken Picatta', description: 'White wine lemon-butter, mushrooms, capers; roasted garlic mash, broccoli.', price: '$28.00', page: 2 },
    { id: 't28_e5', category: 'Entrees', name: 'Steak Diane', description: 'Prime Angus tri tip, roasted red potatoes, broccoli, sauce Diane.', price: '$32.00', page: 2 },
    { id: 't28_e6', category: 'Entrees', name: 'Halibut', description: 'Pan-roasted halibut, zucchini, tomato confit, saffron broth, basil oil, fennel salad.', price: '$38.00', page: 2 },
    { id: 't28_e7', category: 'Entrees', name: 'Fettucini', description: 'Chicken, roasted tomato, basil, garlic white-wine parmesan sauce.', price: '$28.00', page: 2 },
    { id: 't28_e8', category: 'Entrees', name: 'Grilled Salmon', description: 'Roasted potatoes, caramelized onion, asparagus, tomato, preserved lemon vinaigrette.', price: '$29.00', page: 2 },
    
    // Dessert
    { id: 't28_d1', category: 'Dessert', name: 'Apple Crisp', description: 'with vanilla gelato', price: '$9.00', page: 2 },
    { id: 't28_d2', category: 'Dessert', name: 'Chocolate Decadence', description: 'raspberry compote, chocolate sauce', price: '$12.00', page: 2 },
    { id: 't28_d3', category: 'Dessert', name: 'Brioche Bread Pudding', description: 'bourbon currant sauce, vanilla whipped cream', price: '$11.00', page: 2 },
    { id: 't28_d4', category: 'Dessert', name: 'The Ice Cream Sandwich', description: 'sugar cookies, chocolate-hazelnut gelato, candied hazelnuts', price: '$9.00', page: 2 },
    { id: 't28_d5', category: 'Dessert', name: 'Basque Cheesecake', description: 'strawberry coulis, Madeira-macerated strawberries', price: '$12.00', page: 2 },

    // Disclaimers
    { id: 't28_disc1', category: 'Disclaimers', name: 'Consuming raw or undercooked animal products could increase your risk of food borne illness.', description: '', price: '', page: 2 },
    { id: 't28_disc2', category: 'Disclaimers', name: 'Latest food service inspection report is available upon request.', description: '', price: '', page: 2 },
  ],
};

export const PREBUILT_MENUS: PrebuiltMenu[] = [
  {
    id: 'founders-grill',
    name: "The Founder's Grill",
    description: "An upscale dining experience perfect for evening meals and special occasions.",
    restaurantInfo: {
      name: "The Founder's Grill",
      tagline: "A Tradition of Culinary Excellence",
    },
    menuItems: [
      { id: 'fg1', category: 'Starters', name: 'Jumbo Shrimp Cocktail', description: 'Chilled jumbo shrimp with a classic zesty cocktail sauce.', price: '$18.00', page: 1 },
      { id: 'fg2', category: 'Starters', name: 'French Onion Soup', description: 'Rich beef broth, caramelized onions, toasted crouton, and melted Gruyère.', price: '$12.00', page: 1 },
      { id: 'fg3', category: 'Main Courses', name: '8oz Filet Mignon', description: 'Center-cut tenderloin served with potato gratin and grilled asparagus.', price: '$45.00', page: 1 },
      { id: 'fg4', category: 'Main Courses', name: 'Pan-Seared Scallops', description: 'Served with a creamy lemon risotto and sautéed spinach.', price: '$38.00', page: 1 },
      { id: 'fg5', category: 'Main Courses', name: 'Heritage Pork Chop', description: 'Thick-cut grilled pork chop with apple chutney and roasted root vegetables.', price: '$35.00', page: 1 },
      { id: 'fg6', category: 'Desserts', name: 'New York Cheesecake', description: 'Classic cheesecake with a graham cracker crust and berry coulis.', price: '$10.00', page: 1 },
    ],
  },
  {
    id: 'the-turn-shack',
    name: 'The Turn Shack',
    description: 'Quick and delicious bites to enjoy at the turn or after your round.',
    restaurantInfo: {
      name: "The Turn Shack",
      tagline: "Refuel for the Back Nine",
    },
    menuItems: [
      { id: 'ts1', category: 'Hot Dogs', name: 'Classic Dog', description: 'All-beef frankfurter on a toasted bun. Ketchup, mustard, and relish available.', price: '$6.00', page: 1 },
      { id: 'ts2', category: 'Hot Dogs', name: 'Chili Cheese Dog', description: 'Our classic dog smothered in house-made chili and cheddar cheese.', price: '$8.00', page: 1 },
      { id: 'ts3', category: 'Sandwiches', name: 'Clubhouse Sandwich', description: 'Turkey, bacon, lettuce, tomato, and mayo on toasted sourdough.', price: '$12.00', page: 1 },
      { id: 'ts4', category: 'Sandwiches', name: 'Grilled Chicken Wrap', description: 'Grilled chicken, mixed greens, tomato, and ranch in a flour tortilla.', price: '$11.00', page: 1 },
      { id: 'ts5', category: 'Snacks & Sides', name: 'French Fries', description: 'Crispy and golden.', price: '$4.00', page: 1 },
      { id: 'ts6', category: 'Snacks & Sides', name: 'Onion Rings', description: 'Battered and fried to perfection.', price: '$5.00', page: 1 },
      { id: 'ts7', category: 'Beverages', name: 'Gatorade', description: 'Assorted flavors.', price: '$3.00', page: 1 },
      { id: 'ts8', category: 'Beverages', name: 'Domestic Beer', description: 'Choice of Budweiser, Miller Lite, or Coors Light.', price: '$5.00', page: 1 },
    ],
  },
  {
    id: 'clubhouse-brunch',
    name: 'Clubhouse Brunch',
    description: 'A delightful weekend brunch menu, served Saturdays and Sundays until 2 PM.',
    restaurantInfo: {
      name: "The Clubhouse Brunch",
      tagline: "The Perfect Weekend Tradition",
    },
    menuItems: [
      { id: 'cb1', category: 'Brunch Classics', name: 'Heritage Omelette', description: 'Three-egg omelette with your choice of three fillings. Served with hash browns.', price: '$14.00', page: 1 },
      { id: 'cb2', category: 'Brunch Classics', name: 'Buttermilk Pancakes', description: 'A tall stack of fluffy pancakes served with maple syrup and whipped butter.', price: '$12.00', page: 1 },
      { id: 'cb3', category: 'Brunch Classics', name: 'Avocado Toast', description: 'Toasted artisan bread topped with fresh avocado, cherry tomatoes, and a balsamic glaze.', price: '$13.00', page: 1 },
      { id: 'cb4', category: 'Cocktails', name: 'Classic Mimosa', description: 'Chilled sparkling wine and fresh orange juice.', price: '$9.00', page: 1 },
      { id: 'cb5', category: 'Cocktails', name: 'The Heritage Bloody Mary', description: 'Our signature spicy mix with vodka, garnished with olives and a celery stalk.', price: '$11.00', page: 1 },
      { id: 'cb6', category: 'Sides', name: 'Applewood Smoked Bacon', description: 'Three thick-cut slices.', price: '$5.00', page: 1 },
    ],
  },
  grandCafeBarList,
  tavern28Menu,
];