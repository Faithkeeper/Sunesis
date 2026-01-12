const FeedEvent = require('./FeedEvent');

// Narratives based on Philosophy
const TEMPLATES = {
  interfere: {
    logic: ["Signal variance reduced.", "Entropy corrected.", "Pattern enforced."],
    loyalty: ["Someone stabilized the signal.", "A quiet intervention.", "Balance restored."],
    chaos: ["The signal was broken.", "Disruption logged.", "Someone forced their will."]
  },
  observe: {
    logic: ["Data point verified.", "Observation logged.", "Analysis complete."],
    loyalty: ["Someone witnessed this.", "The signal was seen.", "Attention given."],
    chaos: ["A gaze lingered.", "The void stared back.", "Passive voyeurism."]
  },
  // The Dangerous Line (Sterile Rot)
  sterile: {
    all: ["Everything responded as expected.", "Compliance verified.", "Optimal state maintained."]
  }
};

function generateFeedEvent(signal, sector, action) {
  // 1. Check for Sterile Rot (The Dangerous Line)
  if (sector.rotDepth > 0.8 && Math.random() < 0.2) {
    const text = "Everything responded as expected.";
    return new FeedEvent({
      sectorId: sector.id,
      type: 'sterile_echo',
      tone: 'sterile',
      variants: { logic: text, loyalty: text, chaos: text } // Everyone sees the same lie
    });
  }

  // 2. Standard Generation
  const variants = {};
  ['logic', 'loyalty', 'chaos'].forEach(phil => {
    const options = TEMPLATES[action][phil];
    variants[phil] = options[Math.floor(Math.random() * options.length)];
  });

  return new FeedEvent({
    sectorId: sector.id,
    type: 'interaction',
    tone: sector.rotDepth > 0.5 ? 'fractured' : 'calm',
    variants: variants
  });
}

module.exports = { generateFeedEvent };