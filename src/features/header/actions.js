/**
 * HEADER ACTIONS
 * @module features/header/actions
 */

import { elements } from "../../shared/dom/elements.js";
import { headerState, setIsHeaderHidden } from "./state.js";

/**
 * Shows the custom header and persists its visible state.
 *
 * @returns {void}
 */
export function showHeader() {
  setIsHeaderHidden(false);
}

/**
 * Hides the custom header, removes it from keyboard navigation, and persists the preference.
 *
 * @returns {void}
 */
export function hideHeader() {
  setIsHeaderHidden(true);
}

/**
 * Toggles header visibility and closes settings when hiding the header.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideSettings Closes the settings menu.
 * @returns {void}
 */
export function toggleHeader({ hideSettings }) {
  if (headerState.isHidden) {
    showHeader();
  } else {
    if (elements.injected.settingsMenu?.classList.contains("active")) hideSettings();
    hideHeader();
  }
}
