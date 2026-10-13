/**
 * TABS ACTIONS
 * @module features/tabs/actions
 */

import { tabsPanelState, setIsTabsPanelHidden } from "./state.js";
export function showTabsPanel() {
  setIsTabsPanelHidden(false);
}

export function hideTabsPanel() {
  setIsTabsPanelHidden(true);
}

export function toggleTabsPanel() {
  const isTabsPanelHidden = tabsPanelState.isHidden;

  if (isTabsPanelHidden) {
    showTabsPanel();
  } else {
    hideTabsPanel();
  }
}

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

export function getVisibleTabShortcuts() {
  // Set shortcuts for each tab #
  const allTabBtns = document.querySelectorAll(".tab-button");
  const tabs = [];

  allTabBtns.forEach((btn) => {
    const isHidden = getComputedStyle(btn).display === "none";
    if (isHidden) return;

    const label = btn.getAttribute("aria-label") || btn.textContent.trim();
    const fullLabel = `Focus ${label} Tab`;
    tabs.push([btn, fullLabel]);
  });

  return tabs.map(([button, label]) => ({ button, label, callback: () => activateTab(button) }));
}
