function calculateDiversity(interactions) {
  const philosophies = new Set();
  const actions = new Set();

  interactions.forEach(i => {
    philosophies.add(i.philosophy);
    actions.add(i.action);
  });

  return philosophies.size + actions.size;
}

function updateSignal(signal, now = Date.now()) {
  const inactivityMs = now - signal.lastTouchedAt;

  // Natural drift (slow, constant)
  signal.entropy += inactivityMs * 0.00002;

  // Diversity counteracts entropy
  const diversity = calculateDiversity(signal.interactions);
  signal.entropy -= diversity * 0.4;

  signal.entropy = Math.max(0, Math.min(100, signal.entropy));

  // State transitions
  if (signal.entropy > 90) signal.state = "dormant";
  else if (signal.entropy > 65) signal.state = "decaying";
  else signal.state = "active";
}

module.exports = { updateSignal };
