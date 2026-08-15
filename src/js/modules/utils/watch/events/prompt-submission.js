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

    prompt.addEventListener("focus", () => {
      observer?.disconnect();

      observer = new MutationObserver(() => {
        // colorLog.run("Running prompt observer()");
        // if (prompt.disabled)  colorLog.info("Prompt is disabled.");

        if (!prompt.disabled) {
          observer.disconnect();
          // colorLog.info("Prompt focused.");
          prompt.focus();
        }
      });

      observer.observe(prompt, {
        attributes: true,
        attributeFilter: ["disabled"],
      });
    });
  });
}
