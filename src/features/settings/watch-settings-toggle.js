/**
 * WATCH SETTINGS TOGGLE BUTTON
 * @module features/settings/watch-settings-toggle
 */

import { elements } from "../../shared/dom/elements.js";
import { toggleSettings } from "./actions.js";

const watchedSettingsToggleButtons = new WeakSet();

/**
 * Toggles the Settings Menu visibility when the settings toggle button is clicked.
 */
export function watchSettingsToggleButton(options) {
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsToggleBtn) {
    return;
  }

  if (watchedSettingsToggleButtons.has(settingsToggleBtn)) return;
  watchedSettingsToggleButtons.add(settingsToggleBtn);

  settingsToggleBtn.addEventListener("click", () => toggleSettings(options));
}
