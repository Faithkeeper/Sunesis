const crypto = require('crypto');

class FeedEvent {
  constructor({ sectorId, type, variants, tone }) {
    this.id = crypto.randomUUID();
    this.sectorId = sectorId; // null = global event
    this.type = type;         // 'interaction', 'shift', 'anomaly'
    this.tone = tone;         // 'calm', 'sharp', 'fractured', 'sterile'
    this.createdAt = Date.now();
    
    // The Rashomon Core: We generate all 3 perspectives at creation.
    // variants = { logic: "...", loyalty: "...", chaos: "..." }
    this.variants = variants; 
  }
}

module.exports = FeedEvent;