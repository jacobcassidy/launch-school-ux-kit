import { icons } from "../../shared/icons.js";
import { setButtonProperties } from "../../shared/dom/buttons.js";
import { watchRunCodeBtn } from "./watch-run-code.js";
/**
 * RUN CODE BUTTON
 * @module features/editor/run-code
 */

/**
 * Updates the run code button styles and icons.
 */
export function updateRunCodeButton() {
  const btns = document.querySelectorAll(".btn-run-code");
  if (btns.length < 1) return;

  const runIcon = () => icons.panelIcons.codeRun();
  const stopIcon = () => icons.panelIcons.codeStop();
  const newIcons = [runIcon];
  const btnClasses = ["btn--outline", "btn--run-code"];

  setButtonProperties(btns, newIcons, btnClasses);

  btns.forEach((btn) => {
    watchRunCodeBtn(btn, runIcon, stopIcon);
  });
}
