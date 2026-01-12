const { persistFeedEvent } = require("./Persistence");

class FeedManager {
  constructor() {
    this.events = [];
    this.MAX_SIZE = 50;
  }

  add(event) {
    this.events.unshift(event); 
    if (this.events.length > this.MAX_SIZE) {
      this.events.pop(); 
    }
    // Correctly placed inside the function
    persistFeedEvent(event); 
  }

  getForPlayer(player) {
    const viewerPhil = player.philosophy || 'logic';
    return this.events.map(event => ({
      id: event.id,
      timestamp: event.createdAt,
      tone: event.tone,
      text: event.variants[viewerPhil] || event.variants['logic'] 
    }));
  }
}

module.exports = new FeedManager();
