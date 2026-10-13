import { icons } from "../../shared/icons.js";
import { setButtonProperties } from "../../shared/dom/buttons.js";
/**
 * COPY MARKUP BUTTON
 * @module features/editor/copy-markup
 */

/**
 * Updates the copy markup button styles and icon.
 */
export function updateCopyMarkupButton(btns = document.querySelectorAll(".markup-copy-block button")) {
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.copy(), () => icons.panelIcons.checkmark()];
  const btnClasses = ["btn--plain", "btn--copy-markup"];

  setButtonProperties(btns, newIcons, btnClasses);
}
