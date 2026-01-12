const mongoose = require("mongoose");

const FeedEventSchema = new mongoose.Schema({
  eventId: String,
  sectorId: String,
  type: String,
  tone: String,
  
  // CRITICAL: We save the Rashomon variants, not just one text
  variants: {
    logic: String,
    loyalty: String,
    chaos: String
  },
  
  createdAt: Number
});

module.exports = mongoose.model("FeedEvent", FeedEventSchema);