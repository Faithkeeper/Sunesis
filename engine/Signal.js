const crypto = require("crypto");

class Signal {
  constructor({ sectorId, visibilityBias = {} }) {
    this.id = crypto.randomUUID();
    this.sectorId = sectorId;
	
	const sector = global.sectorRegistry.get(sectorId);
    if (sector) {
        sector.signalIds.add(this.id);
    } else {
        console.error(`[CRITICAL] Signal created for non-existent sector: ${sectorId}`);
    }

    // Core state
    this.state = "active"; // active | decaying | dormant
    this.entropy = 25;     // 0–100
    this.coherenceImpact = 0;

    // History
    this.interactions = [];

    // Timing
    this.createdAt = Date.now();
    this.lastTouchedAt = Date.now();

    // Visibility bias (who notices it)
    this.visibilityBias = {
      logic: visibilityBias.logic ?? 1,
      loyalty: visibilityBias.loyalty ?? 1,
      chaos: visibilityBias.chaos ?? 1
    };
  }

  interact({ playerId, philosophy, action }) {
    this.interactions.push({
      playerIdHash: crypto
        .createHash("sha256")
        .update(playerId)
        .digest("hex"),
      philosophy,
      action,
      timestamp: Date.now()
    });

    this.lastTouchedAt = Date.now();

    this.applyInteractionEffect(action, philosophy);
  }

  applyInteractionEffect(action, philosophy) {
    switch (action) {
      case "observe":
        this.entropy -= 1.5;
        break;

      case "interfere":
        this.entropy -= 4;
        this.coherenceImpact += philosophy === "logic" ? 2 : 1;
        break;

      case "ignore":
        this.entropy += 2;
        break;
    }

    this.entropy = clamp(this.entropy, 0, 100);
  }
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

module.exports = Signal;
