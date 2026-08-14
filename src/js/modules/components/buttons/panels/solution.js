/**
 * SOLUTION BUTTON
 * @module components/buttons/panels/solution
 */

// Import components
import { icons } from "../../../components";

// Import utils
import { setButtonProperties } from "../../../utils/state";
import { watchViewSolutionBtn } from "../../../utils/watch";

/**
 * Updates the view solution button styles and icons.
 */
export function updateSolutionButton() {
  const btns = document.querySelectorAll("button[data-target='#solution-analysis-collapse']");
  if (btns.length < 1) return;

  const newIcons = [() => icons.panelIcons.viewOpen(), () => icons.panelIcons.viewClose()];
  const btnClasses = ["btn--toggle-solution"];

  setButtonProperties(btns, newIcons, btnClasses);

  btns.forEach((btn) => {
    watchViewSolutionBtn(btn, newIcons);
  });
}
