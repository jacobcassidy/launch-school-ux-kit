/**
 * SOLUTION BUTTONS
 * @module features/exercises/solution-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchSolutionButton } from "./watch-solution.js";

/**
 * Updates the view solution button styles and icons.
 */
export function updateSolutionButtons() {
  const btns = document.querySelectorAll("button[data-target='#solution-analysis-collapse']");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.viewOpen(), () => icons.panelIcons.viewClose()];
  const btnClasses = ["btn--toggle-solution"];

  applyButtonAppearance(btns, newIcons, btnClasses);

  btns.forEach((btn) => {
    watchSolutionButton(btn, newIcons);
  });
}

export function injectContentSolutionButtons() {
  const solutionBtnSpans = document.querySelectorAll(".solution-header span");
  if (!solutionBtnSpans.length > 0) return;

  solutionBtnSpans.forEach((span) => {
    if (!span) return;

    const solutionBtnEl = document.createElement("button");

    const btns = [solutionBtnEl];
    const newIcons = [() => icons.panelIcons.viewOpen(), () => icons.panelIcons.viewClose()];
    const btnClasses = ["btn--outline", "btn--content-toggle-solution"];

    solutionBtnEl.textContent = span.textContent;
    applyButtonAppearance(btns, newIcons, btnClasses);
    span.parentNode.prepend(solutionBtnEl);
    span.remove();
  });
}
