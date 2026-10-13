import { elements } from "../../shared/dom/dom.js";
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
  document.addEventListener("keydown", handleSettingsEsc);
}

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
  document.removeEventListener("keydown", handleSettingsEsc);
}

export function handleOutsideSettingsMenuClick(e) {
  const settingsMenu = elements.injected.settingsMenu;
  const settingsMenuToggleBtn = elements.injected.settingsToggleButton;

  if (settingsMenu.contains(e.target) || settingsMenuToggleBtn.contains(e.target)) return;
  hideSettings();
}

export function handleSettingsEsc(e) {
  if (e.key === "Escape") hideSettings();
}

export function toggleSettings(options) {
  if (elements.injected.settingsMenu.classList.contains("active")) {
    hideSettings();
  } else {
    showSettings(options);
  }
}
