require('dotenv').config();

// 1. GLOBALS (Must be first)
global.signalRegistry = new Map();
global.playerRegistry = new Map();
global.sectorRegistry = new Map();

// 2. IMPORTS
const express = require('express');
const path = require('path');
const app = express();

const connectDB = require('./engine/db');
const { hydrateWorld, startSaveLoop } = require('./engine/Persistence');
const worldManager = require("./engine/WorldManager");
const Signal = require("./engine/Signal");
const { updateSector } = require("./engine/sectorUpdater");

// 3. MIDDLEWARE & STATIC CONTENT
app.use(express.json());
app.use(express.static('public')); // Acts 1-6
app.use(express.static('static')); // Online World

// Routes
app.use("/api", require("./routes/signalRoutes"));

app.get('/world', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'world.html'));
});

// 4. BOOT SEQUENCE
async function boot() {
    try {
        console.log("[SYSTEM] Initializing Boot Sequence...");
        
        await connectDB();       // Connect to Atlas
        await hydrateWorld();    // Fill Registries from DB

        // Start World Engine
        worldManager.startLoop();

        // Create Initial Signal if needed
        const s1 = new Signal({ sectorId: "Main_Hub" });
        worldManager.addSignal(s1);

        // Start Sector Update Loop (Every 15s)
        setInterval(() => {
            for (const sector of global.sectorRegistry.values()) {
                const signals = [];
                for (const id of sector.signalIds) {
                    const sig = global.signalRegistry.get(id);
                    if (!sig) {
                        sector.signalIds.delete(id);
                    } else {
                        signals.push(sig);
                    }
                }
                updateSector(sector, signals);
                // Note: Ensure updateAmbientLine is defined or imported if used
            }
        }, 15000);

        // Start Database Persistence (Every 60s)
        startSaveLoop();

        const PORT = process.env.PORT || 10000;
        app.listen(PORT, () => {
            console.log(`==> APOKALUPSIS ONLINE: Live on port ${PORT}`);
            console.log("[SYSTEM] World is live and persistent.");
        });

    } catch (err) {
        console.error("[FATAL ERROR] World failed to initialize:", err);
    }
}

// Start the game
boot();
