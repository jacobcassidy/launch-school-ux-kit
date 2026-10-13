/**
 * WATCH EXERCISE COMPLETION TOGGLE BUTTON
 * @module features/exercises/watch-exercise-completion-controls
 */

const observedPanels = new WeakSet();

/**
 * Updates the exercise completion button icon based on the current status the button holds.
 * @param {function} handleCompletionControlsChange The callback for changed completion controls.
 */
export function watchExerciseCompletionControls(handleCompletionControlsChange) {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel || observedPanels.has(instructionsPanel)) return;
  observedPanels.add(instructionsPanel);

  let exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
  let submitButtons = [...(exerciseCompletionForm?.querySelectorAll("button[type=submit]") || [])];

  const observer = new MutationObserver(() => {
    const newExerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
    const newSubmitButtons = [...(newExerciseCompletionForm?.querySelectorAll("button[type=submit]") || [])];
    const buttonsChanged =
      newSubmitButtons.length !== submitButtons.length ||
      newSubmitButtons.some((button, index) => button !== submitButtons[index]);

    if (newExerciseCompletionForm !== exerciseCompletionForm || buttonsChanged) {
      exerciseCompletionForm = newExerciseCompletionForm;
      submitButtons = newSubmitButtons;
      handleCompletionControlsChange(exerciseCompletionForm);
    }
  });

  observer.observe(instructionsPanel, {
    childList: true,
    subtree: true,
  });
}
