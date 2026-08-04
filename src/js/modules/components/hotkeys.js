/**
 * HOTKEYS
 * @module components/hotkeys
 */

// Import Utils
import { states } from "../utils/state.js";

/**
 * INJECT HOTKEYS SECTION
 * Injects the hotkeys as a section of the settings container.
 */
export function injectHotkeysSection() {
  const settingsContainer = document.querySelector(".settings-container");
  if (!settingsContainer) return;

  const createHotkeysSection = () => {
    const hotkeysSectionEl = document.createElement("section");
    hotkeysSectionEl.classList.add("hotkeys-section");

    const hotkeysSectionTitleEl = document.createElement("h3");
    hotkeysSectionTitleEl.classList.add("section-title");
    hotkeysSectionTitleEl.innerText = "Current Page Hotkeys";
    hotkeysSectionEl.appendChild(hotkeysSectionTitleEl);

    const modifiersWrapperEl = document.createElement("div");
    modifiersWrapperEl.classList.add("settings-list-wrapper");

    for (const [modifierListKey, modifierListObj] of Object.entries(states.hotkeys)) {
      let modifierKey;
      if (modifierListKey === "cmdOnly") modifierKey = null;
      if (modifierListKey === "cmdCtrl") modifierKey = "Ctrl";

      const modifierListEl = document.createElement("ul");
      modifierListEl.classList.add("settings-list");
      const modifierListTitleEl = document.createElement("li");
      modifierListTitleEl.classList.add("settings-list__title");
      modifierListTitleEl.innerText = `${modifierKey} Shortcuts`;
      modifierListEl.appendChild(modifierListTitleEl);

      for (const hotkeyObj of Object.values(modifierListObj)) {
        const hotkeyItemEl = document.createElement("li");
        hotkeyItemEl.classList.add("settings-list__item");

        const hotkeyItemKeyEl = document.createElement("div");
        hotkeyItemKeyEl.classList.add("setting-status", "hotkey-shortcut");

        const keys = ["Cmd", modifierKey, hotkeyObj.symbol];

        keys.forEach((key, index) => {
          const keySpan = document.createElement("span");
          keySpan.classList.add("key");
          keySpan.innerText = key;
          hotkeyItemKeyEl.appendChild(keySpan);

          // Add a `+` symbol after each key, except the last key.
          const isLast = index === keys.length - 1;
          if (isLast) return;
          const plusSpan = document.createElement("span");
          plusSpan.innerText = "+";
          hotkeyItemKeyEl.appendChild(plusSpan);
        });

        hotkeyItemEl.appendChild(hotkeyItemKeyEl);

        const hotkeyItemLabelEl = document.createElement("div");
        hotkeyItemLabelEl.classList.add("setting-desc", "hotkey-label");
        hotkeyItemLabelEl.innerText = hotkeyObj.label;
        hotkeyItemEl.appendChild(hotkeyItemLabelEl);

        modifierListEl.appendChild(hotkeyItemEl);
      }

      modifiersWrapperEl.appendChild(modifierListEl);
    }

    hotkeysSectionEl.appendChild(modifiersWrapperEl);

    return hotkeysSectionEl;
  };

  settingsContainer.appendChild(createHotkeysSection());
}
