/**
 * WATCH PROMPT SUBMISSIONS
 * @module features/prompts/watch-prompt-submission
 */

/**
 * Watches focused LSBot prompts for disabled-state changes and refocuses re-enabled prompts only if focus has not moved elsewhere.
 *
 * @returns {void}
 */
export function watchPromptSubmission() {
  const lsbotPromptInputs = document.querySelectorAll(".lsbot-question-input");
  if (lsbotPromptInputs.length < 1) {
    return;
  }

  lsbotPromptInputs.forEach(
    /**
     * Binds one LSBot prompt to start disabled-state observation when focused.
     *
     * @param {HTMLTextAreaElement} prompt Native LSBot prompt textarea.
     * @returns {void}
     */
    (prompt) => {
      if (watchedPromptInputs.has(prompt)) return;
      watchedPromptInputs.add(prompt);

      let observer = null;

      /**
       * Does nothing until a temporary focus listener has been registered.
       *
       * @returns {void}
       */
      let stopWatchingFocus = () => {};

      /**
       * Restarts disabled-state observation and temporary focus tracking for the current prompt.
       *
       * @returns {void}
       */
      const watchSubmissionFocus = () => {
        observer?.disconnect();
        stopWatchingFocus();

        /**
         * Cancels prompt refocusing when another control receives focus.
         *
         * @param {FocusEvent} event Focus change while the prompt is being observed.
         * @returns {void}
         */
        const onFocusElsewhere = (event) => {
          if (event.target === prompt || event.target === document.body) return;
          observer.disconnect();
          stopWatchingFocus();
        };

        /**
         * Removes the temporary listener that cancels prompt refocusing after focus moves elsewhere.
         *
         * @returns {void}
         */
        stopWatchingFocus = () => document.removeEventListener("focusin", onFocusElsewhere);

        observer = new MutationObserver(
          /**
           * Tracks submission disablement and restores prompt focus after re-enabling only if another control has not taken focus.
           *
           * @returns {void}
           */
          () => {
            if (prompt.disabled) {
              document.addEventListener("focusin", onFocusElsewhere);
              return;
            }

            observer.disconnect();
            stopWatchingFocus();
            const activeElement = document.activeElement;
            const canRefocus = activeElement === prompt || activeElement === document.body || !activeElement;
            if (prompt.isConnected && canRefocus) prompt.focus();
          },
        );

        observer.observe(prompt, {
          attributes: true,
          attributeFilter: ["disabled"],
        });
      };

      prompt.addEventListener("focus", watchSubmissionFocus);
      if (document.activeElement === prompt) watchSubmissionFocus();
    },
  );
}
const watchedPromptInputs = new WeakSet();
