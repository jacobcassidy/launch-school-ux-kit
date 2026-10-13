import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
/**
 * COPY CODE BUTTON
 * @module features/editor/copy-code-buttons
 */

/**
 * Updates the copy code button styles and icon.
 */
export function updateCopyCodeButtons() {
  const btns = document.querySelectorAll(".btn-copy-code");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.copy()];
  const btnClasses = ["btn--plain"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
