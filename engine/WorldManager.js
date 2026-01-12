// engine/WorldManager.js
const { updateSignal } = require("./signalUpdater");

class WorldManager {
  constructor() {
    this.signals = new Map();
    this.intervalId = null;
  }

  addSignal(signal) {
    this.signals.set(signal.id, signal);
  }

  getSignal(id) {
    return this.signals.get(id);
  }

  startLoop(rate = 10000) {
    if (this.intervalId) return; // Already running
    
    console.log("[WORLD] Entropy Loop Started");
    
    this.intervalId = setInterval(() => {
      const now = Date.now();
      this.signals.forEach((signal) => {
        updateSignal(signal, now);
        // Debug log to see it working
        console.log(`Signal ${signal.id.slice(0,4)}: State=${signal.state}, Entropy=${signal.entropy.toFixed(2)}`);
      });
    }, rate);
  }
}

// Export a single instance (Singleton)
module.exports = new WorldManager();