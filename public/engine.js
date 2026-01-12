// engine.js — game engine (player state + applyChoice)
// Exposed as window.Engine for the app to use.
window.Engine = (function () {
  // loadSave may return the saved player object directly (we store the player object)
  const saved = (typeof loadSave === "function" ? loadSave() : null) || null;

  const defaultPlayer = {
    stats: { sunesis: 0, gnosis: 0, skepticism: 0, authority: 0, discovery: 0 },
    flags: [],
    reputations: [],
    items: [],
    history: [],
    alignment: null,
    act: 1,
    late_name: null
  };

  const player = saved || defaultPlayer;

  function ensureStats(obj) {
    obj.stats = obj.stats || {};
    const keys = ["sunesis", "gnosis", "skepticism", "authority", "discovery"];
    keys.forEach(k => {
      if (typeof obj.stats[k] !== "number") obj.stats[k] = 0;
    });
  }

  ensureStats(player);

  function applyChoice(choice = {}) {
    try {
      console.log("Engine.applyChoice:", choice?.id ?? "(no id)", choice);

      // history
      player.history = player.history || [];
      if (choice.id) player.history.push(choice.id);

      // stats
      if (choice.stats) {
        player.stats = player.stats || {};
        for (let k in choice.stats) {
          if (!Object.prototype.hasOwnProperty.call(player.stats, k)) player.stats[k] = 0;
          const add = Number(choice.stats[k]) || 0;
          player.stats[k] += add;
        }
      }

      // flags (dedupe)
      if (choice.flags) {
        player.flags = player.flags || [];
        choice.flags.forEach(f => {
          if (!player.flags.includes(f)) player.flags.push(f);
        });
      }

      // reputations
      if (choice.reputation) {
        player.reputations = player.reputations || [];
        if (!player.reputations.includes(choice.reputation)) player.reputations.push(choice.reputation);
      }

      // items
      if (choice.item) {
        player.items = player.items || [];
        if (!player.items.includes(choice.item)) player.items.push(choice.item);
      }

      // alignment, late_name
      if (choice.alignment) player.alignment = choice.alignment;
      if (choice.late_name) player.late_name = choice.late_name;

      // custom triggers (if any): allow trigger -> set flags for simple compatibility
      if (choice.triggers) {
        player.flags = player.flags || [];
        choice.triggers.forEach(t => {
          if (!player.flags.includes(t)) player.flags.push(t);
        });
      }

      // persist
      if (typeof saveGame === "function") {
        saveGame(player);
      } else {
        console.warn("saveGame not found; skipping save");
      }
    } catch (err) {
      console.error("Error in Engine.applyChoice:", err);
      throw err;
    }
  }

  return {
    player,
    applyChoice
  };
})();
