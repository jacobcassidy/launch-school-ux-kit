/**
 * WATCH QUESTION BOXES
 * @module utils/watch/events/question-boxes
 */

// Import utils
import { elements } from "../../state";
import { handleFocus } from "../../helpers";

/**
 * Opens the Tabs Panel with the LSBOT tab active when a content panel question box submission is made.
 */
export function watchQuestionBoxes() {
  // colorLog.run("Running watchQuestionBoxes()");

  const questionBoxes = document.querySelectorAll(".lsbot-question-box");
  if (questionBoxes.length < 1 || !elements.native.tabsPanel) {
    // colorLog.detail("No question boxes found on this page.");
    return;
  }

  const lsbotTabBtn = document.querySelector(".tab-button[data-tab='lsbot-help']");

  const handleSubmitClick = () => {
    // colorLog.run("Running handleSubmitClick()");
    handleFocus(lsbotTabBtn);
  };

  const handleSubmitHotkey = (event) => {
    // colorLog.run("Running handleSubmitHotkey()");
    const keyAlt = event.altKey;
    const keyCmd = event.metaKey;
    const keyCtrl = event.ctrlKey;
    const keyEnter = event.key === "Enter";
    const keyShift = event.shiftKey;
    const isCmdEnter = keyCmd && keyEnter && !keyAlt && !keyCtrl && !keyShift;
    if (!isCmdEnter) return;
    handleFocus(lsbotTabBtn);
  };

  questionBoxes.forEach((box) => {
    if (box.dataset.questionEventBound) {
      // colorLog.detail("Question box watch already exist. Exited watchQuestionBoxes() for this box.");
      return;
    }
    box.dataset.questionEventBound = "true";

    const boxSendLink = box.querySelector(".lsbot-question-link");
    const boxSubmitButton = box.querySelector(".lsbot-question-box-send-answer-button");
    boxSendLink.addEventListener("click", handleSubmitClick);
    boxSubmitButton.addEventListener("click", handleSubmitClick);

    const boxTextarea = box.querySelector(".lsbot-question-box-answer-input");
    boxTextarea.addEventListener("focus", () => boxTextarea.addEventListener("keydown", handleSubmitHotkey));
    boxTextarea.addEventListener("blur", () => boxTextarea.removeEventListener("keydown", handleSubmitHotkey));
  });
}
