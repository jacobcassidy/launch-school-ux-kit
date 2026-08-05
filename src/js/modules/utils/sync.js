/**
 * SYNC
 * @module utils/sync
 */

// Import Utils
import { activateTab } from "./activate.js";
import {
  elements,
  setAvailableHotkey,
  setElementContentPanel,
  setElementEditorPanel,
  setElementHeader,
  setElementInstructionsPanel,
  setElementNextExerciseButton,
  setElementScratchpad,
  setElementSettingsContainer,
  setElementSettingsToggleBtn,
  setElementSidebar,
  setElementSidebarHiddenHeadersToggler,
  setElementSidebarShrinkToggler,
  setElementSidebarToggleButton,
  setElementTabNav,
  setElementTabsPanel,
  setElementTabsPanelToggleButton,
  setElementTocButton,
  states,
} from "./state.js";
import {
  toggleExerciseCompletionStatus,
  toggleHeader,
  toggleSettings,
  toggleSidebar,
  toggleTabsPanel,
  toggleTocMenu,
} from "./toggle.js";
import { handleFocus } from "./focus.js";
import { showTabsPanel, showToast } from "./show.js";
import { hideHeader, hideTabsPanel } from "./hide.js";

/**
 * SYNC AVAILABLE HOTKEYS
 * Syncs the hotkeys available on the current page
 */
export function syncAvailableHotkeys() {
  // Clear any previous hotkeys when syncing.
  states.hotkeys.cmdCtrl = {};
  states.hotkeys.cmdOnly = {};
  states.hotkeys.native = {};

  // Injected elements
  const headerExists = elements.injected.header;
  const settingsContainerExists = elements.injected.settingsContainer;

  // Native elements
  const copyCodeBtnExists = document.querySelector(".btn-copy-code");
  const editorExists = elements.native.editorPanel;
  const nextExerciseBtnExists = elements.native.nextExerciseButton;
  const markExerciseBtnExists = document.querySelector(".edit_exercise_submission .button");
  const scratchpadExists = elements.native.scratchpad;
  const sidebarExists = elements.native.sidebar;
  const submitReviewBtnExists = document.querySelector("#lsbot-send-review");
  const tabNavExists = elements.native.tabNav;
  const tabsPanelExists = elements.native.tabsPanel;
  const tocButtonExists = elements.native.tocButton;

  const handleEditorHotkey = (modifier) => {
    const editorPanel = elements.native.editorPanel;
    let focusEl;
    let label;

    const focusEditorPanel = () => {
      const codeEditor = editorPanel.querySelector(".CodeMirror textarea");
      if (codeEditor) handleFocus(codeEditor);
    };

    const focusScratchpad = () => {
      const scratchpadTab = document.querySelector(".tab-button[data-tab='code-editor']");
      if (scratchpadTab) activateTab(scratchpadTab);
    };

    if (editorExists) {
      focusEl = focusEditorPanel;
      label = "Focus Editor";
    } else {
      focusEl = focusScratchpad;
      label = "Focus Scratchpad Editor";
    }

    setAvailableHotkey(modifier, "KeyE", "E", label, focusEl);
  };

  /**
   * SYNC CMD ONLY HOTKEYS
   */
  const syncCmdOnlyHotkeys = () => {
    if (sidebarExists) setAvailableHotkey("cmdOnly", "KeyB", "B", "Toggle Sidebar Visibility", toggleSidebar);
  };

  /**
   * SYNC CMD + SHIFT HOTKEYS
   */
  const syncCmdShiftHotkeys = () => {
    if (headerExists) setAvailableHotkey("cmdShift", "Digit1", 1, "Toggle Header Visibility", toggleHeader);
    if (tabsPanelExists) setAvailableHotkey("cmdShift", "Digit2", 2, "Toggle Tabs Panel Visibility", toggleTabsPanel);
  };

  /**
   * SYNC CMD + CTRL HOTKEYS
   */
  const syncCmdCtrlHotkeys = () => {
    const handleCopyCodeHotkey = () => {
      const triggerCopyBtn = () => {
        const copyBtn = document.querySelector(".btn-copy-code");

        copyBtn.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            button: 0,
          }),
        );

        copyBtn.click();

        if (elements.native.scratchpad) showToast("Scratchpad code copied");
        else if (elements.native.editorPanel) showToast("Editor code copied");
        else showToast("Code copied");
      };

      let label;
      if (elements.native.scratchpad) label = "Copy Scratchpad Code";
      else label = "Copy Editor Code";

      setAvailableHotkey("cmdCtrl", "KeyC", "C", label, triggerCopyBtn);
    };

    const handleNextExerciseHotkey = () => {
      showToast("Going to next exercise");
      elements.native.nextExerciseButton.click();
    };

    const handleSubmitReviewHotkey = () => {
      const reviewSubmitBtn = document.querySelector("#lsbot-send-review");
      const reviewTabBtn = document.querySelector(".tab-button[data-tab='submit-review']");

      activateTab(reviewTabBtn);

      setTimeout(() => {
        reviewSubmitBtn.click();
      }, 100);

      showToast("Solution submitted for LSBot Review");
    };

    const handleTabsHotkeys = () => {
      // Set hotkeys for each tab #
      const allTabBtns = document.querySelectorAll(".tab-button");
      const tabs = [];

      allTabBtns.forEach((btn) => {
        const isHidden = getComputedStyle(btn).display === "none";
        if (isHidden) return;

        const label = btn.getAttribute("aria-label") || btn.textContent.trim();
        const fullLabel = `Focus ${label} Tab`;
        tabs.push([btn, fullLabel]);
      });

      tabs.forEach((tab, index) => {
        const btnEl = tab[0];
        const btnLabel = tab[1];
        const key = index + 1;
        const eventCode = `Digit${key}`;
        const triggerTab = () => activateTab(btnEl);

        setAvailableHotkey("cmdCtrl", eventCode, key, btnLabel, triggerTab);
      });
    };

    if (tabNavExists) handleTabsHotkeys();
    if (copyCodeBtnExists) handleCopyCodeHotkey();
    if (editorExists || scratchpadExists) handleEditorHotkey("cmdCtrl");
    if (markExerciseBtnExists)
      setAvailableHotkey("cmdCtrl", "KeyM", "M", "Toggle Exercise Completion Status", toggleExerciseCompletionStatus);
    if (nextExerciseBtnExists)
      setAvailableHotkey("cmdCtrl", "KeyN", "N", "Go to next exercise", handleNextExerciseHotkey);
    if (submitReviewBtnExists) setAvailableHotkey("cmdCtrl", "KeyR", "R", "Submit Review", handleSubmitReviewHotkey);
    if (tocButtonExists)
      setAvailableHotkey("cmdCtrl", "KeyT", "T", "Toggle Table of Content Visibility", toggleTocMenu);
    if (settingsContainerExists)
      setAvailableHotkey("cmdCtrl", "Comma", ",", "Toggle Settings Visibility", toggleSettings);
  };

  syncCmdCtrlHotkeys();
  syncCmdOnlyHotkeys();
  syncCmdShiftHotkeys();
}

