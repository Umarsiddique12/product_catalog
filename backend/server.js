require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✓ Connected to MongoDB Atlas');

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Backend server running on port ${PORT}`);
      console.log(`✓ Environment: ${NODE_ENV}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
