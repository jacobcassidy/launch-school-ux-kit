/**
 * SYNC NATIVE ELEMENTS STATE
 * @module shared/dom/native-elements-state
 */

import {
  setElementContentPanel,
  setElementEditorPanel,
  setElementScratchpad,
  setElementSidebar,
  setElementTabNav,
  setElementTabsPanel,
  setElementTocButton,
} from "./setters.js";

/**
 * Discovers current native page panels and controls and stores their references, clearing absent elements to null.
 *
 * @returns {void}
 */
export function syncNativeElementsState() {
  const contentPanel =
    document.querySelector(".assignment-content-panel") || document.querySelector(".book-content-panel");
  const editorPanel = document.querySelector(".editor-panel");
  const scratchpad = document.querySelector("#tab-code-editor");
  const sidebar = document.querySelector(".nav-drawer");
  const tabNav = document.querySelector(".tab-nav");
  const tabsPanel = document.querySelector(".tabs-panel");
  const tocButton = document.querySelector(".toc-toggle-button");

  setElementContentPanel(contentPanel);
  setElementEditorPanel(editorPanel);
  setElementScratchpad(scratchpad);
  setElementSidebar(sidebar);
  setElementTabNav(tabNav);
  setElementTabsPanel(tabsPanel);
  setElementTocButton(tocButton);
}
