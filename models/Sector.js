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
});

module.exports = mongoose.models.Sector || mongoose.model('Sector', sectorSchema);
