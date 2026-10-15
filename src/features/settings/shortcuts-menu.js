/**
 * SHORTCUTS MENU
 * @module features/settings/shortcuts-menu
 */

import { createSettingsSection } from "./settings-menu.js";
import { shortcuts, getShortcutKeys } from "../shortcuts/index.js";

/**
 * Replaces the current-page shortcuts section with entries from the current registry when settings are present.
 *
 * @returns {void}
 */
export function injectShortcutsSection() {
  const settingsMenu = document.querySelector(".settings-container");
  if (!settingsMenu) return;

  settingsMenu.querySelectorAll(".current-page-added-shortcuts-section").forEach(
    /**
     * Removes the previous current-page shortcuts section before rebuilding it.
     *
     * @param {HTMLElement} section Existing shortcuts settings section.
     * @returns {void}
     */
    (section) => section.remove(),
  );
  settingsMenu.appendChild(createShortcutsSection());
}

/**
 * Builds a settings section listing registered shortcut labels and platform-specific key names.
 *
 * @returns {HTMLElement} Detached shortcut section.
 */
function createShortcutsSection() {
  const shortcutsSectionEl = createSettingsSection("Current Page Added Shortcuts");
  const shortcutsListEl = shortcutsSectionEl.querySelector(".settings-list");

  for (const [modifierListKey, modifierListObj] of Object.entries(shortcuts)) {
    for (const shortcutObj of Object.values(modifierListObj)) {
      const shortcutItemEl = document.createElement("li");
      shortcutItemEl.className = "settings-list__item";

      const shortcutItemKeyEl = document.createElement("div");
      shortcutItemKeyEl.className = "setting-status shortcut-keys";

      const keys = getShortcutKeys(modifierListKey, shortcutObj.symbol);
      const keyNames = getShortcutKeys(modifierListKey, shortcutObj.symbol, { symbols: false });
      shortcutItemKeyEl.setAttribute("role", "img");
      shortcutItemKeyEl.setAttribute("aria-label", keyNames.join(" "));

      keys.forEach(
        /**
         * Appends one formatted key label to the shortcut display.
         *
         * @param {string} key Platform-specific key label.
         * @returns {void}
         */
        (key) => {
          const keySpan = document.createElement("span");
          keySpan.className = "key";
          if (Array.from(key).length > 1) keySpan.classList.add("key--text");
          keySpan.innerText = key;
          shortcutItemKeyEl.appendChild(keySpan);
        },
      );

      shortcutItemEl.appendChild(shortcutItemKeyEl);

      const shortcutItemLabelEl = document.createElement("div");
      shortcutItemLabelEl.className = "setting-desc shortcut-label";
      shortcutItemLabelEl.innerText = shortcutObj.label;
      shortcutItemEl.appendChild(shortcutItemLabelEl);

      shortcutsListEl.appendChild(shortcutItemEl);
    }
  }

  return shortcutsSectionEl;
}
