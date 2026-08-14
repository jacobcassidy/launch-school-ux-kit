/**
 * RUN CODE BUTTON
 * @module components/buttons/panels/run-code
 */

// Import components
import { icons } from "../../../components";

// Import utils
import { setButtonProperties } from "../../../utils/state";
import { watchRunCodeBtn } from "../../../utils/watch";

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
