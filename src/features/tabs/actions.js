/**
 * TABS ACTIONS
 * @module features/tabs/actions
 */

import { tabsPanelState, setIsTabsPanelHidden } from "./state.js";

/**
 * Shows the tabs panel, updates content sizing and accessibility, and persists the visible state.
 *
 * @returns {void}
 */
export function showTabsPanel() {
  setIsTabsPanelHidden(false);
}

/**
 * Hides and inerts the tabs panel, restores full content width, and persists the hidden state.
 *
 * @returns {void}
 */
export function hideTabsPanel() {
  setIsTabsPanelHidden(true);
}

/**
 * Toggles tabs-panel visibility according to the stored current state.
 *
 * @returns {void}
 */
export function toggleTabsPanel() {
  const isTabsPanelHidden = tabsPanelState.isHidden;

  if (isTabsPanelHidden) {
    showTabsPanel();
  } else {
    hideTabsPanel();
  }
}

/**
 * Dispatches native mousedown and click interactions on the supplied tab control.
 *
 * @param {HTMLElement} tabBtn Native tab button to activate.
 * @returns {void}
 */
export function activateTab(tabBtn) {
  tabBtn.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      button: 0,
    }),
  );

  tabBtn.click();
}

/**
 * Builds labelled activation shortcuts for visible tab buttons in DOM order.
 *
 * @returns {Array<{button: HTMLElement, label: string, callback: function(): void}>} Visible tab controls and their activation callbacks.
 */
export function getVisibleTabShortcuts() {
  // Set shortcuts for each tab #
  const allTabBtns = document.querySelectorAll(".tab-button");
  const tabs = [];

  allTabBtns.forEach(
    /**
     * Collects an accessible label and button for a visible native tab.
     *
     * @param {HTMLElement} btn Candidate tab control.
     * @returns {void}
     */
    (btn) => {
      const isHidden = getComputedStyle(btn).display === "none";
      if (isHidden) return;

      const label = btn.getAttribute("aria-label") || btn.textContent.trim();
      const fullLabel = `Focus ${label} Tab`;
      tabs.push([btn, fullLabel]);
    },
  );

  return tabs.map(
    /**
     * Creates a labelled activation shortcut entry for one visible tab.
     *
     * @param {Array<HTMLElement|string>} entry Tab button and display-label tuple.
     * @returns {object} Entry containing the button, label, and activation callback.
     */
    ([button, label]) => ({
      button,
      label,
      /**
       * Activates the tab captured by this shortcut entry.
       *
       * @returns {void}
       */
      callback: () => activateTab(button),
    }),
  );
}
