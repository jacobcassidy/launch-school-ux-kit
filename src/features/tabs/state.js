/**
 * TABS STATE
 * @module features/tabs/state
 */

import { elements } from "../../shared/dom/elements.js";
export const tabsPanelState = { isHidden: sessionStorage.getItem("isTabsPanelHidden") === "true" };

/**
 * Applies and stores tabs-panel visibility, synchronizing its toggle, accessibility, and content width.
 *
 * @param {boolean} value Whether the tabs panel should be hidden.
 * @returns {void}
 */
export function setIsTabsPanelHidden(value) {
  const tabsPanel = elements.native.tabsPanel;
  const contentPanel = elements.native.contentPanel;
  const tabsPanelToggleButton = elements.injected.tabsPanelToggleButton;

  tabsPanelState.isHidden = value;
  sessionStorage.setItem("isTabsPanelHidden", value);
  if (value) tabsPanelToggleButton?.classList.remove("active");
  else tabsPanelToggleButton?.classList.add("active");

  if (!tabsPanel) {
    contentPanel?.classList.remove("half-width");
    return;
  }

  tabsPanel.inert = value;
  tabsPanel.setAttribute("aria-hidden", String(value));

  if (value) {
    tabsPanel.classList.add("hidden", "panel-collapsed");
    tabsPanel.classList.remove("is-active", "half-width");
    contentPanel?.classList.remove("half-width");
  } else {
    contentPanel?.classList.add("half-width");
    tabsPanel.classList.remove("hidden", "panel-collapsed");
    tabsPanel.classList.add("is-active", "half-width");
  }
}

/**
 * Reapplies the stored tabs-panel visibility preference when the native panel is present.
 *
 * @returns {void}
 */
export function restoreTabsState() {
  if (elements.native.tabsPanel) setIsTabsPanelHidden(tabsPanelState.isHidden);
}
