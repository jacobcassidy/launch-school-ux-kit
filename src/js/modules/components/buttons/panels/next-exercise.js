/**
 * NEXT EXERCISE BUTTON
 * @module components/buttons/panels/next-exercise
 */

// Import component
import { icons } from "../../../components";

// Import utils
import { setElementNextExerciseButton, setButtonProperties } from "../../../utils/state";

/**
 * Updates the "Go to next exercise" button styles and icon.
 */
export function updateNextExerciseButton() {
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const nextExerciseButton = [...document.querySelectorAll("a")].find((a) =>
    a.textContent.includes("Go to the next exercise"),
  );

  const btns = [nextExerciseButton];
  if (btns.length < 1) return;

  setElementNextExerciseButton(nextExerciseButton);

  const newIcons = [() => icons.panelIcons.arrowNext()];
  const btnClasses = ["btn", "btn--outline", "btn--next-exercise"];

  setButtonProperties(btns, newIcons, btnClasses);
}
