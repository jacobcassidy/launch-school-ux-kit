/**
 * DOM BUTTON APPEARANCE
 * @module shared/dom/buttons
 */

/**
 * Adds classes and recreates injected icons when the expected icon count is missing.
 * Buttons already marked with the matching injected icon count remain unchanged.
 * Empty button collections or icon-factory lists are ignored.
 *
 * @param {Array<HTMLElement|null>|NodeListOf<HTMLElement>} buttons Controls to decorate; null entries are skipped.
 * @param {Array<function(): SVGElement>} iconFactories Factories for each injected icon.
 * @param {string[]} [classes=[]] Classes added when the appearance is applied.
 * @param {boolean} [appendIcons=false] Append icons instead of prepending them.
 * @returns {void}
 */
export function applyButtonAppearance(buttons, iconFactories, classes = [], appendIcons = false) {
  if (buttons.length < 1 || iconFactories.length < 1) return;

  buttons.forEach(
    /**
     * Skips absent or already decorated buttons, otherwise applies classes and replaces injected icons.
     *
     * @param {HTMLElement|null} button Control to decorate.
     * @returns {void}
     */
    (button) => {
      if (!button) return;

      const existingIcons = [...button.querySelectorAll(":scope > .is-new-icon")];
      if (button.classList.contains("has-new-icon") && existingIcons.length === iconFactories.length) return;

      existingIcons.forEach(
        /**
         * Removes an obsolete injected icon.
         *
         * @param {SVGElement} icon Previously injected icon to remove.
         * @returns {void}
         */
        (icon) => icon.remove(),
      );

      button.classList.add(...classes, "has-new-icon");

      iconFactories.forEach(
        /**
         * Creates, marks, and inserts one icon using the requested append or prepend placement.
         *
         * @param {function(): SVGElement} createIcon Factory for the next injected button icon.
         * @returns {void}
         */
        (createIcon) => {
          const iconEl = createIcon();
          iconEl.classList.add("is-new-icon");
          if (appendIcons) {
            button.append(iconEl);
          } else {
            button.prepend(iconEl);
          }
        },
      );
    },
  );
}
