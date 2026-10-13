/**
 * TABS PANEL TOGGLE BUTTON
 * @module features/tabs/tabs-panel-toggle
 */

import { icons } from "../../shared/icons.js";
import { elements } from "../../shared/dom/elements.js";

/**
 * Appends a tabs-panel toggle when the native panel exists; click behavior is bound separately.
 *
 * @param {HTMLElement} containerEl Header container receiving the button.
 * @returns {void}
 */
export function injectTabsPanelToggleButton(containerEl) {
  if (!elements.native.tabsPanel) return;
  containerEl.appendChild(createTabsPanelToggleButton());
}

/**
 * Builds a tabs-panel toggle with its icon and descriptive title.
 *
 * @returns {HTMLButtonElement} Detached tabs-panel toggle.
 */
function createTabsPanelToggleButton() {
  const tabsPanelToggleButtonEl = document.createElement("button");
  tabsPanelToggleButtonEl.classList.add("site-header__button", "btn--toggle-tabs-panel");
  tabsPanelToggleButtonEl.title = "Toggle Tabs Panel Visibility";
  tabsPanelToggleButtonEl.appendChild(icons.headerIcons.tabsPanel());

  return tabsPanelToggleButtonEl;
}
