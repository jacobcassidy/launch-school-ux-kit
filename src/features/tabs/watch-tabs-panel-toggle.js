/**
 * WATCH TABS PANEL TOGGLE BUTTON
 * @module features/tabs/watch-tabs-panel-toggle
 */

import { elements } from "../../shared/dom/elements.js";
import { toggleTabsPanel } from "./actions.js";

const watchedTabsPanelToggleButtons = new WeakSet();

/**
 * Binds the current injected tabs-panel toggle once to change panel visibility.
 *
 * @returns {void}
 */
export function watchTabsPanelToggleButton() {
  const tabsPanelToggleBtn = elements.injected.tabsPanelToggleButton;
  if (!tabsPanelToggleBtn) {
    return;
  }

  if (watchedTabsPanelToggleButtons.has(tabsPanelToggleBtn)) return;
  watchedTabsPanelToggleButtons.add(tabsPanelToggleBtn);

  tabsPanelToggleBtn.addEventListener(
    "click",
    /**
     * Toggles tabs-panel visibility from its injected header control.
     *
     * @returns {void}
     */
    () => toggleTabsPanel(),
  );
}
