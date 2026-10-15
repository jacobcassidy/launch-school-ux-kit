/**
 * HEADER STATE
 * @module features/header/state
 */

import { elements } from "../../shared/dom/elements.js";
export const headerState = { isHidden: sessionStorage.getItem("isHeaderHidden") === "true" };

/**
 * Applies header visibility and accessibility state, blurs hidden controls, and persists the preference.
 *
 * @param {boolean} value Whether the header should be hidden.
 * @returns {void}
 */
export function setIsHeaderHidden(value) {
  const header = elements.injected.header;
  if (value && header?.contains(document.activeElement)) document.activeElement.blur();
  header?.classList.toggle("is-hidden", value);
  if (header) {
    header.inert = value;
    header.setAttribute("aria-hidden", String(value));
  }

  headerState.isHidden = value;
  sessionStorage.setItem("isHeaderHidden", value);
}

/**
 * Reapplies the stored hidden-header preference when a custom header is present.
 *
 * @returns {void}
 */
export function restoreHeaderState() {
  if (elements.injected.header && headerState.isHidden) setIsHeaderHidden(true);
}