/**
 * SYNC ELEMENTS LOAD STATE
 * Sets the last active state when loading elements
 */
export function syncElementsLoadState() {
  const header = elements.injected.header;
  const sidebar = elements.native.sidebar;
  const tabsPanel = elements.native.tabsPanel;
  const isHeaderHidden = states.elements.header.isHidden;
  const isSettingSidebarHiddenHeadersOn = states.elements.sidebar.isSettingSidebarHiddenHeadersOn;
  const isSettingSidebarShrinkOn = states.elements.sidebar.isSettingSidebarShrinkOn;
  const isTabsPanelHidden = states.elements.tabsPanel.isHidden;

  // Set header load state.
  if (header && isHeaderHidden) hideHeader();

  // Set tabs panel load state.
  if (tabsPanel && isTabsPanelHidden) {
    hideTabsPanel();
  } else if (tabsPanel) {
    showTabsPanel();
  }

  // Set Sidebar Hidden Headers setting load state
  if (sidebar && isSettingSidebarHiddenHeadersOn) {
    elements.native.sidebar.classList.add("hide-section-headers");
  }

  // Set Sidebar Shrink setting load state
  if (sidebar && isSettingSidebarShrinkOn) {
    elements.native.sidebar.classList.add("shrink");
  }
}

/**
 * SYNC INJECTED ELEMENTS STATE
 * Sets the states properties for the script's injected DOM elements
 */
export function syncInjectedElementsState() {
  const header = document.querySelector(".site-header");
  const settingsContainer = document.querySelector(".settings-container");
  const settingsToggleBtn = document.querySelector(".btn--toggle-settings");
  const sidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  const sidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  const sidebarToggleBtn = document.querySelector(".btn--toggle-sidebar");
  const tabsPanelToggleBtn = document.querySelector(".btn--toggle-tabs-panel");

  setElementHeader(header);
  setElementSettingsContainer(settingsContainer);
  setElementSettingsToggleBtn(settingsToggleBtn);
  setElementSidebarHiddenHeadersToggler(sidebarHiddenHeadersToggler);
  setElementSidebarShrinkToggler(sidebarShrinkToggler);
  setElementSidebarToggleButton(sidebarToggleBtn);
  setElementTabsPanelToggleButton(tabsPanelToggleBtn);

  // Sync setting togglers
  const isSettingSidebarShrinkOn = states.elements.sidebar.isSettingSidebarShrinkOn;
  if (isSettingSidebarShrinkOn) sidebarShrinkToggler.checked = true;

  const isSettingSidebarHiddenHeadersOn = states.elements.sidebar.isSettingSidebarHiddenHeadersOn;
  if (isSettingSidebarHiddenHeadersOn) sidebarHiddenHeadersToggler.checked = true;
}

/**
 * SYNC NATIVE ELEMENTS STATE
 * Sets the states properties for the page's native app DOM elements
 */
export function syncNativeElementsState() {
  const contentPanel =
    document.querySelector(".assignment-content-panel") || document.querySelector(".book-content-panel");
  const editorPanel = document.querySelector(".editor-panel");
  const scratchpad = document.querySelector("#tab-code-editor");
  const instructionsPanel = document.querySelector(".instructions-panel");
  const sidebar = document.querySelector(".nav-drawer");
  const tabNav = document.querySelector(".tab-nav");
  const tabsPanel = document.querySelector(".tabs-panel");
  const tocButton = document.querySelector(".toc-toggle-button");
  let nextExerciseButton = null;

  if (instructionsPanel) {
    nextExerciseButton = [...document.querySelectorAll("a")].find((a) =>
      a.textContent.includes("Go to the next exercise"),
    );
  }

  setElementContentPanel(contentPanel);
  setElementEditorPanel(editorPanel);
  setElementInstructionsPanel(instructionsPanel);
  setElementNextExerciseButton(nextExerciseButton);
  setElementScratchpad(scratchpad);
  setElementSidebar(sidebar);
  setElementTabNav(tabNav);
  setElementTabsPanel(tabsPanel);
  setElementTocButton(tocButton);
}
