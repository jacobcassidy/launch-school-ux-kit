/**
 * DOM BUTTON APPEARANCE
 * @module shared/dom/buttons
 */

/**
 * Add icons and optional classes to a collection of buttons.
 *
 * @param {Array} buttons Button elements to update.
 * @param {Array} iconFactories Icon factories to insert.
 * @param {Array} classes Classes to add to each button.
 * @param {Boolean} appendIcons Append icons instead of prepending them.
 */
export function applyButtonAppearance(buttons, iconFactories, classes = [], appendIcons = false) {
  if (buttons.length < 1 || iconFactories.length < 1) return;

  buttons.forEach((button) => {
    if (!button) return;

    const existingIcons = [...button.querySelectorAll(":scope > .is-new-icon")];
    if (button.classList.contains("has-new-icon") && existingIcons.length === iconFactories.length) return;

    existingIcons.forEach((icon) => icon.remove());

    button.classList.add(...classes, "has-new-icon");

    iconFactories.forEach((createIcon) => {
      const iconEl = createIcon();
      iconEl.classList.add("is-new-icon");
      if (appendIcons) {
        button.append(iconEl);
      } else {
        button.prepend(iconEl);
      }
    });
  });
}
