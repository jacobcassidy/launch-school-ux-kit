/**
 * TOGGLE
 * @module utils/toggle
 */

// Import Utils
import { showHeader, showSettingsContainer, showSidebar, showTabsPanel, showToast, showTocMenu } from "./show.js";
import { hideHeader, hideSettingsContainer, hideSidebar, hideTabsPanel, hideTocMenu } from "./hide.js";
import { elements, states } from "./state.js";

/**
 * TOGGLE HEADER
 */
export function toggleHeader() {
  if (states.elements.header.isHidden) {
    showHeader();
  } else {
    hideHeader();
  }
}

/**
 * TOGGLE EXERCISE STATUS
 */
export function toggleExerciseStatus() {
  const statusToggleButton = document.querySelector(".edit_exercise_submission .button");

  if (statusToggleButton.disabled) {
    showToast("Exercise status change is still in progress", "alert");
    return;
  }

  const markIncomplete = document.querySelector(".edit_exercise_submission input[value='delete']");

  let toastMsg, toastStyle;

  if (markIncomplete) {
    toastMsg = "Exercise marked incomplete";
    toastStyle = "notice";
  } else {
    toastMsg = "Exercise marked complete";
    toastStyle = "success";
  }

  statusToggleButton.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      button: 0,
    }),
  );

  statusToggleButton.click();

  showToast(toastMsg, toastStyle);
}

/**
 * TOGGLE SETTINGS CONTAINER
 */
export function toggleSettingsContainer() {
  if (elements.injected.settingsContainer.classList.contains("active")) {
    hideSettingsContainer();
  } else {
    showSettingsContainer();
  }
}

/**
 * TOGGLE SIDEBAR
 */
export function toggleSidebar() {
  const isSidebarCollapsed = states.elements.sidebar.isCollapsed;

  if (isSidebarCollapsed) {
    showSidebar();
  } else {
    hideSidebar();
  }
}

/**
 * TOGGLE TABS PANEL
 */
export function toggleTabsPanel() {
  const isTabsPanelHidden = states.elements.tabsPanel.isHidden;

  if (isTabsPanelHidden) {
    showTabsPanel();
  } else {
    hideTabsPanel();
  }
}

/**
 * TOGGLE TABLE OF CONTENTS
 */
export function toggleTocMenu() {
  const tocBtn = elements.native.tocButton;

  if (tocBtn && tocBtn.classList.contains("open")) {
    hideTocMenu();
  } else if (tocBtn) {
    showTocMenu();
  }
}
