// engine/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  // DEBUG LOGGING
  if (!uri) {
    console.error("[DB DEBUG] MONGO_URI is completely missing from process.env!");
  } else {
    // This hides the middle of your password but shows the start and end
    // so we can see if there are accidental spaces or quotes.
    const maskedUri = uri.replace(/:([^@]+)@/, (match, p1) => {
        return `:${p1.substring(0, 2)}***${p1.slice(-2)}@`;
    });
    console.log(`[DB DEBUG] Attempting connection with: ${maskedUri}`);
  }

  try {
    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
    });
    console.log(`[DB] Success: Connected to ${conn.connection.host}`);
  } catch (err) {
    console.error(`[DB] AUTH ERROR: ${err.message}`);
    // We removed process.exit(1) previously; keep it removed for debugging.
  }
};

module.exports = connectDB;
