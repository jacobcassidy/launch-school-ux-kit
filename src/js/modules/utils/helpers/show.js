/**
 * SHOW
 * @module utils/helpers/show
 */

// Import components
import { handleOutsideSettingsMenuClick, handleSettingsEsc } from "../../components";

// Import utils
import { hideSettings } from "../helpers";
import { elements, setIsHeaderHidden, setIsSidebarCollapsed, setIsTabsPanelHidden } from "../state";

/**
 * SHOW HEADER
 */
export function showHeader() {
  setIsHeaderHidden(false);
}

/**
 * SHOW SETTINGS
 */
export function showSettings() {
  const settingsMenu = elements.injected.settingsMenu;
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  settingsMenu.classList.add("active");
  settingsToggleBtn.classList.add("active");

  // If TOC menu is open,  close it.
  const openedTocMenu = document.querySelector(".toc-toggle-button.open");
  if (openedTocMenu) openedTocMenu.click();

  document.addEventListener("pointerdown", handleOutsideSettingsMenuClick);
  document.addEventListener("keydown", handleSettingsEsc);
}

/**
 * SHOW SIDEBAR
 */
export function showSidebar() {
  setIsSidebarCollapsed(false);
}

/**
 * SHOW TABS PANEL
 */
export function showTabsPanel() {
  setIsTabsPanelHidden(false);
}

/**
 * SHOW TOAST
 *
 * @param {string} message The text to display in the toast
 * @param {number} duration How long the toast should display
 */
export function showToast(message, styleClass = null, duration = 2500) {
  const toastContainer = document.querySelector(".toast-container");

  const createToastEl = () => {
    const toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.textContent = message;
    if (styleClass) toastEl.classList.add(styleClass);
    toastContainer.appendChild(toastEl);
    return toastEl;
  };

  const toast = createToastEl();

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}

/**
 * SHOW TABLE OF CONTENTS MENU
 * Shows the book's table of contents menu on book pages.
 */
export function showTocMenu() {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) {
    tocBtn.click();

    // If Settings Menu is open, close it.
    const settingsMenu = elements.injected.settingsMenu;
    if (settingsMenu && settingsMenu.classList.contains("active")) hideSettings();
  }
}
