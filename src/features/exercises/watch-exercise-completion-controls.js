/**
 * WATCH EXERCISE COMPLETION CONTROLS
 * @module features/exercises/watch-exercise-completion-controls
 */

const observedPanels = new WeakSet();

/**
 * Observes each instructions panel once and reports replacement or removal of its completion form or submit buttons.
 *
 * @param {function(HTMLFormElement|null): void} handleCompletionControlsChange Receives the current form when controls change, or null when removed.
 * @returns {void}
 */
export function watchExerciseCompletionControls(handleCompletionControlsChange) {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel || observedPanels.has(instructionsPanel)) return;
  observedPanels.add(instructionsPanel);

  let exerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
  let submitButtons = [...(exerciseCompletionForm?.querySelectorAll("button[type=submit]") || [])];

  const observer = new MutationObserver(
    /**
     * Reports completion-form or submit-button identity changes, including control removal.
     *
     * @returns {void}
     */
    () => {
      const newExerciseCompletionForm = instructionsPanel.querySelector(".gray-links form");
      const newSubmitButtons = [...(newExerciseCompletionForm?.querySelectorAll("button[type=submit]") || [])];
      const buttonsChanged =
        newSubmitButtons.length !== submitButtons.length ||
        newSubmitButtons.some(
          /**
           * Checks whether a submit button differs from the previously observed control at its position.
           *
           * @param {HTMLButtonElement} button Current submit control.
           * @param {number} index Position in the current submit-button collection.
           * @returns {boolean} Whether this position contains a replacement button.
           */
          (button, index) => button !== submitButtons[index],
        );

      if (newExerciseCompletionForm !== exerciseCompletionForm || buttonsChanged) {
        exerciseCompletionForm = newExerciseCompletionForm;
        submitButtons = newSubmitButtons;
        handleCompletionControlsChange(exerciseCompletionForm);
      }
    },
  );

  observer.observe(instructionsPanel, {
    childList: true,
    subtree: true,
  });
}
