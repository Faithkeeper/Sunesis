// engine/Persistence.js
const Sector = require("../models/Sector");
const Signal = require("../models/Signal");
const FeedEvent = require("../models/FeedEvent");
const FeedManager = require("./FeedManager"); // In-memory list

// Import your Classes to re-instantiate them
const SignalClass = require("./Signal"); 

async function hydrateWorld() {
  console.log("[PERSISTENCE] Hydrating world from DB...");

  // 1. Load Sectors
  const dbSectors = await Sector.find();
  dbSectors.forEach(doc => {
    // We map the DB doc back to the in-memory object structure
    const sectorObj = doc.toObject();
    sectorObj.id = sectorObj.sectorId; // Remap _id/systemId if needed
    // Convert signalIds array back to Set if your logic uses Sets
    sectorObj.signalIds = new Set(sectorObj.signalIds);
    
    global.sectorRegistry.set(sectorObj.id, sectorObj);
  });
  console.log(`[PERSISTENCE] Loaded ${dbSectors.length} sectors.`);

  // 2. Load Signals (Re-Instantiate Classes)
  const dbSignals = await Signal.find({ state: { $ne: 'dormant' } }); // Skip dead ones
  dbSignals.forEach(doc => {
    const data = doc.toObject();
    
    // Create a "hollow" signal and fill it
    const sig = new SignalClass({ sectorId: data.sectorId });
    // Overwrite the random defaults with saved data
    Object.assign(sig, {
      id: data.signalId,
      entropy: data.entropy,
      state: data.state,
      lastTouchedAt: data.lastTouchedAt,
      interactions: data.interactions,
      visibilityBias: data.visibilityBias
    });

    global.signalRegistry.set(sig.id, sig);
  });
  console.log(`[PERSISTENCE] Loaded ${dbSignals.length} active signals.`);

  // 3. Load Recent Feed (Context Restoration)
  const recentEvents = await FeedEvent.find().sort({ createdAt: -1 }).limit(20);
  // FeedManager adds to top, so we reverse to add chronological
  recentEvents.reverse().forEach(doc => {
    const evt = doc.toObject();
    evt.id = evt.eventId;
    FeedManager.add(evt); 
  });
}

function startSaveLoop() {
  // 4. WRITE-BACK STRATEGY (Every 60s)
  setInterval(async () => {
    // console.log("[PERSISTENCE] Snapshotting world state...");

    // Batch Signals
    const signalOps = [];
    for (const sig of global.signalRegistry.values()) {
      signalOps.push({
        updateOne: {
          filter: { signalId: sig.id },
          update: {
            sectorId: sig.sectorId,
            state: sig.state,
            entropy: sig.entropy,
            lastTouchedAt: sig.lastTouchedAt,
            interactions: sig.interactions,
            visibilityBias: sig.visibilityBias
          },
          upsert: true
        }
      });
    }
    if (signalOps.length > 0) await Signal.bulkWrite(signalOps);

    // Batch Sectors
    const sectorOps = [];
    for (const sec of global.sectorRegistry.values()) {
      sectorOps.push({
        updateOne: {
          filter: { sectorId: sec.id },
          update: {
            coherence: sec.coherence,
            rotDepth: sec.rotDepth,
            textVariance: sec.textVariance,
            ambientLine: sec.ambientLine,
            signalIds: Array.from(sec.signalIds) // Set -> Array
          },
          upsert: true
        }
      });
    }
    if (sectorOps.length > 0) await Sector.bulkWrite(sectorOps);

  }, 60000); // 60 seconds
}

// 5. Helper for Feed (Write-on-Create)
// Since feed events are immutable logs, we save them immediately, not in a batch.
async function persistFeedEvent(feedEvent) {
  try {
    await FeedEvent.create({
      eventId: feedEvent.id,
      sectorId: feedEvent.sectorId,
      type: feedEvent.type,
      tone: feedEvent.tone,
      variants: feedEvent.variants,
      createdAt: feedEvent.createdAt
    });
  } catch (e) {
    console.error("Failed to persist feed event", e);
  }
}

module.exports = { hydrateWorld, startSaveLoop, persistFeedEvent };