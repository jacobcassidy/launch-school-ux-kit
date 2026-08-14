/**
 * WORK IN EDITOR BUTTON
 * @module components/buttons/panels/work-in-editor
 */

// Import components
import { icons } from "../../../components";

/**
 * Updates the work-in-editor button styles and icon.
 */
export function updateWorkInEditorButton() {
  const workInCodeEditorBtns = document.querySelectorAll(".btn-work-in-editor");
  workInCodeEditorBtns.forEach((btn) => btn.classList.add("btn"));
}
