/**
 * SETTINGS ACTIONS
 * @module features/settings/actions
 */

import { elements } from "../../shared/dom/elements.js";

/**
 * Opens and exposes the settings menu, closes an open TOC menu, and registers outside-click and Escape handlers.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideTocMenu Closes the native table-of-contents menu.
 * @returns {void}
 */
export function showSettings({ hideTocMenu }) {
  const settingsMenu = elements.injected.settingsMenu;
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsMenu || !settingsToggleBtn) return;
  settingsMenu.classList.add("active");
  settingsMenu.inert = false;
  settingsMenu.setAttribute("aria-hidden", "false");
  settingsToggleBtn.classList.add("active");
  settingsToggleBtn.setAttribute("aria-expanded", "true");

  // If TOC menu is open,  close it.
  const openedTocMenu = document.querySelector(".toc-toggle-button.open");
  if (openedTocMenu) hideTocMenu();

  document.addEventListener("pointerdown", handleOutsideSettingsMenuClick);
  document.addEventListener("keydown", handleSettingsEscape);
}

/**
 * Hides and inerts the settings menu, returns focus to its toggle when needed, and removes dismissal listeners.
 *
 * @returns {void}
 */
export function hideSettings() {
  const settingsMenu = elements.injected.settingsMenu;
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsMenu || !settingsToggleBtn) return;
  if (settingsMenu.contains(document.activeElement)) settingsToggleBtn.focus();
  settingsMenu.classList.remove("active");
  settingsMenu.inert = true;
  settingsMenu.setAttribute("aria-hidden", "true");
  settingsToggleBtn.classList.remove("active");
  settingsToggleBtn.setAttribute("aria-expanded", "false");

  document.removeEventListener("pointerdown", handleOutsideSettingsMenuClick);
  document.removeEventListener("keydown", handleSettingsEscape);
}

/**
 * Closes settings when a pointer event occurs outside both the menu and its toggle.
 *
 * @param {PointerEvent} e Pointer event used to identify the clicked target.
 * @returns {void}
 */
export function handleOutsideSettingsMenuClick(e) {
  const settingsMenu = elements.injected.settingsMenu;
  const settingsMenuToggleBtn = elements.injected.settingsToggleButton;

  if (settingsMenu.contains(e.target) || settingsMenuToggleBtn.contains(e.target)) return;
  hideSettings();
}

/**
 * Closes settings when the Escape key is pressed.
 *
 * @param {KeyboardEvent} e Key event to inspect.
 * @returns {void}
 */
export function handleSettingsEscape(e) {
  if (e.key === "Escape") hideSettings();
}

/**
 * Opens or closes the settings menu according to its current active class.
 *
 * @param {object} options Feature dependencies.
 * @param {function(): void} options.hideTocMenu Closes the native table-of-contents menu.
 * @returns {void}
 */
export function toggleSettings(options) {
  if (elements.injected.settingsMenu.classList.contains("active")) {
    hideSettings();
  } else {
    showSettings(options);
  }
}
