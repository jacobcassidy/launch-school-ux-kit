/**
 * SIDEBAR ACTIONS
 * @module features/sidebar/actions
 */

import { setIsSidebarCollapsed } from "./state.js";

/**
 * Expands the native sidebar if its collapse control is available.
 *
 * @returns {void}
 */
export function showSidebar() {
  setIsSidebarCollapsed(false);
}

/**
 * Collapses the native sidebar if its collapse control is available.
 *
 * @returns {void}
 */
export function hideSidebar() {
  setIsSidebarCollapsed(true);
}

/**
 * Toggles sidebar collapse according to the current native checkbox state.
 *
 * @returns {void}
 */
export function toggleSidebar() {
  const sidebarCheckbox = document.querySelector("#navbar-collapsor");
  if (!sidebarCheckbox) return;

  if (sidebarCheckbox.checked) {
    showSidebar();
  } else {
    hideSidebar();
  }
}
