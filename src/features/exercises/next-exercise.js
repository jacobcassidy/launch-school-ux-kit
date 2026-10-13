import { icons } from "../../shared/icons.js";
import { setElementNextExerciseButton } from "../../shared/dom/setters.js";
import { setButtonProperties } from "../../shared/dom/buttons.js";
/**
 * NEXT EXERCISE BUTTON
 * @module features/exercises/next-exercise
 */

// Import component

/**
 * Updates the "Go to next exercise" button styles and icon.
 */
export function updateNextExerciseButton() {
  setElementNextExerciseButton(null);
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const nextExerciseButton = [...document.querySelectorAll("a")].find((a) =>
    a.textContent.includes("Go to the next exercise"),
  );

  if (!nextExerciseButton) return;
  const btns = [nextExerciseButton];

  setElementNextExerciseButton(nextExerciseButton);

  const newIcons = [() => icons.panelIcons.arrowNext()];
  const btnClasses = ["btn", "btn--outline", "btn--next-exercise"];

  setButtonProperties(btns, newIcons, btnClasses);
}
