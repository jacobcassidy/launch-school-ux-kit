/**
 * EXERCISE COMPLETION BUTTON
 * @module features/exercises/exercise-completion-button
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchExerciseCompletionControls } from "./watch-exercise-completion-controls.js";

/**
 * Updates the exercise completion button styles and icons.
 */
export function updateExerciseCompletionButton({ refreshShortcuts }) {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
  updateExerciseCompletionForm(exerciseCompletionForm);

  watchExerciseCompletionControls((form) => {
    updateExerciseCompletionForm(form);
    refreshShortcuts();
  });
}

/**
 * Update exercise completion form appearance
 * @param {HTMLFormElement} exerciseCompletionForm
 */
function updateExerciseCompletionForm(exerciseCompletionForm) {
  if (!exerciseCompletionForm) return;
  const btns = exerciseCompletionForm.querySelectorAll("button[type=submit]");
  if (btns.length < 1) return;

  const btnClasses = ["btn--outline", "btn--exercise-completion"];
  const completeIcon = () => icons.panelIcons.exerciseComplete();
  const incompleteIcon = () => icons.panelIcons.exerciseIncomplete();
  let newIcons = [];

  const hasDeleteInput = exerciseCompletionForm.querySelector("input[value=delete]");
  hasDeleteInput ? newIcons.push(incompleteIcon) : newIcons.push(completeIcon);

  applyButtonAppearance(btns, newIcons, btnClasses);
}
