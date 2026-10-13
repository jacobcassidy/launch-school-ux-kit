/**
 * SHORTCUT TOOLTIPS
 * @module features/shortcuts/shortcut-tooltips
 */

import { shortcuts } from "./state.js";
import { getShortcutKeys } from "./platform.js";

const previousTooltips = new Map();

/**
 * Restores earlier added shortcut text and displays current shortcuts in tab tooltips or button titles while preserving aria-labels.
 *
 * @returns {void}
 */
export function syncShortcutTooltips() {
  // Restore only text we added, preserving any native label changes.
  previousTooltips.forEach(
    /**
     * Restores prior tooltip or title text only when the previously injected text is still present.
     *
     * @param {object} previous Tracked tooltip text from the earlier synchronization.
     * @param {HTMLElement|null} previous.tooltip Tab tooltip when used instead of a button title.
     * @param {string|null} previous.originalTitle Button title before shortcut text was added.
     * @param {string} previous.label Original displayed label.
     * @param {string} previous.text Previously injected shortcut text.
     * @param {HTMLElement} button Associated control whose text may need restoring.
     * @returns {void}
     */
    ({ tooltip, originalTitle, label, text }, button) => {
      if (tooltip) {
        if (tooltip.textContent === text) tooltip.textContent = label;
      } else if (button.getAttribute("title") === text) {
        if (originalTitle === null) button.removeAttribute("title");
        else button.setAttribute("title", originalTitle);
      }
    },
  );
  previousTooltips.clear();

  const buttonShortcuts = new Map();
  for (const [modifier, modifierShortcuts] of Object.entries(shortcuts)) {
    for (const { symbol, label, buttons = [] } of Object.values(modifierShortcuts)) {
      const keys = getShortcutKeys(modifier, symbol);
      const shortcut = modifier === "enterOnly" ? keys.join("") : keys.join("").toUpperCase();
      buttons.forEach(
        /**
         * Accumulates a shortcut label for a non-null associated control.
         *
         * @param {HTMLElement|null} button Control associated with the current shortcut.
         * @returns {void}
         */
        (button) => {
          if (!button) return;
          if (!buttonShortcuts.has(button)) buttonShortcuts.set(button, { label, shortcuts: new Set() });
          buttonShortcuts.get(button).shortcuts.add(shortcut);
        },
      );
    }
  }

  buttonShortcuts.forEach(
    /**
     * Updates a control's tab tooltip or title with current shortcut labels and records the text for later restoration.
     *
     * @param {object} entry Shortcut labels collected for this control.
     * @param {string} entry.label Fallback action label.
     * @param {Set<string>} entry.shortcuts Formatted shortcut key combinations.
     * @param {HTMLElement} button Control receiving the shortcut text.
     * @returns {void}
     */
    ({ label: fallbackLabel, shortcuts }, button) => {
      const isTab = button.classList.contains("tab-button");
      const tooltip = isTab ? document.querySelector(`.tab-tooltip-${button.getAttribute("data-tab")}`) : null;
      if (isTab && !tooltip) return;

      const originalTitle =
        button.getAttribute("title")?.replace(/ \((?:(?:CMD|CTRL)\+[^)]*|[⌘⌃⇧⎇][^)]*|Enter)\)$/, "") ?? null;
      const label = originalTitle || button.getAttribute("aria-label") || button.textContent.trim() || fallbackLabel;
      const shortcutText = `(${[...shortcuts].join(" or ")})`;
      const text = `${label} ${shortcutText}`;
      if (tooltip) {
        const labelEl = document.createElement("span");
        labelEl.className = "tooltip-label";
        labelEl.textContent = `${label} `;
        const shortcutEl = document.createElement("span");
        shortcutEl.className = "tooltip-shortcut";
        shortcutEl.textContent = shortcutText;
        tooltip.replaceChildren(labelEl, shortcutEl);
      } else button.setAttribute("title", text);
      previousTooltips.set(button, { tooltip, originalTitle, label, text });
    },
  );
}
