/**
 * COPY CODE BUTTONS
 * @module features/editor/copy-code-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Adds the plain-button class and copy icon to native copy-code controls.
 *
 * @returns {void}
 */
export function updateCopyCodeButtons() {
  const btns = document.querySelectorAll(".btn-copy-code");
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.copy factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.copy(),
  ];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
