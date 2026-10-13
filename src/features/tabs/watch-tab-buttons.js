/**
 * WATCH TAB BUTTONS
 * @module features/tabs/watch-tab-buttons
 */

import { handleFocus } from "./focus.js";
import { updateTabButtons } from "./tab-buttons.js";

const watchedTabButtons = new WeakSet();
const watchedTabNavigations = new WeakSet();

/**
 * Binds tab focus and hover tooltips once per button, and observes tab navigation to refresh visible tabs, shortcuts, and replacement listeners.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.refreshShortcuts Rebuilds current-page shortcuts and their UI.
 * @returns {void}
 */
export function watchTabButtons({ refreshShortcuts }) {
  const tabButtons = document.querySelectorAll(".tab-button");
  if (tabButtons.length < 1) {
    return;
  }

  /**
   * Positions the hovered tab's tooltip below its button and binds mouseleave cleanup.
   *
   * @param {HTMLElement} tabBtn Tab control whose tooltip should be shown.
   * @returns {void}
   */
  const handleTooltip = (tabBtn) => {
    const btnDataTabStr = tabBtn.getAttribute("data-tab");
    const tabTooltip = document.querySelector(`.tab-tooltip-${btnDataTabStr}`);

    /**
     * Hides the current tooltip after the pointer leaves its control.
     *
     * @returns {void}
     */
    const handleTooltipRemoval = () => {
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

  tabButtons.forEach(
    /**
     * Binds tab focus and tooltip display once for a current tab button.
     *
     * @param {HTMLElement} tabBtn Native tab control to observe.
     * @returns {void}
     */
    (tabBtn) => {
      if (watchedTabButtons.has(tabBtn)) return;
      watchedTabButtons.add(tabBtn);

      tabBtn.addEventListener(
        "click",
        /**
         * Focuses or flashes the content associated with the clicked tab.
         *
         * @returns {void}
         */
        () => {
          handleFocus(tabBtn);
        },
      );

      tabBtn.addEventListener(
        "mouseenter",
        /**
         * Positions and shows the tooltip for the hovered tab.
         *
         * @returns {void}
         */
        () => {
          handleTooltip(tabBtn);
        },
      );
    },
  );

  const tabNav = tabButtons[0].closest(".tab-nav");
  if (!tabNav || watchedTabNavigations.has(tabNav)) return;
  watchedTabNavigations.add(tabNav);

  /**
   * Collects visible tab buttons from the current tab navigation in DOM order.
   *
   * @returns {HTMLElement[]} Tab controls whose computed display is not none.
   */
  const getVisibleTabs = () =>
    [...tabNav.querySelectorAll(".tab-button")].filter(
      /**
       * Selects tab buttons whose computed display is not none.
       *
       * @param {HTMLElement} tabBtn Candidate tab control.
       * @returns {boolean} Whether the tab is visible by its display property.
       */
      (tabBtn) => getComputedStyle(tabBtn).display !== "none",
    );
  let visibleTabs = getVisibleTabs();

  const observer = new MutationObserver(
    /**
     * Refreshes tab appearance, shortcuts, and listeners when the visible tab collection changes.
     *
     * @returns {void}
     */
    () => {
      const nextVisibleTabs = getVisibleTabs();
      const tabsChanged =
        nextVisibleTabs.length !== visibleTabs.length ||
        nextVisibleTabs.some(
          /**
           * Checks whether a visible tab differs from the previously observed control at its position.
           *
           * @param {HTMLElement} tabBtn Current visible tab.
           * @param {number} index Position in the visible tab collection.
           * @returns {boolean} Whether this position contains a different tab.
           */
          (tabBtn, index) => tabBtn !== visibleTabs[index],
        );
      if (!tabsChanged) return;
      visibleTabs = nextVisibleTabs;
      updateTabButtons();
      refreshShortcuts();
      watchTabButtons({ refreshShortcuts });
    },
  );

  observer.observe(tabNav, { childList: true, attributes: true, subtree: true, attributeFilter: ["class", "style"] });
}
