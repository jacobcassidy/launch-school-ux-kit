/**
 * SOLUTION BUTTONS
 * @module features/exercises/solution-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchSolutionButton } from "./watch-solution.js";

/**
 * Adds solution-toggle classes and an icon pair, then watches native updates to preserve the icons.
 *
 * @returns {void}
 */
export function updateSolutionButtons() {
  const btns = document.querySelectorAll("button[data-target='#solution-analysis-collapse']");
  if (btns.length < 1) return;

  const newIcons = [
    /**
     * Creates a fresh icon using the panelIcons.viewOpen factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.viewOpen(),
    /**
     * Creates a fresh icon using the panelIcons.viewClose factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.panelIcons.viewClose(),
  ];
  const btnClasses = ["btn--toggle-solution"];

  applyButtonAppearance(btns, newIcons, btnClasses);

  btns.forEach(
    /**
     * Registers icon preservation for a decorated solution button.
     *
     * @param {HTMLButtonElement} btn Native solution-toggle control.
     * @returns {void}
     */
    (btn) => {
      watchSolutionButton(btn, newIcons);
    },
  );
}

/**
 * Replaces solution-heading spans with buttons carrying their text and solution-toggle icons.
 *
 * @returns {void}
 */
export function injectContentSolutionButtons() {
  const solutionBtnSpans = document.querySelectorAll(".solution-header span");
  if (!solutionBtnSpans.length > 0) return;

  solutionBtnSpans.forEach(
    /**
     * Replaces a solution-heading span with a labelled button containing solution icons.
     *
     * @param {HTMLSpanElement|null} span Native solution-heading label to replace.
     * @returns {void}
     */
    (span) => {
      if (!span) return;

      const solutionBtnEl = document.createElement("button");

      const btns = [solutionBtnEl];
      const newIcons = [
        /**
         * Creates a fresh icon using the panelIcons.viewOpen factory.
         *
         * @returns {SVGElement} New icon element.
         */
        () => icons.panelIcons.viewOpen(),
        /**
         * Creates a fresh icon using the panelIcons.viewClose factory.
         *
         * @returns {SVGElement} New icon element.
         */
        () => icons.panelIcons.viewClose(),
      ];
      const btnClasses = ["btn--outline", "btn--content-toggle-solution"];

      solutionBtnEl.textContent = span.textContent;
      applyButtonAppearance(btns, newIcons, btnClasses);
      span.parentNode.prepend(solutionBtnEl);
      span.remove();
    },
  );
}
