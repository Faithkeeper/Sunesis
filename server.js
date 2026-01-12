// 1. GLOBALS FIRST
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

// 3. MIDDLEWARE
app.use(express.json());
app.use(express.static('public')); 
app.use(express.static('static')); 

// 4. BOOT SEQUENCE
async function boot() {
    try {
        console.log("[SYSTEM] Initializing Boot Sequence...");
        
        await connectDB();       
        await hydrateWorld();    

        // Start World Engine
        worldManager.startLoop();

        // Create Initial Signal if none exist
        if (global.signalRegistry.size === 0) {
            const s1 = new Signal({ sectorId: "Main_Hub" });
            worldManager.addSignal(s1);
        }

        // Sector Update Loop (Every 15s)
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
            }
        }, 15000);

        // Start Persistence
        startSaveLoop();

        const PORT = process.env.PORT || 10000;
        app.listen(PORT, () => {
            console.log(`==> APOKALUPSIS ONLINE: Live on port ${PORT}`);
        });

    } catch (err) {
        console.error("[FATAL ERROR] Boot failed:", err);
    }
}

// 5. ROUTES
app.use("/api", require("./routes/signalRoutes"));

app.get('/world', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'world.html'));
});

boot();
