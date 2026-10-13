/**
 * TOC ACTIONS
 * @module features/toc/actions
 */

import { elements } from "../../shared/dom/elements.js";

/**
 * Clicks the native TOC control when present and closes active settings.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideSettings Closes the settings menu.
 * @returns {void}
 */
export function showTocMenu({ hideSettings }) {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) {
    tocBtn.click();

    // If Settings Menu is open, close it.
    const settingsMenu = elements.injected.settingsMenu;
    if (settingsMenu && settingsMenu.classList.contains("active")) hideSettings();
  }
}

/**
 * Clicks the native TOC control when present to toggle its open state.
 *
 * @returns {void}
 */
export function hideTocMenu() {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) tocBtn.click();
}

/**
 * Closes an open native TOC menu or invokes its control to open it, closing active settings when opening.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideSettings Closes the settings menu.
 * @returns {void}
 */
export function toggleTocMenu(options) {
  const tocBtn = elements.native.tocButton;

  if (tocBtn && tocBtn.classList.contains("open")) {
    hideTocMenu();
  } else if (tocBtn) {
    showTocMenu(options);
  }
}
