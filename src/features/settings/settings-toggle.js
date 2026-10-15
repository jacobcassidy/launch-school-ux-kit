/**
 * SETTINGS TOGGLE BUTTON
 * @module features/settings/settings-toggle
 */

import { icons } from "../../shared/icons.js";

/**
 * Creates and appends the accessible settings-toggle control; click behavior is bound separately.
 *
 * @param {HTMLElement} containerEl Header container receiving the button.
 * @returns {void}
 */
export function injectSettingsToggleButton(containerEl) {
  containerEl.appendChild(createSettingsToggleButton());
}

/**
 * Builds a settings-toggle button with its icon and menu accessibility attributes.
 *
 * @returns {HTMLButtonElement} Detached settings-toggle button.
 */
function createSettingsToggleButton() {
  const settingsToggleButtonEl = document.createElement("button");
  settingsToggleButtonEl.classList.add("site-header__button", "btn--toggle-settings", "has-dropdown");
  settingsToggleButtonEl.title = "Toggle Settings Visibility";
  settingsToggleButtonEl.setAttribute("aria-label", "Toggle Settings Visibility");
  settingsToggleButtonEl.setAttribute("aria-controls", "ls-ux-settings-menu");
  settingsToggleButtonEl.setAttribute("aria-expanded", "false");
  settingsToggleButtonEl.appendChild(icons.headerIcons.settings());

  return settingsToggleButtonEl;
}
