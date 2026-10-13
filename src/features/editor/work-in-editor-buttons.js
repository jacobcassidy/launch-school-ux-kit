import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
/**
 * WORK IN EDITOR BUTTON
 * @module features/editor/work-in-editor-buttons
 */

/**
 * Updates the work-in-editor button styles and icon.
 */
export function updateWorkInEditorButtons() {
  const btns = document.querySelectorAll(".btn-work-in-editor");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.code()];
  const btnClasses = ["btn", "btn--outline", "btn--work-in-editor"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
