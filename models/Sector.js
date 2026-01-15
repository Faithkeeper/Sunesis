const mongoose = require("mongoose");

const SectorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Maps to logic id
  name: String,
  coherence: Number,
  rotDepth: Number,
  textVariance: Number,
  signalIds: [String], // Array of IDs belonging here
  ambientLine: String, // Persist the current "vibes"
  lastUpdatedAt: Number,

  // The Mechanism
  state: {
    type: String,
    enum: ['neutral', 'unstable', 'fractured'],
    default: 'neutral'
  },
  entryCount: { type: Number, default: 0 },
  threshold: { type: Number, default: 5 }, // 5 players triggers the shift

  // The Content (The "Before" and "After")
  descriptionNeutral: String,
  descriptionUnstable: String,

  // Behavior memory used by sector updater
  philosophySkew: {
    type: Object,
    default: { logic: 0, loyalty: 0, chaos: 0 }
  }
});

module.exports = mongoose.models.Sector || mongoose.model('Sector', SectorSchema);
