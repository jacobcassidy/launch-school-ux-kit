import { elements } from "../../shared/dom/dom.js";
import { toggleSidebar } from "./actions.js";
/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * @module features/sidebar/watch-sidebar-toggle
 */

const watchedSidebarToggleButtons = new WeakSet();

/**
 * Toggles the sidebar when the sidebar toggle button is clicked.
 */
export function watchSidebarToggleBtn() {
  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) {
    return;
  }

  if (watchedSidebarToggleButtons.has(sidebarToggleBtn)) return;
  watchedSidebarToggleButtons.add(sidebarToggleBtn);

  sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
}
