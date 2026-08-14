/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * @module utils/watch/buttons/sidebar-toggle
 */

// Import utils
import { elements } from "../../state";
import { toggleSidebar } from "../../helpers";

/**
 * Toggles the sidebar when the sidebar toggle button is clicked.
 */
export function watchSidebarToggleBtn() {
  // colorLog.run("Running watchSidebarToggleBtn()");

  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) {
    // colorLog.detail("No sidebar toggle button found.");
    return;
  }

  if (sidebarToggleBtn.dataset.sidebarToggleBtnEventBound) {
    // colorLog.detail("Sidebar Toggle Button watch already exist. Exited watchSidebarToggleBtn().");
    return;
  }
  sidebarToggleBtn.dataset.sidebarToggleBtnEventBound = "true";

  sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
}
