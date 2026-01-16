// app.js — Multiple save profiles, autosave after every choice, Continue loads last-used profile
// Fixed: restart button now works reliably with profile-aware restart logic
//
// Notes:
// - Profiles stored in localStorage under "apokalypsis_profiles_v1"
// - Last used profile name stored under "apokalypsis_last_profile_v1"
// - Autosave after every choice (saveCurrentProfile)
// - "Continue" behavior loads last-used profile on startup
// - Restart button presents profile-aware options: restart current profile (act) or restart entire game (clear all profiles)
//
// This is a full app.js file intended to replace the previous version in your build.

(function () {
  const storyEl = document.getElementById("story");
  const choicesEl = document.getElementById("choices");
  const restartBtn = document.getElementById("restart-btn");
  const readerToggleBtn = document.getElementById("reader-toggle");
  const titleLeft = document.getElementById("title-left"); // used to inject profile UI if present
  
  // PWA CONFIG: The keys for our local buffer
  const OFFLINE_QUEUE_KEY = "apokalupsis_offline_sync_v1";

  const hudStatsEl = document.getElementById("hud-stats");
  const hudFlagsEl = document.getElementById("hud-flags");
  const hudRepsEl = document.getElementById("hud-reps");
  const hudItemsEl = document.getElementById("hud-items");
  
  const RegretSystem = {
    // SOW: Call this in Act files (e.g., RegretSystem.sow('rushed'))
    sow: function(type) {
        if (!Engine.player.regretSeeds) Engine.player.regretSeeds = [];
        
        const delayMs = (12 + Math.random() * 36) * 3600 * 1000; // 12-48 hours
        const seed = {
            id: Date.now().toString(36),
            type: type,
            bloomTime: Date.now() + delayMs,
            resolved: false
        };

        Engine.player.regretSeeds.push(seed);
        saveCurrentProfile();
    },

    // REAP: The "Harvest" logic that renders the echo
    reap: function() {
        if (!Engine.player.regretSeeds) return;
        
        const now = Date.now();
        const ripeSeed = Engine.player.regretSeeds.find(s => !s.resolved && s.bloomTime <= now);

        if (ripeSeed) {
            ripeSeed.resolved = true;
            saveCurrentProfile();

            const echoes = {
                'rushed': "The system connects instantly. It feels... too easy.",
                'silence': "You hear a faint static loop. It sounds like a voice you ignored.",
                'default': "The air in the sector feels heavier than you remember."
            };

            const echoText = echoes[ripeSeed.type] || echoes['default'];
            
            // Create the UI element
            const ghostPara = document.createElement("p");
            ghostPara.className = "regret-echo"; // Style this in your CSS
            ghostPara.innerHTML = `<br><em>${echoText}</em>`;
            storyEl.appendChild(ghostPara);
        }
    }
};
// Expose it so Act scripts can use it
window.RegretSystem = RegretSystem;

  function clearChoices() { choicesEl.innerHTML = ""; }
  function createChoiceButton(label, onClick) {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = "▸ " + label;
    btn.onclick = onClick;
    return btn;
  }

  const Engine = window.Engine || { player: {} }; // Engine.applyChoice must exist in your environment
  if (!Engine) {
    console.error("Engine not defined; ensure engine.js loaded.");
    if (storyEl) storyEl.textContent = "Error: Engine not available. Check console.";
    return;
  }

  // -------------------------
  // Profile storage layer (localStorage)
  // -------------------------
  const PROFILES_KEY = "apokalypsis_profiles_v1";
  const LAST_PROFILE_KEY = "apokalypsis_last_profile_v1";

  function loadProfilesFromStorage() {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse profiles from storage:", err);
      return {};
    }
  }
  function saveProfilesToStorage(profiles) {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch (err) {
      console.error("Failed to write profiles to storage:", err);
    }
  }
  function getLastProfileName() {
    try { return localStorage.getItem(LAST_PROFILE_KEY); } catch (e) { return null; }
  }
  function setLastProfileName(name) {
    try { if (name) localStorage.setItem(LAST_PROFILE_KEY, name); else localStorage.removeItem(LAST_PROFILE_KEY);} catch (e) {}
  }

  // Profile shape:
  // { player: {...}, scene: "actX_sceneY", updated_at: ISOString, displayName: "Name" }

  let PROFILES = loadProfilesFromStorage();
  let currentProfileName = getLastProfileName() || null;

  function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj || {}));
  }

  function createProfileObjectFromEngine(displayName) {
    return {
      player: cloneDeep(Engine.player || {}),
      scene: currentSceneId || (Engine.player && Engine.player.scene) || null,
      updated_at: new Date().toISOString(),
      displayName: displayName || "Profile"
    };
  }

  function saveProfilesNow() {
    PROFILES = loadProfilesFromStorage();
    saveProfilesToStorage(PROFILES);
  }

  // -------------------------
  // THE NEW SYNC LOGIC
  // -------------------------

  /**
   * Upgraded Save Function: 
   * Tries to hit the server, but falls back to a queue if offline.
   */
  async function saveCurrentProfile() {
  // Defensive: ensure the app-level profile variable is present
  if (!currentProfileName || !PROFILES[currentProfileName]) return;

  // 1. Always save locally first (instant recovery)
  PROFILES[currentProfileName].scene = currentSceneId;
  saveProfilesToStorage(PROFILES);

  const dataToSync = {
    profileName: currentProfileName,
    playerData: Engine.player,
    timestamp: Date.now()
  };

  // 2. Try to sync with the server, otherwise queue for later
  if (navigator.onLine) {
    syncWithServer(dataToSync);
  } else {
    queueForLater(dataToSync);
  }
}

  async function syncWithServer(data) {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) console.log("[SYSTEM] Cloud Sync Successful.");
    } catch (e) {
      queueForLater(data); // If server is down but internet is up
    }
  }

  function queueForLater(data) {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || "[]");
    queue.push(data);
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    console.warn("[SYSTEM] Offline. Progress queued locally.");
  }

  /**
   * Listener: When internet returns, flush the queue
   */
  window.addEventListener('online', async () => {
    console.log("[SYSTEM] Connection restored. Flushing offline queue...");
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || "[]");
    
    if (queue.length > 0) {
      try {
        const response = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ events: queue })
        });
        if (response.ok) {
          localStorage.removeItem(OFFLINE_QUEUE_KEY);
          console.log("[SYSTEM] All offline progress synced to MongoDB.");
        }
      } catch (e) {
        console.error("[SYSTEM] Sync failed, will retry later.");
      }
    }
  });
  // -------------------------
  // Existing Navigation Logic (Updated to use the new save)
  // -------------------------

  function renderScene(sceneId) {
    const scene = currentAct.scenes[sceneId];
    if (!scene) return;
    currentSceneId = sceneId;

    // Trigger the save whenever a scene renders
    saveCurrentProfile();

    storyEl.innerHTML = "";
    const p = document.createElement("p");
    p.className = "scene-text";
    p.innerHTML = scene.text.replace(/\n/g, "<br>");
    storyEl.appendChild(p);
	
	// Trigger the Echo
    RegretSystem.reap();
	
    clearChoices();
    // (Replace the scene.choices.forEach(choice => { ... }) block in renderScene with this)
scene.choices.forEach(choice => {
  const btn = createChoiceButton(choice.label || "(no label)", () => {
    try {
      // Let the engine apply the choice (handles stats, flags, reputations, items, history, etc)
      if (typeof Engine.applyChoice === "function") {
        Engine.applyChoice(choice);
      } else {
        // fallback: if engine missing, be defensive and manually apply flags/stats (not ideal)
        if (choice.stats) {
          Engine.player.stats = Engine.player.stats || {};
          for (let k in choice.stats) {
            Engine.player.stats[k] = (Number(Engine.player.stats[k]) || 0) + (Number(choice.stats[k]) || 0);
          }
        }
        if (choice.flags) {
          Engine.player.flags = Engine.player.flags || [];
          choice.flags.forEach(f => { if (!Engine.player.flags.includes(f)) Engine.player.flags.push(f); });
        }
        if (choice.reputation) {
          Engine.player.reputations = Engine.player.reputations || [];
          if (!Engine.player.reputations.includes(choice.reputation)) Engine.player.reputations.push(choice.reputation);
        }
        if (choice.item) {
          Engine.player.items = Engine.player.items || [];
          if (!Engine.player.items.includes(choice.item)) Engine.player.items.push(choice.item);
        }
      }

      // Autosave immediately after the mutation
      saveCurrentProfile();
	  
	  // If this choice granted the Path_Noticed flag and player has no late_name, ask for it now
	const addedPath = (choice.flags || []).some(f => f === "Path_Noticed" || f === "path_noticed");
	const hasLateName = !!(Engine.player && Engine.player.late_name && Engine.player.late_name.trim().length > 0);
	if (addedPath && !hasLateName) {
	  try {
		// promptForLateName is defined earlier in app.js — this will show the modal/prompt
		promptForLateName(false);
		// After promptForLateName returns we update HUD and continue as normal.
		updateHUD();
	  } catch (e) {
		console.warn("Name prompt failed:", e);
	  }
	}

      const nextId = choice.next;

      if (choice.postText) {
        const renderedPost = applyTemplates((choice.postText || "").trim());
        storyEl.innerHTML = renderedPost;
        if (storyEl) storyEl.scrollTop = 0;
        clearChoices();
        const cont = createChoiceButton("Continue", () => {
          if (nextId && /^act[1-6]_start$/.test(nextId)) {
            const actIndex = nextId.match(/^act([1-6])_start$/)[1];
            const actKey = "act" + actIndex;
            if (!ACTS[actKey]) {
              const resolved = resolveAndSwitchActIfNeeded(nextId);
              if (resolved === null) return;
            } else {
              currentAct = ACTS[actKey];
              renderScene(ACTS[actKey].start);
              return;
            }
          }
          if (!nextId) {
            updateHUD();
            updateChoiceVisibilityBasedOnScroll();
            return;
          }
          const resolved = resolveAndSwitchActIfNeeded(nextId);
          if (resolved !== null) renderScene(resolved);
        });
        choicesEl.appendChild(cont);
        updateHUD();
        updateChoiceVisibilityBasedOnScroll();
        return;
      }

      if (!nextId) {
        console.warn("Choice has no next:", choice);
        updateHUD();
        updateChoiceVisibilityBasedOnScroll();
        return;
      }

      if (/^act[1-6]_start$/.test(nextId)) {
        const actIndex = nextId.match(/^act([1-6])_start$/)[1];
        const actKey = "act" + actIndex;
        if (!ACTS[actKey]) {
          const resolved = resolveAndSwitchActIfNeeded(nextId);
          if (resolved === null) return;
        } else {
          currentAct = ACTS[actKey];
          renderScene(ACTS[actKey].start);
          return;
        }
      }

      const resolvedNext = resolveAndSwitchActIfNeeded(nextId);
      if (resolvedNext !== null) renderScene(resolvedNext);
      else console.warn("Could not resolve next:", nextId);

    } catch (err) {
      console.error("Error applying choice:", err);
      alert("An error occurred. See console.");
    }
  });
  choicesEl.appendChild(btn);
});
  }

  function loadProfile(name) {
  try {
    const profiles = loadProfilesFromStorage();
    if (!profiles[name]) return false;
    const profile = profiles[name];

    // Keep Engine.player reference intact (engine.applyChoice uses internal reference).
    const newPlayer = cloneDeep(profile.player || {});
    if (!Engine.player) Engine.player = {};
    // Clear existing keys then copy new ones
    Object.keys(Engine.player).forEach(k => delete Engine.player[k]);
    Object.assign(Engine.player, newPlayer);

    currentProfileName = name;
    setLastProfileName(name);
    if (profile.scene) currentSceneId = profile.scene;
    profiles[name].updated_at = new Date().toISOString();
    saveProfilesToStorage(profiles);
    updateProfileUI();
    return true;
  } catch (err) {
    console.error("Failed to load profile:", err);
    return false;
  }
}

  function createProfile(name) {
    if (!name || !name.trim()) return null;
    name = String(name).trim();
    PROFILES = loadProfilesFromStorage();
    if (PROFILES[name]) return null; // exists
    PROFILES[name] = createProfileObjectFromEngine(name);
    saveProfilesToStorage(PROFILES);
    currentProfileName = name;
    setLastProfileName(name);
    updateProfileUI();
    return name;
  }

  function deleteProfile(name) {
    PROFILES = loadProfilesFromStorage();
    if (!PROFILES[name]) return false;
    delete PROFILES[name];
    saveProfilesToStorage(PROFILES);
    if (currentProfileName === name) {
      const keys = Object.keys(PROFILES);
      if (keys.length > 0) {
        currentProfileName = keys[0];
        loadProfile(currentProfileName);
      } else {
        currentProfileName = null;
        setLastProfileName(null);
      }
    }
    updateProfileUI();
    return true;
  }

  function listProfiles() {
    PROFILES = loadProfilesFromStorage();
    return Object.keys(PROFILES).map(k => ({ name: k, updated_at: PROFILES[k].updated_at }));
  }

  // -------------------------
  // UI: minimal profile selector in title-left (created dynamically if available)
  // -------------------------
  function updateProfileUI() {
    if (!titleLeft) return;
    let container = document.getElementById("profile-ui");
    if (!container) {
      container = document.createElement("div");
      container.id = "profile-ui";
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.gap = "0.5rem";
      titleLeft.appendChild(container);
    }
    container.innerHTML = "";

    // Profile select
    const select = document.createElement("select");
    select.id = "profile-select";
    const profiles = listProfiles();
    if (profiles.length === 0) {
      const opt = document.createElement("option");
      opt.textContent = "(no profiles)";
      opt.value = "";
      select.appendChild(opt);
    } else {
      profiles.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.name;
        opt.textContent = p.name;
        if (currentProfileName === p.name) opt.selected = true;
        select.appendChild(opt);
      });
    }
    select.addEventListener("change", (ev) => {
      const val = ev.target.value;
      if (val) {
        if (confirm(`Switch to profile "${val}"? Current profile will be autosaved.`)) {
          saveCurrentProfile();
          loadProfile(val);
          if (currentSceneId) renderScene(currentSceneId);
        } else {
          updateProfileUI();
        }
      }
    });
    container.appendChild(select);

    // New profile button
    const newBtn = document.createElement("button");
    newBtn.className = "small-btn";
    newBtn.textContent = "New profile";
    newBtn.onclick = () => {
      const name = prompt("New profile name:");
      if (!name) return;
      if (PROFILES[name]) {
        alert("Profile exists.");
        return;
      }
      saveCurrentProfile();
      createProfile(name);
      loadProfile(name);
      renderScene(currentSceneId);
    };
    container.appendChild(newBtn);

    // Delete profile button
    const delBtn = document.createElement("button");
    delBtn.className = "small-btn";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      if (!currentProfileName) { alert("No profile selected."); return; }
      if (!confirm(`Delete profile "${currentProfileName}"? This cannot be undone.`)) return;
      deleteProfile(currentProfileName);
      const keys = Object.keys(PROFILES);
      if (keys.length > 0) loadProfile(keys[0]);
      renderScene(currentSceneId);
    };
    container.appendChild(delBtn);

    // Show last-updated small label
    if (currentProfileName) {
      const info = document.createElement("div");
      info.style.fontSize = "0.78rem";
      info.style.opacity = 0.9;
      info.style.marginLeft = "0.4rem";
      const p = PROFILES[currentProfileName];
      info.textContent = `Loaded: ${currentProfileName}` + (p && p.updated_at ? ` • ${new Date(p.updated_at).toLocaleString()}` : "");
      container.appendChild(info);
    }
  }

  // -------------------------
  // Utility helpers (template, late-name prompt, identity seed)
  // -------------------------
  function applyTemplates(text) {
    if (!text || typeof text !== "string") return text;
    const nameRaw = (Engine.player && Engine.player.late_name) ? String(Engine.player.late_name).trim() : "";
    const nameForDisplay = nameRaw ? nameRaw.toUpperCase() : "[UNREGISTERED]";
    return text.replace(/{{\s*LATE_NAME\s*}}/g, nameForDisplay);
  }

  function promptForLateName(force = false) {
    try {
      const existing = Engine.player && Engine.player.late_name;
      if (existing && !force) return existing;

      const prevContent = storyEl ? storyEl.textContent : "";

      const statusBlock = [
        "SYSTEM IDENTITY: REGISTERED",
        "",
        "ROLE: [REDACTED]",
        "",
        "STATUS: UNAVOIDABLE"
      ].join("\n");

      if (storyEl) storyEl.textContent = statusBlock;
      clearChoices();
      updateHUD();
      updateChoiceVisibilityBasedOnScroll();

      let name = null;
      if (!force) {
        name = window.prompt("Enter the name you'll be known by (optional):", existing || "");
        if (name === null) {
          if (storyEl) storyEl.textContent = prevContent;
          updateHUD();
          updateChoiceVisibilityBasedOnScroll();
          return null;
        }
        name = name.trim();
      } else {
        while (true) {
          name = window.prompt("Enter your name (required):", existing || "");
          if (name === null) continue;
          name = name.trim();
          if (name.length > 0) break;
        }
      }

      if (!Engine.player) Engine.player = {};
      Engine.player.late_name = name || "";
      Engine.player.flags = Engine.player.flags || [];
      if (name && !Engine.player.flags.includes("late_name_ready")) Engine.player.flags.push("late_name_ready");

      // Autosave after name entry
      saveCurrentProfile();

      const confirmation = statusBlock + "\n\n[IDENTITY REGISTERED: " + (Engine.player.late_name || "").toUpperCase() + "]";
      if (storyEl) storyEl.textContent = confirmation;
      updateHUD();
      updateChoiceVisibilityBasedOnScroll();
      return Engine.player.late_name;
    } catch (err) {
      console.warn("Failed to prompt for late name:", err);
      return null;
    }
  }

  function generateIdentitySeed(player) {
    try {
      const obj = {
        stats: player.stats || {},
        flags: (player.flags || []).slice().sort(),
        alignment: player.alignment || null,
        reputations: (player.reputations || []).slice().sort()
      };
      const s = JSON.stringify(obj, Object.keys(obj).sort());
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        const ch = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0;
      }
      return "seed_" + Math.abs(hash).toString(16);
    } catch (err) {
      return "seed_unknown";
    }
  }

  function downloadMigrationPayload(name = "migration_payload.json") {
    const payload = {
      seed_identity: generateIdentitySeed(Engine.player),
      legacy_stats: Engine.player.stats,
      alignment: Engine.player.alignment,
      reputations: Engine.player.reputations || [],
      items: Engine.player.items || [],
      veil_depth: (Engine.player.flags || []).length,
      created_at: Engine.player.created_at || new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // -------------------------
  // Termination logic (protocols)
  // -------------------------
  function computeFriction(player) {
    const statSum = Object.values(player.stats || {}).reduce((s, v) => s + Number(v || 0), 0);
    const flagCount = (player.flags || []).length || 0;
    return statSum + flagCount;
  }

  function computeCore(player) {
    const flags = player.flags || [];
    if (flags.includes("team_loyalty") || flags.includes("acted_purge") || flags.includes("compliance")) return "LOYALTY";
    if (flags.includes("signed_full") || flags.includes("acted_report")) return "CHAOS";
    return "LOGIC";
  }

  function selectProtocol(player) {
    const flags = player.flags || [];
    let disruption = 0, compliance = 0, precision = 0;
    ["cmd_broadcast", "signed_full", "acted_delegate", "cmd_delegate", "acted_broadcast"].forEach(f => { if (flags.includes(f)) disruption += 3; });
    ["cmd_purge", "signed_clean", "team_loyalty", "compliance"].forEach(f => { if (flags.includes(f)) compliance += 3; });
    ["signed_dissent", "tactical_aggression", "prep_position", "verification", "act6_question"].forEach(f => { if (flags.includes(f)) precision += 2; });
    precision += (player.stats && player.stats.gnosis) || 0;
    disruption += (player.stats && player.stats.discovery) || 0;
    compliance += (player.stats && player.stats.authority) || 0;
    if (disruption >= compliance && disruption >= precision && disruption > 0) return "ALPHA";
    if (compliance >= disruption && compliance >= precision && compliance > 0) return "BETA";
    if (precision >= disruption && precision >= compliance && precision > 0) return "GAMMA";
    return computeCore(player) === "LOYALTY" ? "BETA" : "GAMMA";
  }

  function showSystemIDCard(protocol, friction, core) {
    clearChoices();
    document.documentElement.classList.remove("terminated-blackout");
    const lines = [
      "SYSTEM LOG: BOOK 1 ARCHIVED.",
      `TOTAL FRICTION: ${friction}`,
      `CORE PHILOSOPHY: ${core}`,
      "",
      "AWAITING BOOK 2 INITIALIZATION..."
    ];
    const html = `<div class="system-id-card"><pre>${lines.join("\n")}</pre></div>`;
    storyEl.innerHTML = applyTemplates(html);
    choicesEl.innerHTML = "";
    const dl = createChoiceButton("Download migration payload (JSON)", () => { downloadMigrationPayload("migration_payload_book1.json"); });
    const inspect = createChoiceButton("Inspect player (console)", () => { console.log("Player state:", Engine.player); alert("Player state logged to console."); });
    choicesEl.appendChild(dl);
    choicesEl.appendChild(inspect);
    updateHUD();
    choicesEl.style.display = "";
    // ensure final profile save is persisted for Book 2 usage
    saveCurrentProfile();
  }

  function runProtocolAlpha(player) {
    clearChoices();
    storyEl.textContent = "PROTOCOL ALPHA: THE EJECTION\n\nDATA DENSITY EXCEEDS LIMITS...\nSYSTEM SEIZURE IMMINENT.";
    storyEl.classList.add("glitch", "torn");
    updateHUD();
    setTimeout(() => {
      document.documentElement.classList.add("terminated-blackout");
      storyEl.textContent = "";
      storyEl.classList.remove("glitch", "torn");
      clearChoices();
      updateHUD();
      const ALPHA_BLACKOUT = 4200;
      setTimeout(() => {
        const friction = computeFriction(player);
        const core = computeCore(player);
        showSystemIDCard("ALPHA", friction, core);
      }, ALPHA_BLACKOUT);
    }, 1400);
  }

  function runProtocolBeta(player) {
    const friction = computeFriction(player);
    const core = computeCore(player);
    clearChoices();
    const cardLines = [
      "SYSTEM ID: READ-ONLY",
      "",
      "ROLE: PRIMARY COORDINATOR (READ-ONLY)",
      `TOTAL FRICTION: ${friction}`,
      `CORE PHILOSOPHY: ${core}`,
      "",
      "You can scroll and observe pending tasks. Interaction is locked."
    ];
    const html = `<div class="readonly-badge">READ-ONLY</div><div class="system-id-card"><pre>${cardLines.join("\n")}</pre><div id="beta-timer" style="margin-top:0.8rem;font-family:monospace;"></div></div>`;
    storyEl.innerHTML = html;
    choicesEl.innerHTML = "";
    updateHUD();
    choicesEl.style.display = "none";
    let seconds = 300;
    function formatTime(s) { const m = Math.floor(s/60).toString().padStart(2,"0"); const ss = (s%60).toString().padStart(2,"0"); return `${m}:${ss}`; }
    const timerEl = document.getElementById("beta-timer");
    if (timerEl) timerEl.textContent = `TIMER UNTIL RESET: ${formatTime(seconds)}`;
    const interval = setInterval(() => {
      seconds -= 1;
      if (timerEl) timerEl.textContent = `TIMER UNTIL RESET: ${formatTime(seconds)}`;
      if (seconds <= 0) {
        clearInterval(interval);
        showSystemIDCard("BETA", friction, computeCore(player));
      }
    }, 1000);
  }

  function runProtocolGamma(player) {
    clearChoices();
    const friction = computeFriction(player);
    const core = computeCore(player);
    const html = [
      "PROTOCOL GAMMA: THE OPERATOR",
      "",
      "SYSTEM CALIBRATING. WOULD YOU LIKE TO MONITOR THE HANDOVER?",
      "",
      "(A rare courtesy — choose YES to remain and watch, NO to step away.)"
    ].join("\n");
    storyEl.textContent = html;
    clearChoices();
    const yes = createChoiceButton("YES — Monitor the handover", () => {
      storyEl.textContent = "AWAITING RE-INITIALIZATION...\n\nMONITORING: SYSTEM HANDOVER STREAM\n\n(You watch the gears turn.)";
      clearChoices();
      updateHUD();
      setTimeout(() => {
        showSystemIDCard("GAMMA", friction, core);
      }, 3000);
    });
    const no = createChoiceButton("NO — Walk away", () => {
      showSystemIDCard("GAMMA", friction, core);
    });
    choicesEl.appendChild(yes);
    choicesEl.appendChild(no);
    updateHUD();
    choicesEl.style.display = "";
  }

  function runTerminationSequence() {
    const player = Engine.player || {};
    const protocol = selectProtocol(player);
    console.log("Selected termination protocol:", protocol);
    if (protocol === "ALPHA") runProtocolAlpha(player);
    else if (protocol === "BETA") runProtocolBeta(player);
    else runProtocolGamma(player);
  }

/// -------------------------
  // Act Registry (Fixed casing mismatch)
  // -------------------------
  const ACTS = {
    act1: window.act1 || window.ACT1,
    act2: window.act2 || window.ACT2,
    act3: window.act3 || window.ACT3,
    act4: window.act4 || window.ACT4,
    act5: window.act5 || window.ACT5,
    act6: window.act6 || window.ACT6
  };
  // -------------------------
  // Core rendering and choice handling (single place) — autosave after every choice
  // -------------------------
  let currentAct = window.act1 || null;
  let currentSceneId = (currentAct && currentAct.start) || null;

  function saveScene(sceneId) {
    if (typeof saveGame === "function") {
      if (currentAct && currentAct.id && currentAct.id.startsWith("act")) {
        const actNum = Number(currentAct.id.replace("act", ""));
        Engine.player.act = actNum || Engine.player.act;
      }
      saveGame({ ...Engine.player, scene: sceneId });
    }
    try {
      if (currentProfileName) {
        PROFILES = loadProfilesFromStorage();
        PROFILES[currentProfileName] = PROFILES[currentProfileName] || {};
        PROFILES[currentProfileName].player = cloneDeep(Engine.player);
        PROFILES[currentProfileName].scene = sceneId;
        PROFILES[currentProfileName].updated_at = new Date().toISOString();
        saveProfilesToStorage(PROFILES);
      }
    } catch (err) { /* ignore */ }
  }

  function findActForSceneId(sceneId) {
    if (!sceneId || typeof sceneId !== "string") return null;
    for (let key in ACTS) {
      const act = ACTS[key];
      if (!act || !act.scenes) continue;
      if (act.scenes[sceneId]) return act;
    }
    const m = sceneId.match(/^act([1-6])_/);
    if (m && ACTS["act" + m[1]]) return ACTS["act" + m[1]];
    return null;
  }

  function resolveAndSwitchActIfNeeded(nextId) {
    if (typeof nextId === "string" && /^act([1-6])_start$/.test(nextId)) {
      const actIndex = nextId.match(/^act([1-6])_start$/)[1];
      const actKey = "act" + actIndex;
      const act = ACTS[actKey];
      if (!act) {
        const msg = `Act ${actIndex} is not loaded in this web build.\n\nYou can download a migration payload to preserve your current progress, inspect the player state in the console, or clear the save and restart.`;
        storyEl.textContent = msg;
        clearChoices();
        const dl = createChoiceButton("Download migration payload", () => downloadMigrationPayload(`migration_payload_act${Engine.player.act || "current"}.json`));
        const inspect = createChoiceButton("Inspect player (console)", () => { console.log("Player state:", Engine.player); alert("Player state logged to console."); });
        const clear = createChoiceButton("Clear save & restart", () => { if (confirm("Clear save and restart from Act 1?")) { if (typeof clearSave === "function") clearSave(); resetPlayerToDefaults(1); currentAct = ACTS.act1; renderScene(currentAct.start); }});
        const close = createChoiceButton("Close (return)", () => { renderScene(currentSceneId); });
        choicesEl.appendChild(dl); choicesEl.appendChild(inspect); choicesEl.appendChild(clear); choicesEl.appendChild(close);
        updateHUD();
        choicesEl.style.display = "";
        return null;
      }
      currentAct = act;
      return act.start;
    }
    const owningAct = findActForSceneId(nextId);
    if (owningAct && owningAct !== currentAct) currentAct = owningAct;
    return nextId;
  }

  // applyEnterActions (multi-match)
  function applyEnterActions(scene) {
    if (!scene || !scene.enterActions || !Array.isArray(scene.enterActions)) return "";
    let appendTexts = [];
    let matchedAny = false;

    for (let act of scene.enterActions) {
      if (act.default) continue;
      let matched = false;
      if (act.ifAny && Array.isArray(act.ifAny)) matched = act.ifAny.some(f => (Engine.player.flags || []).includes(f));
      if (!matched && act.ifFlag) {
        if (Array.isArray(act.ifFlag)) matched = act.ifFlag.some(f => (Engine.player.flags || []).includes(f));
        else matched = (Engine.player.flags || []).includes(act.ifFlag);
      }
      if (!matched && act.ifAll && Array.isArray(act.ifAll)) matched = act.ifAll.every(f => (Engine.player.flags || []).includes(f));
      if (matched) {
        matchedAny = true;
        if (act.addFlags && Array.isArray(act.addFlags)) {
          Engine.player.flags = Engine.player.flags || [];
          act.addFlags.forEach(f => { if (!Engine.player.flags.includes(f)) Engine.player.flags.push(f); });
        }
        if (act.addReputations && Array.isArray(act.addReputations)) {
          Engine.player.reputations = Engine.player.reputations || [];
          act.addReputations.forEach(r => { if (!Engine.player.reputations.includes(r)) Engine.player.reputations.push(r); });
        }
        if (act.addItems && Array.isArray(act.addItems)) {
          Engine.player.items = Engine.player.items || [];
          act.addItems.forEach(i => { if (!Engine.player.items.includes(i)) Engine.player.items.push(i); });
        }
        if (act.addStats && typeof act.addStats === "object") {
          Engine.player.stats = Engine.player.stats || {};
          for (let k in act.addStats) Engine.player.stats[k] = (Number(Engine.player.stats[k]) || 0) + (Number(act.addStats[k]) || 0);
        }
        if (act.text) appendTexts.push(act.text);
      }
    }

    if (!matchedAny) {
      for (let act of scene.enterActions) {
        if (act.default) {
          if (act.addFlags && Array.isArray(act.addFlags)) {
            Engine.player.flags = Engine.player.flags || [];
            act.addFlags.forEach(f => { if (!Engine.player.flags.includes(f)) Engine.player.flags.push(f); });
          }
          if (act.addReputations && Array.isArray(act.addReputations)) {
            Engine.player.reputations = Engine.player.reputations || [];
            act.addReputations.forEach(r => { if (!Engine.player.reputations.includes(r)) Engine.player.reputations.push(r); });
          }
          if (act.addItems && Array.isArray(act.addItems)) {
            Engine.player.items = Engine.player.items || [];
            act.addItems.forEach(i => { if (!Engine.player.items.includes(i)) Engine.player.items.push(i); });
          }
          if (act.addStats && typeof act.addStats === "object") {
            Engine.player.stats = Engine.player.stats || {};
            for (let k in act.addStats) {
              Engine.player.stats[k] = (Number(Engine.player.stats[k]) || 0) + (Number(act.addStats[k]) || 0);
            }
          }
          if (act.text) appendTexts.push(act.text);
          break;
        }
      }
    }

    if (typeof saveGame === "function") saveGame(Engine.player);
    saveCurrentProfile();
    return appendTexts.join("\n\n");
  }

  // Rendering and choice handling (core)
  function updateHUD() {
    const p = Engine.player || {};
    const stats = p.stats || {};
    const flags = p.flags || [];
    const reps = p.reputations || [];
    const items = p.items || [];

    const statOrder = [
      { key: "sunesis", label: "Perception" },
      { key: "gnosis", label: "Knowledge" },
      { key: "skepticism", label: "Defense" },
      { key: "authority", label: "Authority" },
      { key: "discovery", label: "Discovery" }
    ];
    if (hudStatsEl) {
      hudStatsEl.innerHTML = "";
      statOrder.forEach(s => {
        const el = document.createElement("div");
        el.className = "hud-stat";
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = s.label;
        const value = document.createElement("div");
        value.className = "value";
        value.textContent = Number(stats[s.key] || 0);
        el.appendChild(label);
        el.appendChild(value);
        hudStatsEl.appendChild(el);
      });
    }

    if (hudFlagsEl) {
      hudFlagsEl.innerHTML = "";
      if (flags.length > 0) {
        const label = document.createElement("div");
        label.className = "section-label";
        label.textContent = "Flags:";
        hudFlagsEl.appendChild(label);
        flags.slice(0, 40).forEach(f => {
          const chip = document.createElement("span");
          chip.className = "flag-chip";
          chip.textContent = f;
          hudFlagsEl.appendChild(chip);
        });
        if (flags.length > 40) {
          const more = document.createElement("span");
          more.className = "flag-chip";
          more.textContent = `+${flags.length - 40} more`;
          hudFlagsEl.appendChild(more);
        }
      } else hudFlagsEl.textContent = "";
    }

    if (hudRepsEl) {
      hudRepsEl.innerHTML = "";
      if (reps.length > 0) {
        const label = document.createElement("div");
        label.className = "section-label";
        label.textContent = "Reputations:";
        hudRepsEl.appendChild(label);
        reps.forEach(r => {
          const chip = document.createElement("span");
          chip.className = "flag-chip";
          chip.textContent = r;
          hudRepsEl.appendChild(chip);
        });
      } else hudRepsEl.textContent = "";
    }

    if (hudItemsEl) {
      hudItemsEl.innerHTML = "";
      if (items.length > 0) {
        const label = document.createElement("div");
        label.className = "section-label";
        label.textContent = "Items:";
        hudItemsEl.appendChild(label);
        items.forEach(it => {
          const chip = document.createElement("span");
          chip.className = "flag-chip";
          chip.textContent = it;
          hudItemsEl.appendChild(chip);
        });
      } else hudItemsEl.textContent = "";
    }
  }

  // Reader mode helpers
  const READER_KEY = "apokalypsis_reader_mode";
  function isReaderMode() {
    try { return localStorage.getItem(READER_KEY) === "1"; } catch (e) { return false; }
  }
  function setReaderMode(enabled) {
    try {
      if (enabled) {
        document.documentElement.classList.add("reader-mode");
        if (readerToggleBtn) readerToggleBtn.classList.add("active");
        localStorage.setItem(READER_KEY, "1");
        updateChoiceVisibilityBasedOnScroll();
        if (storyEl) storyEl.focus();
      } else {
        document.documentElement.classList.remove("reader-mode");
        if (readerToggleBtn) readerToggleBtn.classList.remove("active");
        localStorage.removeItem(READER_KEY);
        updateChoiceVisibilityBasedOnScroll();
        const first = choicesEl.querySelector(".choice");
        if (first) first.focus();
      }
    } catch (err) { console.warn("Failed to toggle reader mode:", err); }
  }
  function isStoryAtBottom(threshold = 12) {
    if (!storyEl) return true;
    const { scrollTop, scrollHeight, clientHeight } = storyEl;
    return (scrollHeight - (scrollTop + clientHeight) <= threshold);
  }
  function updateChoiceVisibilityBasedOnScroll() {
    if (!choicesEl) return;
    if (isReaderMode()) {
      if (isStoryAtBottom(8)) choicesEl.style.display = "";
      else choicesEl.style.display = "none";
    } else {
      choicesEl.style.display = "";
    }
  }
  if (readerToggleBtn) readerToggleBtn.addEventListener("click", () => setReaderMode(!isReaderMode()));
  window.addEventListener("keydown", (ev) => {
    const tag = document.activeElement && document.activeElement.tagName && document.activeElement.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (ev.key.toLowerCase() === "r") {
      ev.preventDefault();
      setReaderMode(!isReaderMode());
    } else if (ev.key === "Escape") {
      if (isReaderMode()) setReaderMode(false);
    }
  });
  if (storyEl) storyEl.addEventListener("scroll", () => { requestAnimationFrame(updateChoiceVisibilityBasedOnScroll); });

  // The main renderScene function (uses templates, enterActions, and autosave after choices)
  function renderScene(sceneId) {
    if (!sceneId) return;
    const owningAct = findActForSceneId(sceneId);
    if (owningAct && owningAct !== currentAct) currentAct = owningAct;
    let scene = currentAct && currentAct.scenes ? currentAct.scenes[sceneId] : null;

    if (!scene) {
      if (/^act[1-6]_start$/.test(sceneId)) {
        const resolved = resolveAndSwitchActIfNeeded(sceneId);
        if (resolved === null) return;
        sceneId = resolved;
      }
      scene = currentAct && currentAct.scenes ? currentAct.scenes[sceneId] : null;
      if (!scene) {
        if (sceneId === "book1_summary") {
          runTerminationSequence();
          return;
        }
        storyEl.textContent = "Scene not found: " + sceneId;
        clearChoices();
        updateHUD();
        updateChoiceVisibilityBasedOnScroll();
        return;
      }
    }

    currentSceneId = sceneId;
    saveScene(sceneId);

    let content = scene.text ? scene.text.trim() : "";

    const branchText = applyEnterActions(scene);
    if (branchText) content += "\n\n" + branchText;

    if (scene.conditionalText) {
      scene.conditionalText.forEach(ct => {
        const stat = ct.if && ct.if.stat;
        const gte = ct.if && ct.if.gte ? ct.if.gte : 0;
        const val = (Engine.player.stats && Engine.player.stats[stat]) || 0;
        if (val >= gte) content += "\n\n" + ct.text.trim();
      });
    }
    if (scene.veil && (Engine.player.flags || []).includes("veil_seeded")) {
      content += "\n\n" + scene.veil.revealedText.trim();
    }
    if (scene.microVeil) {
      content += "\n\n" + (scene.microVeil.revealedText || "").trim();
    }

    content = applyTemplates(content);

    // Enable HTML rendering for styles
	storyEl.innerHTML = content;
    if (storyEl) storyEl.scrollTop = 0;

    const flags = Engine.player && Engine.player.flags ? Engine.player.flags : [];
    const hasLateName = Engine.player && Engine.player.late_name && Engine.player.late_name.trim().length > 0;
    if (sceneId === "act1_transition" && (flags.includes("Path_Noticed") || flags.includes("path_noticed")) && !hasLateName) {
      promptForLateName(false);
    }
    if (sceneId === "act6_scene3" && !(flags.includes("Path_Noticed") || flags.includes("path_noticed")) && !hasLateName) {
      promptForLateName(true);
      if (Engine.player && Engine.player.late_name) {
        storyEl.textContent = storyEl.textContent + `\n\n[IDENTITY REGISTERED: ${Engine.player.late_name.toUpperCase()}]`;
      }
    }

    clearChoices();

    if (scene.autoNext) {
      const cont = createChoiceButton("Continue", () => {
        const dest = resolveAndSwitchActIfNeeded(scene.autoNext);
        if (dest !== null) renderScene(dest);
      });
      choicesEl.appendChild(cont);
      updateHUD();
      updateChoiceVisibilityBasedOnScroll();
      return;
    }

    if (!scene.choices || scene.choices.length === 0) {
      const cont = createChoiceButton("Continue", () => {
        if (scene.next) {
          const dest = resolveAndSwitchActIfNeeded(scene.next);
          if (dest !== null) renderScene(dest);
        } else {
          updateHUD();
          updateChoiceVisibilityBasedOnScroll();
        }
      });
      choicesEl.appendChild(cont);
      updateHUD();
      updateChoiceVisibilityBasedOnScroll();
      return;
    }

    scene.choices.forEach(choice => {
      const btn = createChoiceButton(choice.label || "(no label)", () => {
        try {
          Engine.applyChoice(choice);

          // Autosave immediately after the choice mutation
          saveCurrentProfile();

          const nextId = choice.next;

          if (choice.postText) {
            const renderedPost = applyTemplates((choice.postText || "").trim());
            storyEl.innerHTML = renderedPost;
            if (storyEl) storyEl.scrollTop = 0;
            clearChoices();
            const cont = createChoiceButton("Continue", () => {
              if (nextId && /^act[1-6]_start$/.test(nextId)) {
                const actIndex = nextId.match(/^act([1-6])_start$/)[1];
                const actKey = "act" + actIndex;
                if (!ACTS[actKey]) {
                  const resolved = resolveAndSwitchActIfNeeded(nextId);
                  if (resolved === null) return;
                } else {
                  currentAct = ACTS[actKey];
                  renderScene(ACTS[actKey].start);
                  return;
                }
              }
              if (!nextId) {
                updateHUD();
                updateChoiceVisibilityBasedOnScroll();
                return;
              }
              const resolved = resolveAndSwitchActIfNeeded(nextId);
              if (resolved !== null) renderScene(resolved);
            });
            choicesEl.appendChild(cont);
            updateHUD();
            updateChoiceVisibilityBasedOnScroll();
            return;
          }

          if (!nextId) {
            console.warn("Choice has no next:", choice);
            updateHUD();
            updateChoiceVisibilityBasedOnScroll();
            return;
          }

          if (/^act[1-6]_start$/.test(nextId)) {
            const actIndex = nextId.match(/^act([1-6])_start$/)[1];
            const actKey = "act" + actIndex;
            if (!ACTS[actKey]) {
              const resolved = resolveAndSwitchActIfNeeded(nextId);
              if (resolved === null) return;
            } else {
              currentAct = ACTS[actKey];
              renderScene(ACTS[actKey].start);
              return;
            }
          }

          const resolvedNext = resolveAndSwitchActIfNeeded(nextId);
          if (resolvedNext !== null) renderScene(resolvedNext);
          else console.warn("Could not resolve next:", nextId);

        } catch (err) {
          console.error("Error applying choice:", err);
          alert("An error occurred. See console.");
        }
      });
      choicesEl.appendChild(btn);
    });

    updateHUD();
    updateChoiceVisibilityBasedOnScroll();
  }

  // -------------------------
  // Restart logic (profile-aware) — FIX: ensure restart button reliably attached after init
  // -------------------------
  function resetPlayerToDefaults(desiredAct = 1) {
    const defaultPlayer = {
      stats: { sunesis: 0, gnosis: 0, skepticism: 0, authority: 0, discovery: 0 },
      flags: [], 
      reputations: [], 
      items: [], 
      history: [], 
      alignment: null, 
      act: desiredAct, 
      late_name: null, 
      created_at: new Date().toISOString(),
      regretSeeds: [] // <--- ADD THIS LINE
    };
    if (Engine && Engine.player) {
      for (const k of Object.keys(Engine.player)) delete Engine.player[k];
      Object.assign(Engine.player, defaultPlayer);
    } else {
      window.Engine.player = defaultPlayer;
    }
    if (typeof saveGame === "function") saveGame(Engine.player);
  }

  function restartGamePrompt() {
    // Profile-aware restart dialog
    try {
      const actNum = currentAct && currentAct.id && /^act([1-6])$/.test(currentAct.id) ? Number(currentAct.id.replace("act", "")) : (Engine.player && Engine.player.act) || 1;
      const hasMultipleActs = !!(ACTS.act2);

      if (!currentProfileName) {
        // no profile — simple restart confirmation (clear any legacy save)
        if (!confirm("Restart the game from the beginning? This will clear your save and return to Act 1.")) return;
        // clear profiles entirely
        PROFILES = {};
        saveProfilesToStorage(PROFILES);
        setLastProfileName(null);
        resetPlayerToDefaults(1);
        currentAct = ACTS.act1;
        currentSceneId = currentAct.start;
        createProfile("Default");
        loadProfile("Default");
        renderScene(currentSceneId);
        return;
      }

      // Offer options: restart current profile act or restart entire game
      const promptText = `Restart options for profile "${currentProfileName}":\n1 = Restart current act (${actNum}) from its beginning (clears progress in this profile's act)\n2 = Restart the entire game (clear all profiles)\nEnter 1 or 2 (Cancel to abort)`;
      const choice = window.prompt(promptText, "1");
      if (choice === null) return;
      if (choice.trim() === "1") {
        if (!confirm(`Restart from the beginning of Act ${actNum} in profile "${currentProfileName}"? This will clear saved progress for this profile's act.`)) return;
        // reset player to defaults but keep profile name
        resetPlayerToDefaults(actNum);
        // overwrite profile with fresh default player (act set to actNum)
        PROFILES = loadProfilesFromStorage();
        PROFILES[currentProfileName] = {
          player: cloneDeep(Engine.player),
          scene: (ACTS["act" + actNum] ? ACTS["act" + actNum].start : currentSceneId),
          updated_at: new Date().toISOString(),
          displayName: currentProfileName
        };
        saveProfilesToStorage(PROFILES);
        setLastProfileName(currentProfileName);
        if (ACTS["act" + actNum]) {
          currentAct = ACTS["act" + actNum];
          currentSceneId = currentAct.start;
        } else {
          currentSceneId = PROFILES[currentProfileName].scene;
        }
        renderScene(currentSceneId);
        return;
      }
      if (choice.trim() === "2") {
        if (!confirm("Restart the entire game from Act 1? This will clear ALL profiles.")) return;
        PROFILES = {};
        saveProfilesToStorage(PROFILES);
        setLastProfileName(null);
        resetPlayerToDefaults(1);
        createProfile("Default");
        loadProfile("Default");
        currentAct = ACTS.act1;
        currentSceneId = currentAct.start;
        renderScene(currentSceneId);
        return;
      }
    } catch (err) {
      console.error("Error in restartGamePrompt:", err);
      alert("Restart failed. See console for details.");
    }
  }

  function initProfilesAndLoad() {
    PROFILES = loadProfilesFromStorage();
    const last = getLastProfileName();
    if (last && PROFILES[last]) {
      loadProfile(last);
      if (PROFILES[last].scene) currentSceneId = PROFILES[last].scene;
    } else {
      // If there is a legacy saveLoad function, try it
      try {
        if (typeof loadSave === "function") {
          const legacy = loadSave();
          if (legacy && legacy.scene) {
			  const newPlayer = cloneDeep(legacy);
			  if (!Engine.player) Engine.player = {};
			  Object.keys(Engine.player).forEach(k => delete Engine.player[k]);
			  Object.assign(Engine.player, newPlayer);
			  currentSceneId = legacy.scene;
			}
        }
      } catch (e) {}
      // ensure there is at least one profile
      if (!Object.keys(PROFILES).length) {
        createProfile("Default");
        loadProfile("Default");
      }
    }
    updateProfileUI();
  }

  // Start initialization, then attach restart button listener AFTER init to ensure it works
  initProfilesAndLoad();

  if (restartBtn) restartBtn.addEventListener("click", restartGamePrompt);

  if (!currentSceneId && currentAct) currentSceneId = currentAct.start;
  renderScene(currentSceneId);

window.addEventListener('online', async () => {
  console.log("[SYSTEM] Connection restored. Synchronizing data...");
  
  const saveKey = 'apokalupsis_offline_queue';
  const queue = JSON.parse(localStorage.getItem(saveKey) || "[]");

  if (queue.length > 0) {
    try {
      // Send the entire backlog to the server
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: queue })
      });

      if (response.ok) {
        console.log("[SYSTEM] Sync complete. Local queue cleared.");
        localStorage.removeItem(saveKey);
      }
    } catch (err) {
      console.error("[SYSTEM] Sync failed. Will retry next time connection is stable.");
    }
  }
});

  // Expose helpers for debugging
  window.__profiles = () => loadProfilesFromStorage();
  window.__currentProfile = () => currentProfileName;
  window.__saveProfileNow = () => saveCurrentProfile();
  window.__switchProfile = (n) => loadProfile(n);

})();
