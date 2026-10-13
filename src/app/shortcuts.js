/**
 * SYNC AVAILABLE SHORTCUTS
 * @module app/shortcuts
 */

import { copyCode, focusEditor } from "../features/editor/index.js";
import { goToNextExercise, submitReview, toggleExerciseCompletionStatus } from "../features/exercises/index.js";
import { getVisibleTabShortcuts, activateTab, handleFocus, toggleTabsPanel } from "../features/tabs/index.js";
import { hideSettings, injectShortcutsSection, toggleSettings } from "../features/settings/index.js";
import { hideTocMenu, toggleTocMenu } from "../features/toc/index.js";
import { showToast } from "../features/notifications/index.js";
import { toggleHeader } from "../features/header/index.js";
import { toggleSidebar } from "../features/sidebar/index.js";
import { elements } from "../shared/dom/elements.js";
import { shortcuts, setAvailableShortcut, syncShortcutTooltips } from "../features/shortcuts/index.js";

/**
 * Rebuilds the shortcut registry from current page controls and synchronizes button tooltips.
 *
 * @returns {void}
 */
export function syncAvailableShortcuts() {
  // Clear any previous shortcuts when syncing.
  shortcuts.enterOnly = {};
  shortcuts.cmdOnly = {};
  shortcuts.cmdShift = {};
  shortcuts.cmdCtrl = {};

  // Sync current shortcuts.
  syncEnterOnlyShortcut();
  syncCmdOnlyShortcuts();
  syncCmdShiftShortcuts();
  syncCmdCtrlShortcuts();
  syncShortcutTooltips();
}

/**
 * Registers an informational Enter shortcut when chat inputs and submit buttons are present.
 *
 * @returns {void}
 */
function syncEnterOnlyShortcut() {
  const chatInputs = document.querySelectorAll(".lsbot-question-input, .lsbot-question-box-answer-input");
  const submitButtons = [...document.querySelectorAll(".lsbot-submit-btn, .lsbot-question-box-send-answer-button")];
  if (chatInputs.length < 1 || submitButtons.length < 1) return;
  setAvailableShortcut("enterOnly", "Enter", "Enter", "Submit focused chat prompt", null, submitButtons);
}

/**
 * Registers the platform-specific primary-modifier sidebar shortcut when a sidebar exists.
 *
 * @returns {void}
 */
function syncCmdOnlyShortcuts() {
  if (elements.native.sidebar)
    setAvailableShortcut("cmdOnly", "KeyB", "B", "Toggle Sidebar Visibility", toggleSidebar, [
      elements.injected.sidebarToggleButton,
    ]);
}

/**
 * Registers header and tabs-panel visibility shortcuts for controls present on this page.
 *
 * @returns {void}
 */
function syncCmdShiftShortcuts() {
  if (elements.injected.header)
    setAvailableShortcut(
      "cmdShift",
      "Digit1",
      1,
      "Toggle Header Visibility",

      /**
       * Toggles header visibility while supplying the settings dismissal callback.
       *
       * @returns {void}
       */
      () => toggleHeader({ hideSettings }),
    );
  if (elements.native.tabsPanel)
    setAvailableShortcut("cmdShift", "Digit2", 2, "Toggle Tabs Panel Visibility", toggleTabsPanel, [
      elements.injected.tabsPanelToggleButton,
    ]);
}

/**
 * Registers tab, editor, exercise, review, TOC, and settings actions supported by the current page.
 *
 * @returns {void}
 */
