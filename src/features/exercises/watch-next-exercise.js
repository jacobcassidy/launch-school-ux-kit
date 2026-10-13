import { updateNextExerciseButton } from "./next-exercise-button.js";
import { elements } from "../../shared/dom/elements.js";
/**
 * WATCH NEXT EXERCISE BUTTON
 * @module features/exercises/watch-next-exercise
 */

const observedInstructionsTabs = new WeakSet();

/**
 * Updates the "Go to next exercise" button when the dom element changes.
 */
export function watchNextExerciseButton({ refreshShortcuts }) {
  const instructionsTab = document.querySelector("#tab-instructions");
  if (!instructionsTab) return;
  if (observedInstructionsTabs.has(instructionsTab)) return;

  const observer = new MutationObserver(() => {
    const previousButton = elements.native.nextExerciseButton;
    updateNextExerciseButton();
    const nextButton = elements.native.nextExerciseButton;
    if (previousButton === nextButton) return;

    refreshShortcuts();
  });

  observer.observe(instructionsTab, {
    childList: true,
    subtree: true,
  });
  observedInstructionsTabs.add(instructionsTab);
}
