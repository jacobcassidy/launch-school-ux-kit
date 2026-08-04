/**
 * SHOW
 * @module utils/show
 */

// Import Components
import { handleOutsideSettingsContainerClick } from "../components/settings.js";

// Import Utils
import { hideSettingsContainer } from "./hide.js";
import { elements, setIsHeaderHidden, setIsSidebarHidden, setIsTabsPanelHidden } from "./state.js";

/**
 * SHOW HEADER
 */
export function showHeader() {
  setIsHeaderHidden(false);
}

/**
 * SHOW SETTINGS CONTAINER
 */
export function showSettingsContainer() {
  const settingsContainer = elements.injected.settingsContainer;
  const settingsContainerToggleBtn = elements.injected.settingsToggleButton;
  settingsContainer.classList.add("active");
  settingsContainerToggleBtn.classList.add("active");

  // If TOC menu is open, click to close it.
  const openedTocMenu = document.querySelector(".toc-toggle-button.open");
  if (openedTocMenu) openedTocMenu.click();

  document.addEventListener("pointerdown", handleOutsideSettingsContainerClick);
}

/**
 * SHOW SIDEBAR
 */
export function showSidebar() {
  setIsSidebarHidden(false);
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

  console.log(toast);

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

    // If Settings container is open, close it.
    const settingsContainer = elements.injected.settingsContainer;
    if (settingsContainer && settingsContainer.classList.contains("active")) hideSettingsContainer();
  }
}
