/**
 * WATCH SOLUTION BUTTON
 * @module features/exercises/watch-solution
 */

/**
 * Observes native solution-collapse and button-content changes once to preserve the injected icon pair.
 * CSS determines which icon is visible.
 *
 * @param {HTMLButtonElement} btn Native solution-toggle button.
 * @param {Array<function(): SVGElement>} svgIcons Factories for the solution icon pair.
 * @returns {void}
 */
export function watchSolutionButton(btn, svgIcons) {
  const parent = document.querySelector("#exercise_analysis .markup-collapse");
  if (!parent) {
    return;
  }

  if (watchedSolutionButtons.has(btn)) return;
  watchedSolutionButtons.add(btn);

  let currentIcons = [];

  /**
   * Restores the full solution icon pair when any tracked icon is missing or native content replaces it.
   *
   * @returns {void}
   */
  const syncIcons = () => {
    const injectedIcons = [...btn.querySelectorAll(":scope > .is-new-icon")];
    if (
      currentIcons.length === svgIcons.length &&
      injectedIcons.length === currentIcons.length &&
      currentIcons.every(
        /**
         * Checks whether a tracked solution icon remains among the button's injected children.
         *
         * @param {SVGElement} icon Previously injected solution icon.
         * @returns {boolean} Whether the icon is still present.
         */
        (icon) => injectedIcons.includes(icon),
      )
    )
      return;

    injectedIcons.forEach(
      /**
       * Removes an obsolete injected icon.
       *
       * @param {SVGElement} icon Previously injected icon to remove.
       * @returns {void}
       */
      (icon) => icon.remove(),
    );
    currentIcons = svgIcons.map(
      /**
       * Creates and marks one injected solution icon.
       *
       * @param {function(): SVGElement} createIcon Factory for the next solution icon.
       * @returns {SVGElement} New marked icon.
       */
      (createIcon) => {
        const icon = createIcon();
        icon.classList.add("is-new-icon");
        return icon;
      },
    );
    currentIcons.forEach(
      /**
       * Prepends one restored solution icon to its native control.
       *
       * @param {SVGElement} icon Icon to insert.
       * @returns {void}
       */
      (icon) => btn.prepend(icon),
    );
  };

  syncIcons();

  const observer = new MutationObserver(syncIcons);

  observer.observe(parent, {
    attributes: true,
    attributeFilter: ["class"],
  });
  observer.observe(btn, { childList: true });
}
const watchedSolutionButtons = new WeakSet();
