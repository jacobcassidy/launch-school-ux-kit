/**
 * WATCH EXERCISE COMPLETION TOGGLE BUTTON
 * @module utils/watch/buttons/exercise-completion
 */

/**
 * Updates the exercise completion button icon based on the current status the button holds.
 * @param {function} handleNewExerciseCompletionForm The callback function to update the exercise completion status button.
 */
export function watchExerciseCompletionToggleBtn(handleNewExerciseCompletionForm) {
  // colorLog.run("Running watchExerciseCompletionToggleBtn");
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  let exerciseCompletionForm = instructionsPanel.querySelector("form");

  const observer = new MutationObserver(() => {
    const newExerciseCompletionForm = instructionsPanel.querySelector("form");

    if (newExerciseCompletionForm && newExerciseCompletionForm !== exerciseCompletionForm) {
      exerciseCompletionForm = newExerciseCompletionForm;
      handleNewExerciseCompletionForm(exerciseCompletionForm);
    }
  });

  observer.observe(instructionsPanel, {
    childList: true,
    subtree: true,
  });
}
