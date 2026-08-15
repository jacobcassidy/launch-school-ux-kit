/**
 * WATCH VIEW SOLUTIONS BUTTON
 * @module utils/watch/buttons/solution
 */

/**
 * Updates the view solution button icon based on the current status the button holds.
 */
export function watchViewSolutionBtn(btn, svgIcons) {
  const parent = document.querySelector("#exercise_analysis .markup-collapse");
  if (!parent) {
    // colorLog.detail("No view solution button found on this page.");
    return;
  }

  if (btn.dataset.viewSolutionBtnEventBound) return;
  btn.dataset.viewSolutionBtnEventBound = "true";

  let previousState = parent.classList.contains("open") ? "open" : "closed";

  const handleUpdatedSolutionBtn = () => {
    svgIcons.forEach((icon) => {
      btn.prepend(icon());
    });
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName !== "class") continue;

      const state = parent.classList.contains("open") ? "open" : "closed";
      if (state && state !== previousState) {
        previousState = state;
        handleUpdatedSolutionBtn();
      }
    }
  });

  observer.observe(parent, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
