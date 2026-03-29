const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tokyo_pulse');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error Connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
