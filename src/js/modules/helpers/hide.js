/**
 * HIDE
 * @module helpers/hide
 */

import { handleOutsideSettingsContainerClick } from "../settings-container.js";
import { elements, setIsHeaderHidden, setIsSidebarHidden, setIsTabsPanelHidden } from "./state.js";

/**
 * HIDE HEADER
 */
export function hideHeader() {
  setIsHeaderHidden(true);
}

/**
 * HIDE SETTINGS CONTAINER
 */
export function hideSettingsContainer() {
  const settingsContainer = elements.injected.settingsContainer;
  const settingsContainerToggleBtn = elements.injected.settingsToggleButton;
  settingsContainer.classList.remove("active");
  settingsContainerToggleBtn.classList.remove("active");

  document.removeEventListener("pointerdown", handleOutsideSettingsContainerClick);
}

/**
 * HIDE SIDEBAR
 */
export function hideSidebar() {
  setIsSidebarHidden(true);
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
