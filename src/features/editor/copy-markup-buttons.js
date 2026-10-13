/**
 * COPY MARKUP BUTTONS
 * @module features/editor/copy-markup-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Adds plain-button styling and the copy/checkmark icon pair to markup-copy controls.
 *
 * @param {NodeListOf<HTMLButtonElement>|HTMLButtonElement[]} [btns] Buttons to decorate; defaults to all native markup-copy buttons.
 * @returns {void}
 */
export function updateCopyMarkupButtons(btns = document.querySelectorAll(".markup-copy-block button")) {
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.copy factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.copy(),

    /**
     * Creates a fresh icon using the panelIcons.checkmark factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.checkmark(),
  ];
  const btnClasses = ["btn--plain", "btn--copy-markup"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
