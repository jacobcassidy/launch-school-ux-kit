/**
 * WATCH QUESTION BOXES
 * @module features/prompts/watch-question-boxes
 */

import { elements } from "../../shared/dom/elements.js";

const watchedQuestionBoxes = new WeakSet();

/**
 * Binds question-box submit clicks and keyboard combinations once so their handlers can focus the current LSBot tab.
 *
 * @param {object} options Feature dependencies.
 * @param {function(HTMLElement): void} options.handleFocus Focuses or flashes the current LSBot tab control.
 * @returns {void}
 */
export function watchQuestionBoxes({ handleFocus }) {
  const questionBoxes = document.querySelectorAll(".lsbot-question-box");
  if (questionBoxes.length < 1 || !elements.native.tabsPanel) {
    return;
  }

  /**
   * Passes the current LSBot tab button to the supplied focus handler when available.
   *
   * @returns {void}
   */
  const handleSubmitClick = () => {
    const lsbotTabBtn = document.querySelector(".tab-button[data-tab='lsbot-help']");
    if (lsbotTabBtn) handleFocus(lsbotTabBtn);
  };

  /**
   * Runs the LSBot focus handler for supported Enter submission combinations while ignoring composition.
   *
   * @param {KeyboardEvent} event Key event delegated from a question box.
   * @returns {void}
   */
  const handleSubmitShortcut = (event) => {
    const boxTextarea = event.target;
    if (!boxTextarea.matches?.(".lsbot-question-box-answer-input") || document.activeElement !== boxTextarea) return;
    if (event.isComposing || event.keyCode === 229) return;
    const keyAlt = event.altKey;
    const keyCmd = event.metaKey;
    const keyCtrl = event.ctrlKey;
    const keyEnter = event.key === "Enter";
    const keyShift = event.shiftKey;
    const isEnterOnlySubmit = keyEnter && !keyAlt && !keyCmd && !keyCtrl && !keyShift;
    const isCmdEnterSubmit = keyCmd && keyEnter && !keyAlt && !keyCtrl && !keyShift;
    const isCtrlEnterSubmit = keyCtrl && keyEnter && !keyAlt && !keyCmd && !keyShift;
    const shouldSubmit = isEnterOnlySubmit || isCmdEnterSubmit || isCtrlEnterSubmit;
    if (!shouldSubmit) return;
    handleSubmitClick();
  };

  questionBoxes.forEach(
    /**
     * Binds delegated submit clicks and keyboard focus handling once for a question box.
     *
     * @param {HTMLElement} box Question-box container owning current and future submit controls.
     * @returns {void}
     */
    (box) => {
      if (watchedQuestionBoxes.has(box)) return;
      watchedQuestionBoxes.add(box);

      box.addEventListener(
        "click",
        /**
         * Routes clicks on current question-box submit controls to the LSBot focus handler.
         *
         * @param {MouseEvent} event Click delegated from the question-box container.
         * @returns {void}
         */
        (event) => {
          const submitter = event.target.closest?.(".lsbot-question-link, .lsbot-question-box-send-answer-button");
          if (!submitter || !box.contains(submitter)) return;
          handleSubmitClick();
        },
      );

      box.addEventListener("keydown", handleSubmitShortcut);
    },
  );
}
