/**
 * SIDEBAR TOGGLE BUTTON
 * @module features/sidebar/sidebar-toggle
 */

import { icons } from "../../shared/icons.js";

/**
 * Appends a sidebar-toggle button when the page has a native sidebar; click behavior is bound separately.
 *
 * @param {HTMLElement} containerEl Header container receiving the button.
 * @returns {void}
 */
export function injectSidebarToggleButton(containerEl) {
  const hasNativeSidebar = !!document.querySelector(".nav-drawer");
  if (!hasNativeSidebar) return;

  containerEl.appendChild(createSidebarToggleButton());
}

/**
 * Builds a sidebar-toggle button containing the open and close icon pair.
 *
 * @returns {HTMLButtonElement} Detached sidebar-toggle button.
 */
function createSidebarToggleButton() {
  const sidebarToggleButtonEl = document.createElement("button");
  sidebarToggleButtonEl.classList.add("site-header__button", "btn--toggle-sidebar");
  sidebarToggleButtonEl.title = "Toggle Sidebar Visibility";

  const sidebarOpenIconEl = icons.headerIcons.sidebarOpen();
  sidebarOpenIconEl.classList.add("icon--sidebar-open");

  const sidebarCloseIconEl = icons.headerIcons.sidebarClose();
  sidebarCloseIconEl.classList.add("icon--sidebar-close");

  sidebarToggleButtonEl.appendChild(sidebarOpenIconEl);
  sidebarToggleButtonEl.appendChild(sidebarCloseIconEl);

  return sidebarToggleButtonEl;
}
