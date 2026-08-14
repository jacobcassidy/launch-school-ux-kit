/**
 * WATCH RUN CODE BUTTONS
 * @module utils/watch/buttons/run-code
 */

/**
 * Updates the run code button icon based on the current status the button holds.
 *
 * @param {HTMLButtonElement} btn The run code button element.
 * @param {SVGElement} runIcon The run code SVG icon element
 * @param {SVGElement} stopIcon The stop code SVG icon element.
 */
export function watchRunCodeBtn(btn, runIcon, stopIcon) {
  // colorLog.alert("Running watchRunCodeBtn");
  if (!btn) return;

  if (btn.dataset.runCodeBtnEventBound) return;
  btn.dataset.runCodeBtnEventBound = "true";

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (btn.classList.contains("stop-button")) {
          btn.prepend(stopIcon());
        } else {
          btn.prepend(runIcon());
        }
      }
    }
  });

  observer.observe(btn, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
