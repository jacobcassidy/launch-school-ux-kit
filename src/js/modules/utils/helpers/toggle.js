/**
 * TOGGLE
 * @module utils/helpers/toggle
 */

// Import utils
import {
  hideHeader,
  hideSettings,
  hideSidebar,
  hideTabsPanel,
  hideTocMenu,
  showHeader,
  showSettings,
  showSidebar,
  showTabsPanel,
  showToast,
  showTocMenu,
} from "../helpers";
import { elements, ui } from "../state";

/**
 * TOGGLE EXERCISE COMPLETION STATUS
 */
export function toggleExerciseCompletionStatus() {
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
 * TOGGLE HEADER
 */
export function toggleHeader() {
  if (ui.header.isHidden) {
    showHeader();
  } else {
    hideHeader();
  }
}

/**
 * TOGGLE SETTINGS
 */
export function toggleSettings() {
  if (elements.injected.settingsMenu.classList.contains("active")) {
    hideSettings();
  } else {
    showSettings();
  }
}

/**
 * TOGGLE SIDEBAR
 */
export function toggleSidebar() {
  const isSidebarCollapsed = ui.sidebar.isCollapsed;

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
  const isTabsPanelHidden = ui.tabsPanel.isHidden;

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
