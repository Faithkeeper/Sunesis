// engine/FeedManager.js
const { persistFeedEvent } = require("./Persistence");

class FeedManager {
  constructor() {
    this.events = [];
    this.MAX_SIZE = 50; // Old entries fade into the void
  }

  add(event) {
    this.events.unshift(event); // Add to top
    if (this.events.length > this.MAX_SIZE) {
      this.events.pop(); // Remove oldest
    }
    
    // Correctly placed inside the add function
    persistFeedEvent(event); 
  }

  /**
   * Returns the feed filtered by the VIEWER'S philosophy
   */
  getForPlayer(player) {
    const viewerPhil = player.philosophy || 'logic'; 

    return this.events.map(event => ({
      id: event.id,
      timestamp: event.createdAt,
      tone: event.tone,
      // The Magic Trick: Only send the text intended for this player
      text: event.variants[viewerPhil] || event.variants['logic'] 
    }));
  }
}

module.exports = new FeedManager();
