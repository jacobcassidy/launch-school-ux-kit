/**
 * HIDE
 * @module utils/hide
 */

// Import Components
import { handleOutsideSettingsContainerClick, handleSettingsEsc } from "../components/settings.js";

// Import Utils
import { elements, setIsHeaderHidden, setIsSidebarCollapsed, setIsTabsPanelHidden } from "./state.js";

/**
 * HIDE HEADER
 */
export function hideHeader() {
  setIsHeaderHidden(true);
}

/**
 * HIDE SETTINGS
 */
export function hideSettings() {
  const settingsContainer = elements.injected.settingsContainer;
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  settingsContainer.classList.remove("active");
  settingsToggleBtn.classList.remove("active");

  document.removeEventListener("pointerdown", handleOutsideSettingsContainerClick);
  document.removeEventListener("keydown", handleSettingsEsc);
}

/**
 * HIDE SIDEBAR
 */
export function hideSidebar() {
  setIsSidebarCollapsed(true);
}

/**
 * HIDE TABS PANEL
 */
export function hideTabsPanel() {
  setIsTabsPanelHidden(true);
}

/**
 * HIDE TABLE OF CONTENTS CONTAINER
 */
export function hideTocMenu() {
  const tocBtn = elements.native.tocButton;
  if (tocBtn) tocBtn.click();
}
