/**
 * TABLE OF CONTENTS TOGGLE BUTTON
 * @module components/buttons/header/toc-toggle
 */

// Import components
import { icons } from "../../../components";

// Import utils
import { setButtonProperties } from "../../../utils/state";

/**
 * MOVE TOC BUTTON TO HEADER
 * Moves the book Table of Contents toggle button to the header
 *
 * @param {HTMLElement} containerEl The container to which the TOC button will be appended.
 */
export function moveTocBtnToHeader(containerEl) {
  const bookTocBtn = document.querySelector(".toc-toggle-button");
  if (!bookTocBtn) return;

  bookTocBtn.classList.add("site-header__button", ".btn--toggle-toc", "has-dropdown");
  bookTocBtn.title = "Toggle Table of Contents Visibility";

  updateTocButton(bookTocBtn);

  containerEl.appendChild(bookTocBtn);
}

/**
 * Updates the toc button styles and icon.
 */
function updateTocButton(tocBtn) {
  if (!tocBtn) return;

  const btns = [tocBtn];
  const newIcons = [() => icons.headerIcons.toc()];

  setButtonProperties(btns, newIcons);
}
