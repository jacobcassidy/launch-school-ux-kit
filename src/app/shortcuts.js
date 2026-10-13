import { copyCode, focusEditor } from "../features/editor/index.js";
import { goToNextExercise, submitReview, toggleExerciseCompletionStatus } from "../features/exercises/index.js";
import { getVisibleTabShortcuts, activateTab, handleFocus, toggleTabsPanel } from "../features/tabs/index.js";
import { hideSettings, injectShortcutsSection, toggleSettings } from "../features/settings/index.js";
import { hideTocMenu, toggleTocMenu } from "../features/toc/index.js";
import { showToast } from "../features/notifications/index.js";
import { toggleHeader } from "../features/header/index.js";
import { toggleSidebar } from "../features/sidebar/index.js";
import { elements } from "../shared/dom/dom.js";
import { shortcuts, setAvailableShortcut, syncShortcutTooltips } from "../features/shortcuts/index.js";
/**
 * SYNC AVAILABLE SHORTCUTS
 * @module app/shortcuts
 */

/**
 * Syncs the shortcuts available on the current page.
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
 * SYNC ENTER ONLY SHORTCUT
 */
function syncEnterOnlyShortcut() {
  const chatInputs = document.querySelectorAll(".lsbot-question-input, .lsbot-question-box-answer-input");
  const submitButtons = [...document.querySelectorAll(".lsbot-submit-btn, .lsbot-question-box-send-answer-button")];
  if (chatInputs.length < 1 || submitButtons.length < 1) return;
  setAvailableShortcut("enterOnly", "Enter", "Enter", "Submit focused chat prompt", null, submitButtons);
}

/**
 * SYNC CMD ONLY SHORTCUTS
 */
function syncCmdOnlyShortcuts() {
  if (elements.native.sidebar)
    setAvailableShortcut("cmdOnly", "KeyB", "B", "Toggle Sidebar Visibility", toggleSidebar, [
      elements.injected.sidebarToggleButton,
    ]);
}

/**
 * SYNC CMD + SHIFT SHORTCUTS
 */
function syncCmdShiftShortcuts() {
  if (elements.injected.header)
    setAvailableShortcut("cmdShift", "Digit1", 1, "Toggle Header Visibility", () => toggleHeader({ hideSettings }));
  if (elements.native.tabsPanel)
    setAvailableShortcut("cmdShift", "Digit2", 2, "Toggle Tabs Panel Visibility", toggleTabsPanel, [
      elements.injected.tabsPanelToggleButton,
    ]);
}

/**
 * SYNC CMD + CTRL SHORTCUTS
 */
function syncCmdCtrlShortcuts() {
  const editorExists = elements.native.editorPanel;
  const copyCodeBtnExists = document.querySelector(".btn-copy-code");
  const exerciseCompletionBtnExists = document.querySelector(
    ".instructions-panel .gray-links form button[type=submit]",
  );
  const submitReviewBtnExists = document.querySelector("#lsbot-send-review, #btn-book-lsbot-review");

  const handleCopyCodeShortcut = () => {
    const label = elements.native.scratchpad ? "Copy Scratchpad Code" : "Copy Editor Code";
    setAvailableShortcut("cmdCtrl", "KeyC", "C", label, () => copyCode({ showToast }), [copyCodeBtnExists]);
  };
  const handleEditorShortcut = (modifier) => {
    const label = editorExists ? "Focus Editor" : "Focus Scratchpad Editor";
    const scratchpadButton = editorExists ? null : document.querySelector(".tab-button[data-tab='code-editor']");
    setAvailableShortcut(modifier, "KeyE", "E", label, () => focusEditor({ activateTab, handleFocus }), [
      scratchpadButton,
    ]);
  };
  const handleNextExerciseShortcut = () => goToNextExercise({ showToast });
  const handleSubmitReviewShortcut = () => submitReview({ activateTab, showToast });
  const handleTabsShortcuts = () => {
    getVisibleTabShortcuts().forEach(({ button, label, callback }, index) => {
      const key = index + 1;
      setAvailableShortcut("cmdCtrl", `Digit${key}`, key, label, callback, [button]);
    });
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
      () => toggleTocMenu({ hideSettings }),
      [
        elements.native.tocButton,
      ],
    );
  if (elements.injected.settingsMenu)
    setAvailableShortcut("cmdCtrl", "Comma", ",", "Toggle Settings Visibility", () => toggleSettings({ hideTocMenu }), [
      elements.injected.settingsToggleButton,
    ]);
}

export function refreshShortcuts() {
  syncAvailableShortcuts();
  injectShortcutsSection();
}
