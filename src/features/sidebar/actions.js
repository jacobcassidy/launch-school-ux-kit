/**
 * SIDEBAR ACTIONS
 * @module features/sidebar/actions
 */

import { setIsSidebarCollapsed } from "./state.js";
export function showSidebar() {
  setIsSidebarCollapsed(false);
}

export function hideSidebar() {
  setIsSidebarCollapsed(true);
}

export function toggleSidebar() {
  const sidebarCheckbox = document.querySelector("#navbar-collapsor");
  if (!sidebarCheckbox) return;

  if (sidebarCheckbox.checked) {
    showSidebar();
  } else {
    hideSidebar();
  }
}
