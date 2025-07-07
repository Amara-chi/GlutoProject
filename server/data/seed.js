import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
  {
    name: 'AGRI FRESH PRODUCTS',
    description: 'Fresh agricultural products including rice, beans, fruits, seeds, and nuts',
    subcategories: ['Rice', 'Beans', 'Fruits', 'Seeds', 'Nuts']
  },
  {
    name: 'FOOD AND BEVERAGE (FMCG)',
    description: 'Fast-moving consumer goods including snacks, drinks, and toiletries',
    subcategories: ['Snacks', 'Drinks', 'Toiletries']
  },
  {
    name: 'MEAT AND POULTRY PRODUCTS',
    description: 'Fresh and processed meat, poultry, and seafood products',
    subcategories: ['Eggs', 'Fish', 'Beef', 'Poultry']
  },
  {
    name: 'PROCESSED AFRICAN FOOD AND ITEMS',
    description: 'Traditional African foods and processed items',
    subcategories: ['Stock Fish', 'Egusi', 'Poundo Yam', 'Traditional Spices']
  },
  {
    name: 'NON FOOD PRODUCTS',
    description: 'Non-food items including personal care and household products',
    subcategories: ['Nivea Cream', 'Organic Soaps', 'Organic Syrup', 'Household Items']
  },
  {
    name: 'AGRONUTRITION / FERTILIZERS / SPECIAL PRODUCTS',
    description: 'Agricultural nutrition products, fertilizers, and bio-stimulants',
    subcategories: ['Fertilizers', 'Bio-stimulants', 'Plant Nutrition', 'Soil Conditioners']
  }
];

const sampleProducts = [
  {
    name: 'Premium Jasmine Rice',
    description: 'High-quality jasmine rice with fragrant aroma. Perfect for various dishes. EAN: 1234567890123',
    price: 25.99,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    availability: 85,
    ean: '1234567890123',
    weight: '25kg',
    origin: 'Thailand',
    packaging: {
      pieces: 1,
      cartons: 20,
      pallets: 40
    },
    leadTime: '2-3 weeks',
    shelfLife: '24 months',
    subcategory: 'Rice'
  },
  {
    name: 'Organic Black Beans',
    description: 'Premium organic black beans, rich in protein and fiber. EAN: 1234567890124',
    price: 18.50,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    availability: 92,
    ean: '1234567890124',
    weight: '20kg',
    origin: 'Brazil',
    packaging: {
      pieces: 1,
      cartons: 25,
      pallets: 50
    },
    leadTime: '3-4 weeks',
    shelfLife: '36 months',
    subcategory: 'Beans'
  },
  {
    name: 'Fresh Atlantic Salmon',
    description: 'Premium fresh Atlantic salmon, wild-caught. EAN: 1234567890125',
    price: 45.99,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
    availability: 65,
    ean: '1234567890125',
    weight: '2kg',
    origin: 'Norway',
    packaging: {
      pieces: 1,
      cartons: 12,
      pallets: 24
    },
    leadTime: '1-2 weeks',
    shelfLife: '7 days',
    subcategory: 'Fish'
  },
  {
    name: 'Organic Coconut Oil',
    description: 'Extra virgin organic coconut oil, cold-pressed. EAN: 1234567890126',
    price: 32.99,
    image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg',
    availability: 78,
    ean: '1234567890126',
    weight: '500ml',
    origin: 'Philippines',
    packaging: {
      pieces: 1,
      cartons: 24,
      pallets: 48
    },
    leadTime: '2-3 weeks',
    shelfLife: '24 months',
    subcategory: 'Organic Soaps'
  },
  {
    name: 'Premium Stock Fish',
    description: 'Traditional dried stock fish, perfect for African cuisine. EAN: 1234567890127',
    price: 55.99,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    availability: 45,
    ean: '1234567890127',
    weight: '5kg',
    origin: 'Nigeria',
    packaging: {
      pieces: 1,
      cartons: 8,
      pallets: 16
    },
    leadTime: '4-5 weeks',
    shelfLife: '18 months',
    subcategory: 'Stock Fish'
  },
  {
    name: 'Organic Fertilizer',
    description: 'Premium organic fertilizer for enhanced plant growth. EAN: 1234567890128',
    price: 28.99,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    availability: 88,
    ean: '1234567890128',
    weight: '25kg',
    origin: 'Germany',
    packaging: {
      pieces: 1,
      cartons: 40,
      pallets: 80
    },
    leadTime: '3-4 weeks',
    shelfLife: '36 months',
    subcategory: 'Fertilizers'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Categories inserted:', insertedCategories.length);

    // Insert products with category references
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = sampleProducts[i];
      const categoryIndex = i % insertedCategories.length;
      product.category = insertedCategories[categoryIndex]._id;
      await Product.create(product);
    }
    console.log('Sample products inserted:', sampleProducts.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();