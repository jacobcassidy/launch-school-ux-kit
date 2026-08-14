/**
 * WATCH TAB BUTTONS
 * @module utils/watch/buttons/tab
 */

// Import utils
import { handleFocus } from "../../helpers";

/**
 * Run handleFocus() on each tab button click.
 */
export function watchTabBtns() {
  // colorLog.run("Running watchTabBtns()");

  const tabButtons = document.querySelectorAll(".tab-button");
  if (tabButtons.length < 1) {
    // colorLog.detail("No tab buttons found on this page.");
    return;
  }

  const handleTooltip = (tabBtn) => {
    const btnDataTabStr = tabBtn.getAttribute("data-tab");
    const tabTooltip = document.querySelector(`.tab-tooltip-${btnDataTabStr}`);

    const handleTooltipRemoval = () => {
      // colorLog.detail("Running removeTooltip()");
      tabTooltip.classList.remove("active");
    };

    const tabBtnWidth = tabBtn.offsetWidth;
    const tabTooltipWidth = tabTooltip.offsetWidth;
    const tabRect = tabBtn.getBoundingClientRect();

    tabTooltip.classList.add("active");
    tabTooltip.style.left = `${tabRect.left + tabBtnWidth / 2 - tabTooltipWidth / 2}px`;
    tabTooltip.style.top = `${tabRect.bottom + 6}px`;

    tabBtn.addEventListener("mouseleave", handleTooltipRemoval, { once: true });
  };

  tabButtons.forEach((tabBtn) => {
    if (tabBtn.dataset.tabBtnEventBound) {
      // colorLog.detail("Tab Button watch already exist. Exited watchTabBtns() for this tab button.");
      return;
    }
    tabBtn.dataset.tabBtnEventBound = "true";

    tabBtn.addEventListener("click", () => {
      handleFocus(tabBtn);
    });

    tabBtn.addEventListener("mouseenter", () => {
      handleTooltip(tabBtn);
    });
  });
}
