import { icons } from "../../shared/icons.js";
import { setButtonProperties } from "../../shared/dom/buttons.js";
import { watchExerciseCompletionToggleBtn } from "./watch-exercise-completion-toggle.js";
/**
 * EXERCISE COMPLETION BUTTON
 * @module features/exercises/exercise-completion
 */

/**
 * Updates the exercise completion button styles and icons.
 */
export function updateExerciseCompletionButton({ refreshShortcuts }) {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
  handleNewExerciseCompletionForm(exerciseCompletionForm);

  watchExerciseCompletionToggleBtn((form) => {
    handleNewExerciseCompletionForm(form);
    refreshShortcuts();
  });
}

/**
 * Handle New Exercise Completion Form
 * @param {HTMLFormElement} exerciseCompletionForm
 */
function handleNewExerciseCompletionForm(exerciseCompletionForm) {
  if (!exerciseCompletionForm) return;
  const btns = exerciseCompletionForm.querySelectorAll("button[type=submit]");
  if (btns.length < 1) return;

  const btnClasses = ["btn--outline", "btn--exercise-completion"];
  const completeIcon = () => icons.panelIcons.exerciseComplete();
  const incompleteIcon = () => icons.panelIcons.exerciseIncomplete();
  let newIcons = [];

  const hasDeleteInput = exerciseCompletionForm.querySelector("input[value=delete]");
  hasDeleteInput ? newIcons.push(incompleteIcon) : newIcons.push(completeIcon);

  setButtonProperties(btns, newIcons, btnClasses);
}
