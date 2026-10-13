/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * @module features/sidebar/watch-sidebar-toggle
 */

import { elements } from "../../shared/dom/elements.js";
import { toggleSidebar } from "./actions.js";

const watchedSidebarToggleButtons = new WeakSet();

/**
 * Toggles the sidebar when the sidebar toggle button is clicked.
 */
export function watchSidebarToggleButton() {
  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) {
    return;
  }

  if (watchedSidebarToggleButtons.has(sidebarToggleBtn)) return;
  watchedSidebarToggleButtons.add(sidebarToggleBtn);

  sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
}
