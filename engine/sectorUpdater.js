function updateSector(sector, signals) {
  if (signals.length === 0) return;

  let totalEntropy = 0;
  let unresolved = 0;

  const philosophyCounts = {
    logic: 0,
    loyalty: 0,
    chaos: 0
  };

  for (const signal of signals) {
    totalEntropy += signal.entropy;

    if (signal.state !== "active") {
      unresolved++;
    }

    for (const i of signal.interactions) {
      philosophyCounts[i.philosophy]++;
    }
  }

  const avgEntropy = totalEntropy / signals.length;

  // --- ROT LOGIC ---
  const totalActions =
    philosophyCounts.logic +
    philosophyCounts.loyalty +
    philosophyCounts.chaos;

  let imbalance = 0;
  if (totalActions > 0) {
    const max = Math.max(
      philosophyCounts.logic,
      philosophyCounts.loyalty,
      philosophyCounts.chaos
    );
    imbalance = max / totalActions; // 0.33 balanced → 1.0 dominant
  }

  // Rot grows from neglect + dominance
  sector.rotDepth +=
    (avgEntropy / 100) * imbalance * 0.02 +
    unresolved * 0.005;

  // --- HEALING LOGIC ---
  if (imbalance < 0.45 && avgEntropy < 50) {
    sector.rotDepth -= 0.015;
    sector.coherence += 0.01;
  }

  // Clamp
  sector.rotDepth = clamp(sector.rotDepth, 0, 1);
  sector.coherence = clamp(sector.coherence, 0, 1);

  // Text degradation
  sector.textVariance =
    1 - sector.rotDepth * 0.6;
	
  sector.rotDepth = Math.max(0, Math.min(1, sector.rotDepth));
  sector.coherence = 1.0 - sector.rotDepth;

  // --- ADD THE "THINNESS" LOGIC HERE ---
  sector.statusMessage = null; // Clear previous message
  
  if (sector.rotDepth > 0.6) {
    // 5% chance to trigger the message per 15-second tick
    if (Math.random() < 0.05) { 
      sector.statusMessage = "This place feels thinner than it should.";
      console.log(`[WORLD] Rot Warning in ${sector.id}: ${sector.statusMessage}`);
    }
  }

  sector.lastUpdatedAt = Date.now();
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function updateAmbientLine(sector) {
  // Your logic here...
  let line = "";
  if (sector.rotDepth > 0.7) {
     line = pick([ "This place feels thinner than it should.",
      "Something here doesn’t quite respond.",
      "You get the sense something was lost."]);
  } else if (sector.rotDepth > 0.4) {
     line = pick([ "The air here feels slightly off.",
      "Things seem quieter than expected.",
      "Not everything fits together."]);
  } else if (sector.coherence > 0.8) {
     line = pick(["The space here feels alert.",
      "Details seem easier to notice.",
      "Things make sense without effort."]);
  }	else {
	  line =  pick([
    "Nothing immediately stands out.",
    "The place feels ordinary.",
    "Everything appears stable."
  ]);
  }
  
  // SAVE IT TO THE SECTOR
  sector.ambientLine = line; 
}

// Helper
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = { updateSector };
