import { elements } from "../../shared/dom/dom.js";
import { toggleTabsPanel } from "./actions.js";
/**
 * WATCH TABS PANEL TOGGLE BUTTON
 * @module features/tabs/watch-tabs-panel-toggle
 */

const watchedTabsPanelToggleButtons = new WeakSet();

/**
 * Toggles the Tabs Panel visibility on button click.
 */
export function watchTabsPanelToggleBtn() {
  const tabsPanelToggleBtn = elements.injected.tabsPanelToggleButton;
  if (!tabsPanelToggleBtn) {
    return;
  }

  if (watchedTabsPanelToggleButtons.has(tabsPanelToggleBtn)) return;
  watchedTabsPanelToggleButtons.add(tabsPanelToggleBtn);

  tabsPanelToggleBtn.addEventListener("click", () => toggleTabsPanel());
}
