import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
import { watchRunCodeButton } from "./watch-run-code.js";
/**
 * RUN CODE BUTTON
 * @module features/editor/run-code-buttons
 */

/**
 * Updates the run code button styles and icons.
 */
export function updateRunCodeButtons() {
  const btns = document.querySelectorAll(".btn-run-code");
  if (btns.length < 1) return;

  const runIcon = () => icons.panelIcons.codeRun();
  const stopIcon = () => icons.panelIcons.codeStop();
  const newIcons = [runIcon];
  const btnClasses = ["btn--outline", "btn--run-code"];

  applyButtonAppearance(btns, newIcons, btnClasses);

  btns.forEach((btn) => {
    watchRunCodeButton(btn, runIcon, stopIcon);
  });
}
