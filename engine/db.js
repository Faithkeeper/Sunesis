// engine/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ensure you have MONGO_URI in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[DB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[DB] Error: ${err.message}`);
    process.exit(1); // Die if we can't save state
  }
};

module.exports = connectDB;