/**
 * NEXT EXERCISE BUTTON
 * @module features/exercises/next-exercise-button
 */

import { icons } from "../../shared/icons.js";
import { setElementNextExerciseButton } from "../../shared/dom/setters.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Clears the stored next-exercise reference, then discovers and decorates the current next-exercise link.
 *
 * @returns {void}
 */
export function updateNextExerciseButton() {
  setElementNextExerciseButton(null);
  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  const nextExerciseButton = [...document.querySelectorAll("a")].find(
    /**
     * Tests whether a link carries the native next-exercise label.
     *
     * @param {HTMLAnchorElement} a Candidate page link.
     * @returns {boolean} Whether the link is the next-exercise control.
     */
    (a) => a.textContent.includes("Go to the next exercise"),
  );

  if (!nextExerciseButton) return;
  const btns = [nextExerciseButton];

  setElementNextExerciseButton(nextExerciseButton);

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.arrowNext factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.arrowNext(),
  ];
  const btnClasses = ["btn", "btn--outline", "btn--next-exercise"];

  applyButtonAppearance(btns, newIcons, btnClasses);
}
