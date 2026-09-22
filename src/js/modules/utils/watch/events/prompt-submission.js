/**
 * WATCH PROMPT SUBMISSIONS
 * @module utils/watch/events/prompt-submission
 */

/**
 * Refocuses the LSBOT prompt textarea after a prompt is submitted.
 */
export function watchPromptSubmission() {
  // colorLog.run("Running watchPromptSubmission()");

  const lsbotPromptInputs = document.querySelectorAll(".lsbot-question-input");
  if (lsbotPromptInputs.length < 1) {
    // colorLog.detail("No lsbot prompt inputs found on this page.");
    return;
  }

  lsbotPromptInputs.forEach((prompt) => {
    if (prompt.dataset.focusObserverBound) {
      // colorLog.detail("Prompt watch already exist. Exited watchPromptSubmission() for this prompt.");
      return;
    }
    prompt.dataset.focusObserverBound = "true";

    let observer = null;
    let stopWatchingFocus = () => {};

    prompt.addEventListener("focus", () => {
      observer?.disconnect();
      stopWatchingFocus();

      const onFocusElsewhere = (event) => {
        if (event.target === prompt || event.target === document.body) return;
        observer.disconnect();
        stopWatchingFocus();
      };
      stopWatchingFocus = () => document.removeEventListener("focusin", onFocusElsewhere);

      observer = new MutationObserver(() => {
        // colorLog.run("Running prompt observer()");
        // if (prompt.disabled)  colorLog.info("Prompt is disabled.");

        if (prompt.disabled) {
          document.addEventListener("focusin", onFocusElsewhere);
          return;
        }

        observer.disconnect();
        stopWatchingFocus();
        const activeElement = document.activeElement;
        const canRefocus = activeElement === prompt || activeElement === document.body || !activeElement;
        if (prompt.isConnected && canRefocus) prompt.focus();
      });

      observer.observe(prompt, {
        attributes: true,
        attributeFilter: ["disabled"],
      });
    });
  });
}
