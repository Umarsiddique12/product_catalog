require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI;
const BATCH_SIZE = 500;
const DEFAULT_TOTAL = 200000;
const TOTAL_PRODUCTS = parseInt(process.argv[2], 10) || parseInt(process.env.SEED_COUNT, 10) || DEFAULT_TOTAL;
const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Sports', 'Home'];

const randomTimestamp = () => {
  const now = Date.now();
  const maxAge = 1000 * 60 * 60 * 24 * 365; // one year
  return new Date(now - Math.floor(Math.random() * maxAge));
};

const randomPrice = () => {
  return Number((Math.random() * 995 + 5).toFixed(2));
};

const generateProduct = (index) => {
  const category = CATEGORIES[index % CATEGORIES.length];
  const createdAt = randomTimestamp();
  const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30));

  return {
    name: `Product ${index.toString().padStart(6, '0')}`,
    category,
    price: randomPrice(),
    createdAt,
    updatedAt
  };
};

const seed = async () => {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is required in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Connected to MongoDB Atlas for seeding');

  try {
    await Product.deleteMany({});

    for (let offset = 0; offset < TOTAL_PRODUCTS; offset += BATCH_SIZE) {
      const batch = [];
      const upper = Math.min(offset + BATCH_SIZE, TOTAL_PRODUCTS);

      for (let i = offset + 1; i <= upper; i += 1) {
        batch.push(generateProduct(i));
      }

      await Product.insertMany(batch, { ordered: false });
      console.log(`Inserted products ${offset + 1} to ${upper}`);
    }

    console.log('Seed complete');
  } catch (error) {
    console.error('Seed failed', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();
