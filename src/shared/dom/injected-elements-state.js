import {
  setElementHeader,
  setElementSettingsMenu,
  setElementSettingsToggleBtn,
  setElementSidebarToggleButton,
  setElementTabsPanelToggleButton,
} from "./setters.js";
/**
 * SYNC INJECTED ELEMENTS STATE
 * @module shared/dom/injected-elements-state
 */

/**
 * Sets the states properties for the script's injected DOM elements.
 */
export function syncInjectedElementsState() {
  const header = document.querySelector(".site-header");
  const settingsMenu = document.querySelector(".settings-container");
  const settingsToggleBtn = document.querySelector(".btn--toggle-settings");
  const sidebarToggleBtn = document.querySelector(".btn--toggle-sidebar");
  const tabsPanelToggleBtn = document.querySelector(".btn--toggle-tabs-panel");

  setElementHeader(header);
  setElementSettingsMenu(settingsMenu);
  setElementSettingsToggleBtn(settingsToggleBtn);
  setElementSidebarToggleButton(sidebarToggleBtn);
  setElementTabsPanelToggleButton(tabsPanelToggleBtn);
}
