/**
 * COPY MARKUP BUTTONS
 * @module features/editor/copy-markup-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Updates the copy markup button styles and icon.
 */
export function updateCopyMarkupButtons(btns = document.querySelectorAll(".markup-copy-block button")) {
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.copy(), () => icons.panelIcons.checkmark()];
  const btnClasses = ["btn--plain", "btn--copy-markup"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
