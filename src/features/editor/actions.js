/**
 * EDITOR ACTIONS
 * @module features/editor/actions
 */

import { elements } from "../../shared/dom/elements.js";

/**
 * Triggers the native copy-code control and reports which editor supplied the code.
 *
 * @param {object} options Feature dependencies.
 * @param {function(string, string=): void} options.showToast Displays action feedback.
 * @returns {void}
 */
export function copyCode({ showToast }) {
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
}

/**
 * Focuses the page editor when present, otherwise activates the scratchpad tab.
 *
 * @param {object} options Feature dependencies.
 * @param {function(HTMLElement): void} options.activateTab Activates a native tab button.
 * @param {function(HTMLElement): void} options.handleFocus Focuses or flashes an editor or tab control.
 * @returns {void}
 */
export function focusEditor({ activateTab, handleFocus }) {
  const editorPanel = elements.native.editorPanel;
  let focusEl;

  /**
   * Passes the current CodeMirror textarea to the supplied focus handler when it exists.
   *
   * @returns {void}
   */
  const focusEditorPanel = () => {
    const codeEditor = editorPanel.querySelector(".CodeMirror textarea");
    if (codeEditor) handleFocus(codeEditor);
  };

  /**
   * Activates the current scratchpad tab when its native button exists.
   *
   * @returns {void}
   */
  const focusScratchpad = () => {
    const scratchpadTab = document.querySelector(".tab-button[data-tab='code-editor']");
    if (scratchpadTab) activateTab(scratchpadTab);
  };

  if (editorPanel) {
    focusEl = focusEditorPanel;
  } else {
    focusEl = focusScratchpad;
  }

  focusEl();
}
