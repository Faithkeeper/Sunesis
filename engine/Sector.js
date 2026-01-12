class Sector {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;

    // World health
    this.coherence = 1.0;     // 0.0 → 1.0
    this.rotDepth = 0.0;      // 0.0 → 1.0

    // Signal tracking
    this.signalIds = new Set();

    // Behavior memory
    this.philosophySkew = {
      logic: 0,
      loyalty: 0,
      chaos: 0
    };

    // Text behavior
    this.textVariance = 1.0;  // controls repetition & clarity
    this.lastUpdatedAt = Date.now();
  }
}

module.exports = Sector;
