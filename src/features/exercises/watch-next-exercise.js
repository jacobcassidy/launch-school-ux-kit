/**
 * WATCH NEXT EXERCISE BUTTON
 * @module features/exercises/watch-next-exercise
 */

import { updateNextExerciseButton } from "./next-exercise-button.js";
import { elements } from "../../shared/dom/elements.js";

const observedInstructionsTabs = new WeakSet();

/**
 * Observes each instructions tab once, updating the next-exercise reference and refreshing shortcuts when its identity changes.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.refreshShortcuts Rebuilds current-page shortcuts and their UI.
 * @returns {void}
 */
export function watchNextExerciseButton({ refreshShortcuts }) {
  const instructionsTab = document.querySelector("#tab-instructions");
  if (!instructionsTab) return;
  if (observedInstructionsTabs.has(instructionsTab)) return;

  const observer = new MutationObserver(
    /**
     * Refreshes the next-exercise control and rebuilds shortcuts only when the stored element changes.
     *
     * @returns {void}
     */
    () => {
      const previousButton = elements.native.nextExerciseButton;
      updateNextExerciseButton();
      const nextButton = elements.native.nextExerciseButton;
      if (previousButton === nextButton) return;

      refreshShortcuts();
    },
  );

  observer.observe(instructionsTab, {
    childList: true,
    subtree: true,
  });
  observedInstructionsTabs.add(instructionsTab);
}
