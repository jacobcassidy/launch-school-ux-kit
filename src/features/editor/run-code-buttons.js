/**
 * RUN CODE BUTTONS
 * @module features/editor/run-code-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchRunCodeButton } from "./watch-run-code.js";

/**
 * Decorates run-code controls and registers watchers that preserve the current run or stop icon.
 *
 * @returns {void}
 */
export function updateRunCodeButtons() {
  const btns = document.querySelectorAll(".btn-run-code");
  if (btns.length < 1) return;

  /**
   * Creates a fresh run-code icon.
   *
   * @returns {SVGElement} Run icon.
   */
  const runIcon = () => icons.panelIcons.codeRun();

  /**
   * Creates a fresh stop-code icon.
   *
   * @returns {SVGElement} Stop icon.
   */
  const stopIcon = () => icons.panelIcons.codeStop();
  const newIcons = [runIcon];
  const btnClasses = ["btn--outline", "btn--run-code"];

  applyButtonAppearance(btns, newIcons, btnClasses);

  btns.forEach(
    /**
     * Registers icon-state observation on a decorated run-code control.
     *
     * @param {HTMLButtonElement} btn Run-code button to observe.
     * @returns {void}
     */
    (btn) => {
      watchRunCodeButton(btn, runIcon, stopIcon);
    },
  );
}
