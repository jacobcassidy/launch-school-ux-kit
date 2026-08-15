/**
 * WATCH SETTINGS TOGGLE BUTTON
 * @module utils/watch/buttons/settings-toggle
 */

// Import utils
import { elements } from "../../state";
import { toggleSettings } from "../../helpers";

/**
 * Toggles the Settings Menu visibility when the settings toggle button is clicked.
 */
export function watchSettingsToggleBtn() {
  // colorLog.run("Running watchSettingsToggleBtn()");
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsToggleBtn) {
    // colorLog.detail("No settings menu toggle button found.");
    return;
  }

  if (settingsToggleBtn.dataset.settingsToggleBtnEventBound) {
    // colorLog.detail("Settings Menu Toggle Button watch already exist. Exited watchSettingsToggleBtn().");
    return;
  }
  settingsToggleBtn.dataset.settingsToggleBtnEventBound = "true";

  settingsToggleBtn.addEventListener("click", () => toggleSettings());
}
