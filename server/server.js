const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const cron = require('node-cron');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Security middleware
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check (placed above DB connection so it is always fast and doesn't require DB)
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Empower Stop API is running' });
});

// Database connection middleware (established lazily per request)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection failed:', err.message);
    res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGO_URI is set correctly.',
    });
  }
});

// Serve uploaded files locally (fallback when Cloudinary not configured)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/opportunities', require('./routes/opportunities'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/safety', require('./routes/safety'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/products', require('./routes/products'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api', require('./routes/reviews'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/hero-slides', require('./routes/heroSlides'));
app.use('/api/media-coverage', require('./routes/mediaCoverage'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/notifications', require('./routes/notifications'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

if (require.main === module) {
  // Soft-delete purge cron job — runs daily at 2:00 AM
  // Permanently removes Resource and Opportunity documents where deletedAt is older than 30 days
  cron.schedule('0 2 * * *', async () => {
    try {
      const Resource = require('./models/Resource');
      const Opportunity = require('./models/Opportunity');
      const Product = require('./models/Product');

      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const [resourceResult, opportunityResult, productResult] = await Promise.all([
        Resource.deleteMany({ deletedAt: { $ne: null, $lte: thirtyDaysAgo } }),
        Opportunity.deleteMany({ deletedAt: { $ne: null, $lte: thirtyDaysAgo } }),
        Product.deleteMany({ deletedAt: { $ne: null, $lte: thirtyDaysAgo } }),
      ]);

      console.log(
        `[CRON] Purge complete — Resources: ${resourceResult.deletedCount}, Opportunities: ${opportunityResult.deletedCount}, Products: ${productResult.deletedCount}`
      );
    } catch (error) {
      console.error('[CRON] Purge failed:', error.message);
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
