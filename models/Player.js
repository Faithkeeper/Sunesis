const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  systemId: { type: String, required: true, unique: true },
  lateName: String,
  philosophy: String, // logic | loyalty | chaos
  
  // Act 1-6 Metadata (optional, for migration)
  legacyStats: Object,
  
  lastSeenAt: Number
});

module.exports = mongoose.model("Player", PlayerSchema);