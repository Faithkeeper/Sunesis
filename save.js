// save.js — simple localStorage-backed save system
const SAVE_KEY = "apokalypsis_save_v1";

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("loadSave: failed to parse save data:", err);
    return null;
  }
}

function saveGame(data) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error("saveGame: failed to store save data:", err);
    return false;
  }
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

// expose globally (function declarations are global but be explicit)
window.loadSave = loadSave;
window.saveGame = saveGame;
window.clearSave = clearSave;