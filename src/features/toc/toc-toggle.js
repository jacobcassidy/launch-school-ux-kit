/**
 * TABLE OF CONTENTS TOGGLE BUTTON
 * @module features/toc/toc-toggle
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Decorates the supplied native TOC control and moves it into the header container.
 *
 * @param {HTMLElement} containerEl Header container receiving the TOC control.
 * @param {HTMLElement|null} [bookTocBtn] Native TOC control; defaults to the current document match.
 * @returns {void}
 */
export function moveTocButtonToHeader(containerEl, bookTocBtn = document.querySelector(".toc-toggle-button")) {
  if (!bookTocBtn) return;

  bookTocBtn.classList.add("site-header__button", "btn--toggle-toc", "has-dropdown");
  bookTocBtn.title = "Toggle Table of Contents Visibility";

  updateTocButton(bookTocBtn);

  containerEl.appendChild(bookTocBtn);
}

/**
 * Adds the TOC icon to a native table-of-contents control when present.
 *
 * @param {HTMLElement|null} tocBtn Native TOC control to decorate.
 * @returns {void}
 */
function updateTocButton(tocBtn) {
  if (!tocBtn) return;

  const btns = [tocBtn];
  const newIcons = [
    /**
     * Creates a fresh icon using the headerIcons.toc factory.
     *
     * @returns {SVGElement} New icon element.
     */
    () => icons.headerIcons.toc(),
  ];

  applyButtonAppearance(btns, newIcons);
}
