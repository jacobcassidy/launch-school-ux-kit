/**
 * WATCH MARKUP COPY BLOCK BUTTON
 * @module utils/watch/buttons/markup-copy-block
 */

// Import components
import { icons } from "../../../components";

// Import utils
import { setButtonProperties } from "../../../utils/state";

/**
 * Adds the  markup copy block button classes when the markup copy block button is added to the DOM.
 */
export function watchMarkupCopyBlockBtns() {
  // colorLog.run("Running watchMarkupCopyBlockBtns");

  const instructionsPanel = document.querySelector(".instructions-panel");
  if (!instructionsPanel) return;

  if (instructionsPanel.dataset.markupCopyBlockBtnsWatchBound) return;
  instructionsPanel.dataset.markupCopyBlockBtnsWatchBound = "true";

  const newIcons = [() => icons.panelIcons.copy(), () => icons.panelIcons.checkmark()];
  const btnClasses = ["btn--plain", "btn--copy-markup"];

  const observer = new MutationObserver(() => {
    const btns = instructionsPanel.querySelectorAll(".markup-copy-block button");

    btns.forEach((btn) => {
      if (btn.dataset.markupCopyBlockBtnWatchBound) return;
      btn.dataset.markupCopyBlockBtnWatchBound = "true";

      if (btn.classList.contains("btn--copy-markup")) return;

      setButtonProperties([btn], newIcons, btnClasses);
    });
  });

  observer.observe(instructionsPanel, {
    childList: true,
    subtree: true,
  });
}
