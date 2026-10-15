/**
 * EXERCISE COMPLETION BUTTON
 * @module features/exercises/exercise-completion-button
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchExerciseCompletionControls } from "./watch-exercise-completion-controls.js";

/**
 * Decorates current completion controls and watches replacement forms or submit buttons to refresh appearance and shortcuts.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.refreshShortcuts Rebuilds current-page shortcuts and their UI.
 * @returns {void}
 */
export function updateExerciseCompletionButton({ refreshShortcuts }) {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
  updateExerciseCompletionForm(exerciseCompletionForm);

  watchExerciseCompletionControls(
    /**
     * Updates changed completion controls and rebuilds current-page shortcuts.
     *
     * @param {HTMLFormElement|null} form Current native completion form, or null if removed.
     * @returns {void}
     */
    (form) => {
      updateExerciseCompletionForm(form);
      refreshShortcuts();
    },
  );
}

/**
 * Applies complete or incomplete icons and outline styling to the form's submit controls.
 *
 * @param {HTMLFormElement|null} exerciseCompletionForm Native completion form, or null when absent.
 * @returns {void}
 */
function updateExerciseCompletionForm(exerciseCompletionForm) {
  if (!exerciseCompletionForm) return;
  const btns = exerciseCompletionForm.querySelectorAll("button[type=submit]");
  if (btns.length < 1) return;

  const btnClasses = ["btn--outline", "btn--exercise-completion"];

  /**
   * Creates a fresh mark-complete icon.
   *
   * @returns {SVGElement} Completion icon.
   */
  const completeIcon = () => icons.panelIcons.exerciseComplete();

  /**
   * Creates a fresh mark-incomplete icon.
   *
   * @returns {SVGElement} Incomplete icon.
   */
  const incompleteIcon = () => icons.panelIcons.exerciseIncomplete();
  let newIcons = [];

  const hasDeleteInput = exerciseCompletionForm.querySelector("input[value=delete]");
  hasDeleteInput ? newIcons.push(incompleteIcon) : newIcons.push(completeIcon);

  applyButtonAppearance(btns, newIcons, btnClasses);
}
