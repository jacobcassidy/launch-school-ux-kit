/**
 * WATCH PROMPT ENTER SHORTCUT
 * @module features/prompts/watch-prompt-enter-shortcut
 */

/**
 * Registers focus-based binding once so unmodified Enter submits focused chat inputs without repeated or composing submissions.
 *
 * @returns {void}
 */
export function watchPromptEnterShortcut() {
  if (document.documentElement.dataset.promptFocusBound) return;
  document.documentElement.dataset.promptFocusBound = "true";
  const watchedChatInputs = new WeakSet();

  const inputSelector = ".lsbot-question-input, .lsbot-question-box-answer-input";

  /**
   * Submits the focused writable chat input on unmodified Enter when its matching submit control is enabled.
   *
   * @param {KeyboardEvent} event Key event from the bound chat input.
   * @returns {void}
   */
  const handleKeydown = (event) => {
    const chatInput = event.currentTarget;
    if (
      document.activeElement !== chatInput ||
      event.key !== "Enter" ||
      event.shiftKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.isComposing ||
      event.keyCode === 229 ||
      chatInput.disabled ||
      chatInput.readOnly
    )
      return;

    const submitSelector = chatInput.matches(".lsbot-question-box-answer-input")
      ? ".lsbot-question-box-send-answer-button"
      : ".lsbot-submit-btn";
    const container = chatInput.closest(".lsbot-question-box, .lsbot-input-area, form") || chatInput.parentElement;
    const submitButton = container?.querySelector(submitSelector);
    if (!submitButton) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    if (event.repeat || submitButton.matches(":disabled") || submitButton.getAttribute("aria-disabled") === "true")
      return;

    submitButton.click();
  };

  /**
   * Binds the Enter handler once to a matching chat input.
   *
   * @param {EventTarget|null} chatInput Candidate input from current focus or a focus event.
   * @returns {void}
   */
  const bindInput = (chatInput) => {
    if (!chatInput?.matches(inputSelector) || watchedChatInputs.has(chatInput)) return;
    watchedChatInputs.add(chatInput);
    chatInput.addEventListener("keydown", handleKeydown, true);
  };

  document.addEventListener(
    "focusin",
    /**
     * Binds the Enter handler to a newly focused chat input.
     *
     * @param {FocusEvent} event Delegated focus event.
     * @returns {void}
     */
    (event) => bindInput(event.target),
  );
  bindInput(document.activeElement);
}
