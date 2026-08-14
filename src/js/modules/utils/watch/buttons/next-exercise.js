/**
 * WATCH NEXT EXERCISE BUTTON
 * @module utils/watch/buttons/next-exercise
 */

// Import components
import { updateNextExerciseButton } from "../../../components";

// Import utils
import { elements } from "../../state";

/**
 * Updates the "Go to next exercise" button when the dom element changes.
 */
export function watchNextExerciseBtn() {
  const instructionsTab = document.querySelector("#tab-instructions");
  if (!instructionsTab) return;

  let nextExerciseBtn = elements.native.nextExerciseButton;
  if (!nextExerciseBtn) return;

  if (nextExerciseBtn.dataset.nextButtonEventBound) return;
  nextExerciseBtn.dataset.nextButtonEventBound = "true";

  const observer = new MutationObserver(() => {
    const newNextExerciseBtn = [...document.querySelectorAll("a")].find((a) =>
      a.textContent.includes("Go to the next exercise"),
    );

    if (newNextExerciseBtn && newNextExerciseBtn !== nextExerciseBtn) {
      nextExerciseBtn = newNextExerciseBtn;
      updateNextExerciseButton();
    }
  });

  observer.observe(instructionsTab, {
    childList: true,
    subtree: true,
  });
}
