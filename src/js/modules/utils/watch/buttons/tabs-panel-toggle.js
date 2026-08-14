/**
 * WATCH TABS PANEL TOGGLE BUTTON
 * @module utils/watch/buttons/tabs-panel-toggle
 */

// Import utils
import { elements } from "../../state";
import { toggleTabsPanel } from "../../helpers";

/**
 * Toggles the Tabs Panel visibility on button click.
 */
export function watchTabsPanelToggleBtn() {
  // colorLog.run("Running watchTabsPanelToggleBtn()");

  const tabsPanelToggleBtn = elements.injected.tabsPanelToggleButton;
  if (!tabsPanelToggleBtn) {
    // colorLog.detail("No tabs panel toggle button found on this page.");
    return;
  }

  if (tabsPanelToggleBtn.dataset.tabsPanelToggleBtnEventBound) {
    // colorLog.detail("Tabs Panel Toggle Button watch already exist. Exited watchTabsPanelToggleBtn().");
    return;
  }
  tabsPanelToggleBtn.dataset.tabsPanelToggleBtnEventBound = "true";

  tabsPanelToggleBtn.addEventListener("click", () => toggleTabsPanel());
}
