const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema({
  sectorId: { type: String, required: true, unique: true }, // Maps to logic id
  name: String,
  coherence: Number,
  rotDepth: Number,
  textVariance: Number,
  signalIds: [String], // Array of IDs belonging here
  ambientLine: String, // Persist the current "vibes"
  lastUpdatedAt: Number
});

module.exports = mongoose.models.Sector || mongoose.model('Sector', sectorSchema);
