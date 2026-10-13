import { elements } from "../../shared/dom/dom.js";
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

export function focusEditor({ activateTab, handleFocus }) {
  const editorPanel = elements.native.editorPanel;
  let focusEl;

  const focusEditorPanel = () => {
    const codeEditor = editorPanel.querySelector(".CodeMirror textarea");
    if (codeEditor) handleFocus(codeEditor);
  };

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
