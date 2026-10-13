/**
 * EXERCISES ACTIONS
 * @module features/exercises/actions
 */

import { elements } from "../../shared/dom/elements.js";
export function toggleExerciseCompletionStatus({ showToast }) {
  const statusToggleButton = document.querySelector(".edit_exercise_submission .button");

  if (statusToggleButton.disabled) {
    showToast("Exercise status change is still in progress", "alert");
    return;
  }

  const markIncomplete = document.querySelector(".edit_exercise_submission input[value='delete']");

  let toastMsg, toastStyle;

  if (markIncomplete) {
    toastMsg = "Exercise marked incomplete";
    toastStyle = "notice";
  } else {
    toastMsg = "Exercise marked complete";
    toastStyle = "success";
  }

  statusToggleButton.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      button: 0,
    }),
  );

  statusToggleButton.click();

  showToast(toastMsg, toastStyle);
}

export function goToNextExercise({ showToast }) {
  showToast("Going to next exercise");
  elements.native.nextExerciseButton.click();
}

export function submitReview({ activateTab, showToast }) {
  const reviewTabBtn = document.querySelector(".tab-button[data-tab='submit-review']");
  const pageUrl = `${location.origin}${location.pathname}${location.search}`;

  if (reviewTabBtn) activateTab(reviewTabBtn);

  setTimeout(() => {
    const reviewSubmitBtn = document.querySelector("#lsbot-send-review, #btn-book-lsbot-review");
    const currentPageUrl = `${location.origin}${location.pathname}${location.search}`;
    if (currentPageUrl !== pageUrl || !reviewSubmitBtn?.isConnected) return;
    if (reviewSubmitBtn.matches(":disabled") || reviewSubmitBtn.getAttribute("aria-disabled") === "true") {
      showToast("Review is not available yet", "alert");
      return;
    }

    reviewSubmitBtn.click();
  }, 100);
}
