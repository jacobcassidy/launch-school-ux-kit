/**
 * FOCUS
 * @module features/tabs/focus
 */

import { flashActiveElement } from "../../shared/flash.js";
import { showTabsPanel } from "./actions.js";
import { tabsPanelState } from "./state.js";

/**
 * For a tab button, reveals the tabs panel and focuses or flashes its textarea or control.
 * For a supplied textarea, focuses it or flashes its already focused CodeMirror editor.
 *
 * @param {HTMLElement} focusEl Tab button or textarea to focus or provide focus feedback for.
 * @returns {void}
 */
export function handleFocus(focusEl) {
  const isTextarea = focusEl instanceof HTMLTextAreaElement;
  const isTabButton = focusEl.classList.contains("tab-button");

  /**
   * Finds the textarea associated with the current tab button, preferring a CodeMirror textarea.
   *
   * @returns {HTMLTextAreaElement|null|undefined} Textarea, null if the panel has none, or undefined if the tab target is missing.
   */
  const getTabTextareaElement = () => {
    const tabButtonData = focusEl?.dataset?.tab;
    if (!tabButtonData) return;

    const tabContainerId = `tab-${tabButtonData}`;
    const tabContainer = document.getElementById(tabContainerId);
    if (!tabContainer) return;

    const tabContainerTextarea =
      tabContainer.querySelector(".CodeMirror textarea") || tabContainer.querySelector("textarea") || null;

    return tabContainerTextarea;
  };

  if (isTabButton) {
    const activeTab = document.querySelector(".tab-button.active, .tab-button[aria-selected='true']");
    const isActiveTab = activeTab?.dataset?.tab === focusEl.dataset?.tab;
    const tabTextarea = getTabTextareaElement();
    const isTextareaFocused = document.activeElement === tabTextarea;
    const isTabsPanelHidden = tabsPanelState.isHidden;
    const codeMirror = tabTextarea?.closest(".CodeMirror");
    const isCodeMirrorFocused = codeMirror?.classList.contains("CodeMirror-focused");

    /**
     * Schedules focus on the current tab textarea after native tab activation has time to complete.
     *
     * @returns {void}
     */
    const focusTabTextarea = () => {
      setTimeout(
        /**
         * Focuses the tab textarea after the native tab-selection delay.
         *
         * @returns {void}
         */
        () => {
          tabTextarea.focus();
        },
        100,
      );
    };

    if (isTabsPanelHidden) showTabsPanel();

    if (isActiveTab) {
      // Flash the Scratchpad tab button and  active editor line.
      if (isCodeMirrorFocused) {
        flashActiveElement(focusEl, codeMirror);
        return;
      }

      // Flash the active tab button and textarea.
      if (isTextareaFocused) {
        flashActiveElement(focusEl, tabTextarea);
        return;
      }

      // Flash the active tab textarea only (no flash for the tab button).
      if (tabTextarea && !isTextareaFocused) {
        focusTabTextarea();
        flashActiveElement(tabTextarea);
        return;
      }

      // Flash the tab button only since there is not textarea to flash.
      if (!tabTextarea) {
        flashActiveElement(focusEl);
        return;
      }
    } else {
      // Focus the tab's textarea without flashing it.
      if (tabTextarea && !isTextareaFocused) {
        focusTabTextarea();
        return;
      }
    }
  }

  if (isTextarea) {
    const codeMirror = focusEl.closest(".CodeMirror");
    const isCodeMirrorFocused = codeMirror?.classList.contains("CodeMirror-focused");
    if (isCodeMirrorFocused) {
      flashActiveElement(codeMirror);
    } else {
      focusEl.focus();
    }
    return;
  }
}
