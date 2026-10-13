/**
 * SIDEBAR STATE
 * @module features/sidebar/state
 */

import { elements } from "../../shared/dom/elements.js";
export const sidebarState = {
  isSettingSidebarHiddenHeadersOn: sessionStorage.getItem("isSettingSidebarHiddenHeadersOn") === "true",
  isSettingSidebarShrinkOn: sessionStorage.getItem("isSettingSidebarShrinkOn") === "true",
};

/**
 * Clicks the appropriate native sidebar control only when its current checkbox state differs from the requested state.
 *
 * @param {boolean} value Whether the native sidebar should be collapsed.
 * @returns {void}
 */
export function setIsSidebarCollapsed(value) {
  const sidebarCollapseCheckbox = document.querySelector("#navbar-collapsor");

  // This page does not include the native sidebar control.
  if (!sidebarCollapseCheckbox) {
    return;
  }

  const isSidebarCollapsed = sidebarCollapseCheckbox.checked;
  if (isSidebarCollapsed !== value) {
    const sidebarButton = document.querySelector(value ? "#navbar-collapse" : "#navbar-expand");
    if (!sidebarButton) return;

    sidebarButton.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    );
    sidebarButton.click();
  }
}

/**
 * Applies the sidebar section-header preference when a sidebar exists and always stores it in state and session storage.
 *
 * @param {boolean} value Whether expanded-sidebar section headers should be hidden.
 * @returns {void}
 */
export function setSettingSidebarHiddenHeaders(value) {
  if (value === true) {
    elements.native.sidebar?.classList.add("hide-section-headers");
  } else {
    elements.native.sidebar?.classList.remove("hide-section-headers");
  }

  sidebarState.isSettingSidebarHiddenHeadersOn = value;
  sessionStorage.setItem("isSettingSidebarHiddenHeadersOn", value);
}

/**
 * Applies the collapsed-sidebar sizing preference when a sidebar exists and always stores it in state and session storage.
 *
 * @param {boolean} value Whether a collapsed sidebar should shrink instead of hiding.
 * @returns {void}
 */
export function setSettingSidebarShrink(value) {
  if (value === true) {
    elements.native.sidebar?.classList.add("shrink");
  } else {
    elements.native.sidebar?.classList.remove("shrink");
  }

  sidebarState.isSettingSidebarShrinkOn = value;
  sessionStorage.setItem("isSettingSidebarShrinkOn", value);
}

/**
 * Reapplies enabled sidebar preferences to the current native sidebar when present.
 *
 * @returns {void}
 */
export function restoreSidebarState() {
  const sidebar = elements.native.sidebar;
  if (sidebar && sidebarState.isSettingSidebarHiddenHeadersOn) sidebar.classList.add("hide-section-headers");
  if (sidebar && sidebarState.isSettingSidebarShrinkOn) sidebar.classList.add("shrink");
}
