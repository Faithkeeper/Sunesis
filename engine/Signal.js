const mongoose = require("mongoose");

const SignalSchema = new mongoose.Schema({
  signalId: { type: String, required: true, unique: true },
  sectorId: String,
  state: String, // 'active', 'dormant'
  entropy: Number,
  
  // engine/Signal.js (Line 8)
const sector = global.sectorRegistry ? global.sectorRegistry.get(sectorId) : null;
if (!sector) {
    console.warn(`[WARNING] Signal created for unknown sector: ${sectorId}`);
}
  
  // Store interaction history logic
  interactions: { type: Array, default: [] },
  
  // Important timestamps for drift calculation
  createdAt: Number,
  lastTouchedAt: Number,
  
  // Philosophy visibility
  visibilityBias: { type: Object, default: {} }
});

module.exports = mongoose.model("Signal", SignalSchema);
