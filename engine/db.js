// engine/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("[DB] Error: MONGO_URI is not defined in Render Environment Variables.");
        return;
    }
    const conn = await mongoose.connect(uri);
    console.log(`[DB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[DB] Connection Error: ${err.message}`);
    // Removed process.exit(1) so the server stays up to show you the error
  }
};

module.exports = connectDB;
