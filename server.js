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

// server.js (The logic that world_client.js talks to)
app.post('/api/world/enter-sector', async (req, res) => {
    const { sectorId, playerName } = req.body;
    const Sector = require('./models/Sector');

    try {
        let sector = await Sector.findOne({ id: sectorId });
        
        // Increment the "Pressure"
        sector.entryCount += 1;

        // The Silent Shift
        if (sector.state === 'neutral' && sector.entryCount >= 5) {
            sector.state = 'unstable';
        }

        await sector.save();

        res.json({
            state: sector.state,
            // We send the specific text based on the state
            description: sector.state === 'neutral' 
                ? "The station is quiet. Systems idle. No clear signals." 
                : "The station is quiet — but not empty. Something lingers. Not data. Presence."
        });
    } catch (e) { res.sendStatus(500); }
});

app.get('/world', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'world.html'));
});

// adminRoutes.js logic inside server.js
app.get('/dev-admin/:pass', async (req, res) => {
    // Basic safety check (Replace 'YourSecretKey' with a word of your choice)
    if (req.params.pass !== 'StrangeOil2026') {
        return res.status(403).send("ACCESS DENIED: Unauthorized Signal Detected.");
    }

    const action = req.query.action;
    const Sector = require('./models/Sector'); // Path to your Mongoose model

    try {
        if (action === 'reset_entropy') {
            await Sector.updateMany({}, { coherence: 100, rotDepth: 0 });
            return res.send("WORLD STABILIZED: Entropy set to zero.");
        }

        if (action === 'nuke') {
            await Sector.deleteMany({});
            return res.send("THE BIG BANG: All sectors wiped. Restart server to rehydrate.");
        }

        if (action === 'status') {
            const sectors = await Sector.find({});
            return res.json(sectors);
        }

        res.send("Admin Access Granted. Available actions: reset_entropy, nuke, status.");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

boot();
