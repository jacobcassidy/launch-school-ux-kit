/**
 * WORK IN EDITOR BUTTONS
 * @module features/editor/work-in-editor-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Adds outline-button styling and a code icon to work-in-editor controls.
 *
 * @returns {void}
 */
export function updateWorkInEditorButtons() {
  const btns = document.querySelectorAll(".btn-work-in-editor");
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.code factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.code(),
  ];
  const btnClasses = ["btn", "btn--outline", "btn--work-in-editor"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
