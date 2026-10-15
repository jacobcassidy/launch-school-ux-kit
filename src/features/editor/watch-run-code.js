/**
 * WATCH RUN CODE BUTTONS
 * @module features/editor/watch-run-code
 */

/**
 * Observes a run-code button once, keeping one matching icon as its class or native content changes.
 *
 * @param {HTMLButtonElement|null} btn Run-code control to observe.
 * @param {function(): SVGElement} runIcon Creates the run-state icon.
 * @param {function(): SVGElement} stopIcon Creates the stop-state icon.
 * @returns {void}
 */
export function watchRunCodeButton(btn, runIcon, stopIcon) {
  if (!btn) return;

  if (watchedRunCodeButtons.has(btn)) return;
  watchedRunCodeButtons.add(btn);

  let currentIcon;
  let previousIsStopped;

  /**
   * Restores exactly one run or stop icon when the button state or injected content changes.
   *
   * @returns {void}
   */
  const syncIcon = () => {
    const isStopped = btn.classList.contains("stop-button");
    const injectedIcons = [...btn.querySelectorAll(":scope > .is-new-icon")];
    if (isStopped === previousIsStopped && injectedIcons.length === 1 && injectedIcons[0] === currentIcon) return;

    injectedIcons.forEach(
      /**
       * Removes an obsolete injected icon.
       *
       * @param {SVGElement} icon Previously injected icon to remove.
       * @returns {void}
       */
      (icon) => icon.remove(),
    );
    currentIcon = isStopped ? stopIcon() : runIcon();
    currentIcon.classList.add("is-new-icon");
    btn.prepend(currentIcon);
    previousIsStopped = isStopped;
  };

  syncIcon();

  const observer = new MutationObserver(syncIcon);

  observer.observe(btn, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
  });
}
const watchedRunCodeButtons = new WeakSet();
