import { icons } from "../../shared/icons.js";
import { setButtonProperties } from "../../shared/dom/buttons.js";
/**
 * COPY CODE BUTTON
 * @module features/editor/copy-code
 */

/**
 * Updates the copy code button styles and icon.
 */
export function updateCopyCodeButton() {
  const btns = document.querySelectorAll(".btn-copy-code");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.copy()];
  const btnClasses = ["btn--plain"];

  setButtonProperties(btns, newIcons, btnClasses);
}
