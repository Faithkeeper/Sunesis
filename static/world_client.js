// world_client.js

const WorldRegretSystem = {
    reap: function() {
        // Access the player data shared with app.js
        const player = window.Engine?.player;
        if (!player || !player.regretSeeds) return;

        const now = Date.now();
        // Look for a seed that is ready but not yet seen
        const ripeSeed = player.regretSeeds.find(s => !s.resolved && s.bloomTime <= now);

        if (ripeSeed) {
            ripeSeed.resolved = true;
            
            // Persist the resolution so it doesn't double-trigger
            if (window.saveCurrentProfile) window.saveCurrentProfile();

            const echoes = {
                'rushed': "The system connects instantly. It feels... too easy.",
                'silence': "You hear a faint static loop. It sounds like a voice you ignored.",
                'disconnect': "Everything seems functional. Yet something is missing.",
                'default': "The air in the sector feels heavier than you remember."
            };

            const echoText = echoes[ripeSeed.type] || echoes['default'];
            this.injectEcho(echoText);
        }
    },

    injectEcho: function(text) {
        // In the World, we inject the message into the Global Feed 
        // but style it specifically for the individual player.
        const feed = document.getElementById('global-feed');
        if (feed) {
            const echoEl = document.createElement('div');
            echoEl.className = 'feed-item regret-echo-world';
            echoEl.innerHTML = `<em>${text}</em>`;
            
            // Insert at the top of the feed
            feed.prepend(echoEl);
        }
    }
};

// Hook into your existing poller to check for regrets every 30 seconds
setInterval(() => {
    WorldRegretSystem.reap();
}, 30000);

window.currentSector = { rotDepth: 0, textVariance: 1 }; // Default safety state

async function syncSectorState() {
    const res = await fetch('/api/sector/current'); // Create this route in Express
    window.currentSector = await res.json();
}
syncSectorState();

let lastRenderedText = "";
let lastRotState = "healthy"; // healthy | rotting

// --- STEP 4: LATENCY AS NARRATIVE ---
async function fetchWithNarrativeLag(url, options) {
    // 1. Get current rot (mocked or from previous state)
    const rot = window.currentSector?.rotDepth || 0;
    
    // 2. Calculate Delay (0ms to 800ms)
    const delay = Math.floor(rot * 800);
    
    if (delay > 200) {
        document.body.classList.add("lag-spike"); // Optional visual cue
    }

    await new Promise(resolve => setTimeout(resolve, delay));
    
    document.body.classList.remove("lag-spike");
    return fetch(url, options);
}

// world_client.js

async function initializeSector(id) {
    const response = await fetch('/api/world/enter-sector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectorId: id, playerName: Engine.player.name })
    });
    const data = await response.json();

    // 1. Update the Text
    document.getElementById('world-description').innerText = data.description;

    // 2. Inject the UI Change (Invisible)
    if (data.state === 'unstable') {
        document.body.classList.add('world-unstable');
        applyFeedDistortion();
    }
}

function applyFeedDistortion() {
    // 3. UI Micro-change: Slower fade-in for signals
    const feed = document.getElementById('global-feed');
    feed.style.transition = "opacity 2.5s ease"; // Standard is likely 0.5s
    
    // 4. Feed Distortion: The "Echo"
    // We intercept incoming signals and occasionally ghost one
    window.addEventListener('new-signal', (e) => {
        if (Math.random() > 0.85) {
            setTimeout(() => {
                renderSignal(e.detail, true); // True flag adds a 'ghost' CSS class
            }, 4000);
        }
    });
}

// --- STEP 2: TEXT VARIANCE (BOREDOM ENGINE) ---
function processTextVariance(text, sector) {
    // High rot (1.0) = High chance to just repeat the last thing you saw
    // "Nothing changes here."
    const variance = sector.textVariance; // 1.0 (clear) -> 0.4 (repetitive)
    
    if (Math.random() > variance) {
        console.log("[WORLD] Text repetition triggered by Rot");
        return lastRenderedText || text; 
    }
    
    lastRenderedText = text;
    return text;
}

// --- STEP 3: SIGNAL PRESENTATION (VERB DEGRADATION) ---
function renderSignalButtons(signal, sector) {
    const rot = sector.rotDepth;
    const container = document.createElement("div");
    container.className = "signal-actions";

    // Mappings
    const verbs = {
        observe:   { low: "Look closer",  med: "Stare",    high: "—" },
        interfere: { low: "Act",          med: "Touch",    high: "Push" },
        ignore:    { low: "Let it pass",  med: "Wait",     high: "Ignore" }
    };

    // Determine Rot Level
    let level = "low";
    if (rot > 0.4) level = "med";
    if (rot > 0.8) level = "high";

    // Render Buttons
    Object.keys(verbs).forEach(actionKey => {
        let label = verbs[actionKey][level];

        // Deep Rot: Chance to lose a verb entirely
        if (rot > 0.7 && Math.random() < 0.3) {
            return; // Button simply doesn't exist
        }

        // Sterile Rot: Text is flat, action is guaranteed but feels empty
        if (rot > 0.9) {
            label = "..."; 
        }

        const btn = document.createElement("button");
        btn.innerText = label;
        btn.onclick = () => handleSignalInteract(signal.id, actionKey);
		
		btn.onclick = async () => {
		await fetchWithNarrativeLag('/api/signal/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            signalId: sig.id,
            action: 'observe' // or 'interfere'
        })
    });
    syncSectorState(); // Refresh the world state after interacting
};
        
        // CSS Degradation
        if (rot > 0.5) btn.style.opacity = Math.random() * 0.5 + 0.5;
        
        container.appendChild(btn);
    });

    return container;
}

// --- STEP 7: HEALING CONFIRMATION ---
function checkHealing(sector) {
    const currentRotState = sector.rotDepth > 0.3 ? "rotting" : "healthy";

    // Transition: Rotting -> Healthy
    if (lastRotState === "rotting" && currentRotState === "healthy") {
        renderSystemMessage("The place feels clearer than it used to.");
    }

    lastRotState = currentRotState;
}

function renderSystemMessage(msg) {
    const el = document.createElement("div");
    el.className = "system-message fade-in";
    el.innerText = msg;
    document.getElementById("story").appendChild(el);
}

function startFeedPoller() {
    setInterval(async () => {
        try {
            const res = await fetchWithNarrativeLag('/api/feed');
            const data = await res.json();
            renderFeed(data.feed);
        } catch (e) {
            console.log("Feed signal lost...");
        }
    }, 5000); // Pulse every 5s
}

function renderFeed(events) {
    const container = document.getElementById('global-feed');
    // Only take top 5 to prevent DOM bloat
    const visibleEvents = events.slice(0, 5); 
    
    container.innerHTML = visibleEvents.map(e => `
        <div class="feed-item ${e.tone}">
            ${e.text}
        </div>
    `).join('');
}

// Call startFeedPoller() on init
