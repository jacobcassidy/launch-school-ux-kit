/**
 * HOTKEYS
 * @module components/hotkeys
 */

// Import Utils
import { states } from "../utils/state.js";
import { createNewSettingsSection } from "./settings.js";

/**
 * INJECT HOTKEYS SECTION
 * Injects the hotkeys as a section of the settings container.
 */
export function injectHotkeysSection() {
  const settingsContainer = document.querySelector(".settings-container");
  if (!settingsContainer) return;

  const createHotkeysSection = () => {
    const hotkeysSectionEl = createNewSettingsSection("Current Page Hotkeys");
    const hotkeysListEl = hotkeysSectionEl.querySelector(".settings-list");

    for (const [modifierListKey, modifierListObj] of Object.entries(states.hotkeys)) {
      let modifierKey;
      if (modifierListKey === "cmdOnly") modifierKey = null;
      if (modifierListKey === "cmdShift") modifierKey = "Shift";
      if (modifierListKey === "cmdCtrl") modifierKey = "Ctrl";

      for (const hotkeyObj of Object.values(modifierListObj)) {
        const hotkeyItemEl = document.createElement("li");
        hotkeyItemEl.className = "settings-list__item";

        const hotkeyItemKeyEl = document.createElement("div");
        hotkeyItemKeyEl.className = "setting-status hotkey-shortcut";

        const keys = modifierKey ? ["Cmd", modifierKey, hotkeyObj.symbol] : ["Cmd", hotkeyObj.symbol];

        keys.forEach((key, index) => {
          const keySpan = document.createElement("span");
          keySpan.className = "key";
          keySpan.innerText = key;
          hotkeyItemKeyEl.appendChild(keySpan);

          // Add a `+` symbol after each key, except the last key.
          const isLast = index === keys.length - 1;
          if (isLast) return;
          const plusSpan = document.createElement("span");
          plusSpan.className = "plus";
          plusSpan.innerText = "+";
          hotkeyItemKeyEl.appendChild(plusSpan);
        });

        hotkeyItemEl.appendChild(hotkeyItemKeyEl);

        const hotkeyItemLabelEl = document.createElement("div");
        hotkeyItemLabelEl.className = "setting-desc hotkey-label";
        hotkeyItemLabelEl.innerText = hotkeyObj.label;
        hotkeyItemEl.appendChild(hotkeyItemLabelEl);

        hotkeysListEl.appendChild(hotkeyItemEl);
      }
    }

    return hotkeysSectionEl;
  };

  settingsContainer.appendChild(createHotkeysSection());
}
