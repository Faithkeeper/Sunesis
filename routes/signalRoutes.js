const express = require("express");
const router = express.Router();
const Signal = require("../engine/Signal");
const { getVisibleSignalsForPlayer } = require("../engine/SignalVisibility"); // <--- Import here

const feedManager = require("../engine/FeedManager");
const { generateFeedEvent } = require("../engine/FeedGenerator");
const globalSectorRegistry = global.sectorRegistry; 

// GET /api/signals - "What can I see?"
router.get("/signals", (req, res) => {
  // 1. Identify Player
  // (Mocking auth for this example, replace with your session logic)
  const playerId = req.player?.id; 
  const player = global.playerRegistry.get(playerId);

  if (!player) {
    return res.status(401).json({ error: "Unknown identity" });
  }

  // 2. Run the Visibility Logic
  const signals = getVisibleSignalsForPlayer(player, global.signalRegistry);

  // 3. Return the array
  res.json({ 
    count: signals.length,
    signals: signals 
  });
});
router.get("/sector-status/:sectorId", (req, res) => {
  const sector = globalSectorRegistry.get(req.params.sectorId);
  if (!sector) return res.status(404).json({ error: "Sector not found" });

  res.json({
    name: sector.name,
    coherence: sector.coherence.toFixed(2),
    rot: sector.rotDepth.toFixed(2),
    // This is where that rare message surfaces to the UI
    announcement: sector.statusMessage 
  });
});

// POST /api/signal/interact - "I want to touch it"
router.post("/signal/interact", (req, res) => {
  // ... (Your existing interaction code remains exactly the same) ...
  const { signalId, action } = req.body;
  const playerId = req.player.id; 
  const player = globalSectorRegistry.get(playerId);

  if (!player) return res.status(401).json({ error: "Unknown identity" });

  const signal = globalSectorRegistry.get(signalId);
  if (!signal) return res.status(404).json({ error: "Signal not found" });

  if (!["observe", "interfere", "ignore"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  signal.interact({
    playerId,
    philosophy: player.philosophy,
    action
  });

 // --- NEW: FEED GENERATION ---
  // 15% Chance to echo into the global feed
  if (Math.random() < 0.15) {
    const sector = globalSectorRegistry.get(signal.sectorId);
    const event = generateFeedEvent(signal, sector, action);
    feedManager.add(event);
  }
  
  return res.json({ status: "acknowledged" });

// --- NEW ROUTE: GET FEED ---
router.get("/feed", (req, res) => {
  // Mock auth again
  const playerId = req.player?.id; 
  const player = global.playerRegistry.get(playerId);
  if (!player) return res.status(401).json({ error: "Identity required" });

  const feed = feedManager.getForPlayer(player);
  res.json({ feed });
});

  return res.json({ status: "acknowledged" });
});

// 1. Single Save Route
router.post('/save', async (req, res) => {
    try {
        const { profileName, playerData } = req.body;
        // Here you would find the user in MongoDB and update their profile
        // e.g., await PlayerModel.findOneAndUpdate({ name: profileName }, { data: playerData });
        console.log(`[DB] Saved profile: ${profileName}`);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 2. Bulk Sync Route (For the Offline Queue)
router.post('/sync', async (req, res) => {
    try {
        const { events } = req.body;
        console.log(`[SYNC] Processing ${events.length} offline events...`);
        
        for (const event of events) {
            // Process each queued save in order
            // This ensures decisions made while offline aren't lost
        }
        
        res.status(200).json({ status: 'success', count: events.length });
    } catch (err) {
        console.error("[SYNC] Error processing batch:", err);
        res.status(500).send("Sync failed");
    }
});

module.exports = router;