function syncCmdCtrlShortcuts() {
  const editorExists = elements.native.editorPanel;
  const copyCodeBtnExists = document.querySelector(".btn-copy-code");
  const exerciseCompletionBtnExists = document.querySelector(
    ".instructions-panel .gray-links form button[type=submit]",
  );
  const submitReviewBtnExists = document.querySelector("#lsbot-send-review, #btn-book-lsbot-review");

  /**
   * Registers the copy shortcut with a label chosen for the editor or scratchpad.
   *
   * @returns {void}
   */
  const handleCopyCodeShortcut = () => {
    const label = elements.native.scratchpad ? "Copy Scratchpad Code" : "Copy Editor Code";
    setAvailableShortcut(
      "cmdCtrl",
      "KeyC",
      "C",
      label,

      /**
       * Runs the native code-copy action with toast feedback.
       *
       * @returns {void}
       */
      () => copyCode({ showToast }),
      [copyCodeBtnExists],
    );
  };

  /**
   * Registers editor or scratchpad focus under the supplied logical modifier group.
   *
   * @param {string} modifier Shortcut registry group receiving the editor action.
   * @returns {void}
   */
  const handleEditorShortcut = (modifier) => {
    const label = editorExists ? "Focus Editor" : "Focus Scratchpad Editor";
    const scratchpadButton = editorExists ? null : document.querySelector(".tab-button[data-tab='code-editor']");
    setAvailableShortcut(
      modifier,
      "KeyE",
      "E",
      label,

      /**
       * Focuses the editor or activates the scratchpad using the supplied tab actions.
       *
       * @returns {void}
       */
      () => focusEditor({ activateTab, handleFocus }),
      [
        scratchpadButton,
      ],
    );
  };

  /**
   * Runs the next-exercise action with toast feedback.
   *
   * @returns {void}
   */
  const handleNextExerciseShortcut = () => goToNextExercise({ showToast });

  /**
   * Runs the review submission action with tab activation and toast feedback.
   *
   * @returns {void}
   */
  const handleSubmitReviewShortcut = () => submitReview({ activateTab, showToast });

  /**
   * Registers numbered shortcuts for visible tabs in their current DOM order.
   *
   * @returns {void}
   */
  const handleTabsShortcuts = () => {
    getVisibleTabShortcuts().forEach(
      /**
       * Registers a numbered shortcut for a visible tab.
       *
       * @param {object} entry Visible tab shortcut entry.
       * @param {HTMLElement} entry.button Tab control associated with the shortcut.
       * @param {string} entry.label Action label displayed to the user.
       * @param {function(): void} entry.callback Activates the tab.
       * @param {number} index Zero-based position among visible tabs.
       * @returns {void}
       */
      ({ button, label, callback }, index) => {
        const key = index + 1;
        setAvailableShortcut("cmdCtrl", `Digit${key}`, key, label, callback, [button]);
      },
    );
  };

  if (elements.native.tabNav) handleTabsShortcuts();
  if (copyCodeBtnExists) handleCopyCodeShortcut();
  if (editorExists || elements.native.scratchpad) handleEditorShortcut("cmdCtrl");
  if (exerciseCompletionBtnExists)
    setAvailableShortcut(
      "cmdCtrl",
      "KeyM",
      "M",
      "Toggle Exercise Completion Status",

      /**
       * Triggers the native exercise-completion action with toast feedback.
       *
       * @returns {void}
       */
      () => toggleExerciseCompletionStatus({ showToast }),
      [
        exerciseCompletionBtnExists,
      ],
    );
  if (elements.native.nextExerciseButton)
    setAvailableShortcut("cmdCtrl", "KeyN", "N", "Go to next exercise", handleNextExerciseShortcut, [
      elements.native.nextExerciseButton,
    ]);
  if (submitReviewBtnExists)
    setAvailableShortcut("cmdCtrl", "KeyR", "R", "Submit Review", handleSubmitReviewShortcut, [submitReviewBtnExists]);
  if (elements.native.tocButton)
    setAvailableShortcut(
      "cmdCtrl",
      "KeyT",
      "T",
      "Toggle Table of Content Visibility",

      /**
       * Toggles the native TOC menu while supplying the settings dismissal callback.
       *
       * @returns {void}
       */
      () => toggleTocMenu({ hideSettings }),
      [
        elements.native.tocButton,
      ],
    );
  if (elements.injected.settingsMenu)
    setAvailableShortcut(
      "cmdCtrl",
      "Comma",
      ",",
      "Toggle Settings Visibility",

      /**
       * Toggles settings while supplying the TOC dismissal callback.
       *
       * @returns {void}
       */
      () => toggleSettings({ hideTocMenu }),
      [
        elements.injected.settingsToggleButton,
      ],
    );
}

/**
 * Rebuilds available shortcuts, their tooltips, and the current-page settings section.
 *
 * @returns {void}
 */
export function refreshShortcuts() {
  syncAvailableShortcuts();
  injectShortcutsSection();
}
