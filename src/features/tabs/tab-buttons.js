/**
 * TAB BUTTONS
 * @module features/tabs/tab-buttons
 */

import { icons } from "../../shared/icons.js";

/**
 * Updates native tab appearance and accessible labels, reuses tooltips, and removes tooltips for deleted tabs.
 *
 * @returns {void}
 */
export function updateTabButtons() {
  const tabBtns = document.querySelectorAll(".tab-button");
  const currentTabIds = new Set(
    [...tabBtns].map(
      /**
       * Reads the native tab identifier from a button.
       *
       * @param {HTMLElement} btn Current tab control.
       * @returns {string|null} Tab identifier, or null if absent.
       */
      (btn) => btn.getAttribute("data-tab"),
    ),
  );

  tabBtns.forEach(updateTabButton);
  document.querySelectorAll(".tab-tooltip").forEach(
    /**
     * Removes a tab tooltip whose corresponding tab no longer exists.
     *
     * @param {HTMLElement} tooltip Injected tab tooltip to check.
     * @returns {void}
     */
    (tooltip) => {
      if (!currentTabIds.has(tooltip.dataset.tabTooltipId)) tooltip.remove();
    },
  );
}

/**
 * Marks hidden tabs or replaces known visible tab content with its icon, accessible label, and tooltip.
 *
 * @param {HTMLElement} btn Native tab control to update.
 * @returns {void}
 */
function updateTabButton(btn) {
  const isHidden = getComputedStyle(btn).display === "none";
  if (isHidden) {
    btn.classList.add("is-hidden");
    return;
  }

  btn.classList.remove("is-hidden");

  // Remove the title and use an aria-label and tooltip instead.
  btn.removeAttribute("title");

  const btnDataTab = btn.getAttribute("data-tab");
  let tabIconEl;
  let tooltipFallback;

  switch (btnDataTab) {
    case "instructions":
      tabIconEl = icons.tabIcons.instructions();
      tooltipFallback = "Instructions";
      break;
    case "lsbot-help":
    case "lsbot-hints":
      tabIconEl = icons.tabIcons.lsbot();
      tooltipFallback = "LSBot";
      break;
    case "submit-review":
      tabIconEl = icons.tabIcons.review();
      tooltipFallback = "Submit Review";
      break;
    case "code-editor":
      tabIconEl = icons.tabIcons.scratchpad();
      tooltipFallback = "Scratchpad";
      break;
    case "community":
      tabIconEl = icons.tabIcons.community();
      tooltipFallback = "Community Solutions";
      break;
    case "feedback":
      tabIconEl = icons.tabIcons.feedback();
      tooltipFallback = "Give Feedback";
      break;
    default:
      break;
  }

  const tabTooltipText =
    btn.innerText.trim() || btn.getAttribute("aria-label") || tooltipFallback || btnDataTab || "Tab";
  btn.setAttribute("aria-label", tabTooltipText);
  if (tabIconEl) btn.replaceChildren(tabIconEl);

  injectTabTooltip(tabTooltipText, btnDataTab);
}

/**
 * Creates or reuses a tab tooltip, updates its text and tab identifier, and appends it to the body.
 *
 * @param {string} tooltipText Accessible tab label to display.
 * @param {string} btnDataTab Tab identifier linking the tooltip to its button.
 * @returns {void}
 */
function injectTabTooltip(tooltipText, btnDataTab) {
  const tooltipEl = document.querySelector(`.tab-tooltip-${btnDataTab}`) || document.createElement("div");
  tooltipEl.classList.add("tooltip", "tab-tooltip", `tab-tooltip-${btnDataTab}`);
  tooltipEl.dataset.tabTooltipId = btnDataTab;
  tooltipEl.textContent = tooltipText;
  document.body.appendChild(tooltipEl);
}
