/**
 * HIDE
 * @module utils/helpers/hide
 */

// Import components
import { handleOutsideSettingsMenuClick, handleSettingsEsc } from "../../components";

// Import utils
import { elements, setIsHeaderHidden, setIsSidebarCollapsed, setIsTabsPanelHidden } from "../state";

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
  const settingsMenu = elements.injected.settingsMenu;
  const settingsToggleBtn = elements.injected.settingsToggleButton;
  settingsMenu.classList.remove("active");
  settingsToggleBtn.classList.remove("active");

  document.removeEventListener("pointerdown", handleOutsideSettingsMenuClick);
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
