// server.js (Clean Version)
const worldManager = require("./engine/WorldManager");
const Signal = require("./engine/Signal");

// Start the loop
worldManager.startLoop();

// Add a signal
const s1 = new Signal({ sectorId: "Main_Hub" });
worldManager.addSignal(s1);

global.signalRegistry = new Map();   // signalId → Signal
global.playerRegistry = new Map();   // playerId → player object
global.sectorRegistry = new Map();   // sectorId → sector object

app.use("/api", require("./routes/signalRoutes"));

const { updateSector } = require("./engine/sectorUpdater");



// server.js
require("dotenv").config(); // Load .env for MONGO_URI
const connectDB = require("./engine/db");
const { hydrateWorld, startSaveLoop } = require("./engine/Persistence");

// 1. Connect DB
connectDB();

// 2. Hydrate BEFORE starting the game loop
// We wrap start in an async IIFE
(async () => {
  await hydrateWorld(); // Pulls data from Atlas

  // 3. Start Loops
  // ... (My existing Signal/Sector loops here) ...
 setInterval(() => {
  for (const sector of global.sectorRegistry.values()) {
    const signals = [];
    
    for (const id of sector.signalIds) {
      const sig = global.signalRegistry.get(id);
      if (!sig) {
        sector.signalIds.delete(id); // Cleanup ghost references
      } else {
        signals.push(sig);
      }
    }

    updateSector(sector, signals);
	updateAmbientLine(sector);
  }
}, 15000);
  // 4. Start Persistence Loop
  startSaveLoop(); // Starts the 60s save timer

  console.log("[SYSTEM] World is live and persistent.");
})();

app.use(express.static('public')); // Serves index.html (Acts 1-6)
app.use(express.static('static')); // Serves world.html (The Online Layer)

// This route lets you jump to the online world
app.get('/world', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'world.html'));
});