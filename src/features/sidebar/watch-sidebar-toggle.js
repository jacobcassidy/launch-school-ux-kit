/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * @module features/sidebar/watch-sidebar-toggle
 */

import { elements } from "../../shared/dom/elements.js";
import { toggleSidebar } from "./actions.js";

const watchedSidebarToggleButtons = new WeakSet();

/**
 * Binds the current injected sidebar-toggle button once to toggle native sidebar collapse.
 *
 * @returns {void}
 */
export function watchSidebarToggleButton() {
  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) {
    return;
  }

  if (watchedSidebarToggleButtons.has(sidebarToggleBtn)) return;
  watchedSidebarToggleButtons.add(sidebarToggleBtn);

  sidebarToggleBtn.addEventListener(
    "click",
    /**
     * Toggles the current native sidebar from its injected header control.
     *
     * @returns {void}
     */
    () => toggleSidebar(),
  );
}
