/**
 * WATCH EXERCISE COMPLETION TOGGLE BUTTON
 * @module utils/watch/buttons/exercise-completion
 */

const observedPanels = new WeakSet();

/**
 * Updates the exercise completion button icon based on the current status the button holds.
 * @param {function} handleNewExerciseCompletionForm The callback function to update the exercise completion status button.
 */
export function watchExerciseCompletionToggleBtn(handleNewExerciseCompletionForm) {
  // colorLog.run("Running watchExerciseCompletionToggleBtn");
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel || observedPanels.has(instructionsPanel)) return;
  observedPanels.add(instructionsPanel);

  let exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");

  const observer = new MutationObserver(() => {
    const newExerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");

    if (newExerciseCompletionForm !== exerciseCompletionForm) {
      exerciseCompletionForm = newExerciseCompletionForm;
      if (exerciseCompletionForm) handleNewExerciseCompletionForm(exerciseCompletionForm);
    }
  });

  observer.observe(instructionsPanel, {
    childList: true,
    subtree: true,
  });
}
