/**
 * SYNC INJECTED ELEMENTS STATE
 * @module shared/dom/injected-elements-state
 */

import {
  setElementHeader,
  setElementSettingsMenu,
  setElementSettingsToggleButton,
  setElementSidebarToggleButton,
  setElementTabsPanelToggleButton,
} from "./setters.js";

/**
 * Discovers current injected UI elements and stores their references, clearing absent controls to null.
 *
 * @returns {void}
 */
export function syncInjectedElementsState() {
  const header = document.querySelector(".site-header");
  const settingsMenu = document.querySelector(".settings-container");
  const settingsToggleBtn = document.querySelector(".btn--toggle-settings");
  const sidebarToggleBtn = document.querySelector(".btn--toggle-sidebar");
  const tabsPanelToggleBtn = document.querySelector(".btn--toggle-tabs-panel");

  setElementHeader(header);
  setElementSettingsMenu(settingsMenu);
  setElementSettingsToggleButton(settingsToggleBtn);
  setElementSidebarToggleButton(sidebarToggleBtn);
  setElementTabsPanelToggleButton(tabsPanelToggleBtn);
}
