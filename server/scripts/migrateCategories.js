const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

const OLD_CATEGORIES = ['clothing', 'accessories', 'home-decor', 'art', 'wellness', 'other'];

async function migrate() {
  await connectDB();
  console.log('Starting category migration...');

  // Create Category documents for each old enum value
  const categoryMap = {};
  for (const name of OLD_CATEGORIES) {
    const displayName = name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let cat = await Category.findOne({ name: displayName });
    if (!cat) {
      cat = await Category.create({ name: displayName });
      console.log(`Created category: ${displayName}`);
    }
    categoryMap[name] = cat._id;
  }

  // Update products that have old string categories
  const products = await Product.find({ deletedAt: null });
  let updated = 0;
  for (const product of products) {
    const catStr = product.category;
    // If category is a string (old enum value), map it
    if (catStr && typeof catStr === 'string' && !mongoose.Types.ObjectId.isValid(catStr)) {
      const newCatId = categoryMap[catStr];
      if (newCatId) {
        await Product.updateOne({ _id: product._id }, { $set: { category: newCatId, tags: [] } });
        updated++;
      }
    }
  }

  console.log(`Migration complete. Updated ${updated} products.`);
  process.exit(0);
}

migrate().catch((err) => { console.error('Migration failed:', err); process.exit(1); });
