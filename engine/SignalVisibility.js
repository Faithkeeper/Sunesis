// engine/SignalVisibility.js

/**
 * Filters the global signal registry based on player philosophy.
 * @param {Object} player - The player object (must have .philosophy)
 * @param {Map} registry - The global.signalRegistry
 */
function getVisibleSignalsForPlayer(player, registry) {
  const visibleSignals = [];

  for (const signal of registry.values()) {
    // 1. Filter out dead signals immediately
    if (signal.state === "dormant") continue;

    // 2. Calculate Bias
    // If the signal has no specific bias for this philosophy, default to 1.0
    const bias = signal.visibilityBias[player.philosophy] ?? 1.0;

    // 3. Perception Gate
    // Note: Using pure random means signals might "flicker" in and out 
    // on repeated requests. If you want stability, use a deterministic hash.
    // For now, we use your requested logic:
    if (Math.random() < bias * 0.6) {
      // 4. Sanitize! 
      // Don't send the full object (entropy, history) to the client
      // unless you want them to see the raw mechanics.
      visibleSignals.push({
        id: signal.id,
        sectorId: signal.sectorId,
        state: signal.state,
        // Client needs to know if they perceive it strongly or weakly?
        perceivedStrength: bias 
      });
    }
  }

  return visibleSignals;
}

module.exports = { getVisibleSignalsForPlayer };