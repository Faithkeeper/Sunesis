// engine/Persistence.js
const mongoose = require('mongoose');

// We need your Classes to recreate the objects correctly
const Sector = require('./Sector');
const Signal = require('./Signal');

/**
 * HYDRATION:
 * When the server starts, we look at the Database.
 * If there is data, we fill our global.Registries with it.
 * If there is NO data (first run), we create the "Main_Hub".
 */
async function hydrateWorld() {
    console.log("[SYSTEM] Beginning Hydration...");

    try {
        // 1. Define internal Schemas (if not in separate files)
        const SectorModel = mongoose.models.Sector || mongoose.model('Sector', new mongoose.Schema({
            id: String,
            name: String,
            coherence: Number,
            rotDepth: Number,
            philosophySkew: Object,
            signalIds: Array
        }));

        // 2. Load Sectors from DB
        const savedSectors = await SectorModel.find({});

        if (savedSectors.length === 0) {
            console.log("[SYSTEM] No sectors found. Initializing 'Main_Hub'...");
            const hub = new Sector({ id: "Main_Hub", name: "The Prime Sector" });
            global.sectorRegistry.set(hub.id, hub);
        } else {
            savedSectors.forEach(data => {
                const sector = new Sector({ id: data.id, name: data.name });
                sector.coherence = data.coherence;
                sector.rotDepth = data.rotDepth;
                sector.philosophySkew = data.philosophySkew;
                sector.signalIds = new Set(data.signalIds);
                global.sectorRegistry.set(sector.id, sector);
            });
            console.log(`[SYSTEM] Hydrated ${savedSectors.length} sectors.`);
        }

        // 3. Load Signals (Optional: You could also let signals be temporary)
        // For now, we assume signals are volatile and recreate them 
        // in server.js to keep things simple for your first deploy.

        return true;
    } catch (err) {
        console.error("[CRITICAL] Hydration failed:", err);
        return false;
    }
}

/**
 * SAVE LOOP:
 * Every 60 seconds, we take the data in RAM (global.sectorRegistry)
 * and overwrite the records in MongoDB Atlas.
 */
function startSaveLoop() {
    console.log("[SYSTEM] Persistence Heartbeat Started.");

    setInterval(async () => {
        try {
            const SectorModel = mongoose.model('Sector');
            
            for (const sector of global.sectorRegistry.values()) {
                await SectorModel.findOneAndUpdate(
                    { id: sector.id },
                    {
                        coherence: sector.coherence,
                        rotDepth: sector.rotDepth,
                        philosophySkew: sector.philosophySkew,
                        signalIds: Array.from(sector.signalIds), // Convert Set back to Array
                        lastUpdatedAt: Date.now()
                    },
                    { upsert: true } // Create it if it doesn't exist
                );
            }
            console.log("[DB] World State Auto-Saved.");
        } catch (err) {
            console.error("[DB] Auto-save Error:", err);
        }
    }, 60000); // 60 seconds
}

// Add this if you want to save specific events like messages
async function persistFeedEvent(event) {
    // Optional: Save events to a separate collection
}

module.exports = { hydrateWorld, startSaveLoop, persistFeedEvent };