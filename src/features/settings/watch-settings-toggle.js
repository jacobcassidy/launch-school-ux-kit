/**
 * WATCH SETTINGS TOGGLE BUTTON
 * @module features/settings/watch-settings-toggle
 */

import { elements } from "../../shared/dom/elements.js";
import { toggleSettings } from "./actions.js";

const watchedSettingsToggleButtons = new WeakSet();

/**
 * Binds the current settings-toggle button once to open or close its menu.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideTocMenu Closes the native table-of-contents menu.
 * @returns {void}
 */
export function watchSettingsToggleButton(options) {
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsToggleBtn) {
    return;
  }

  if (watchedSettingsToggleButtons.has(settingsToggleBtn)) return;
  watchedSettingsToggleButtons.add(settingsToggleBtn);

  settingsToggleBtn.addEventListener(
    "click",
    /**
     * Toggles settings using the supplied TOC dismissal dependency.
     *
     * @returns {void}
     */
    () => toggleSettings(options),
  );
}
