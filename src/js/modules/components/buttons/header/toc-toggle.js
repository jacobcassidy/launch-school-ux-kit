/**
 * TABLE OF CONTENTS TOGGLE BUTTON
 * @module components/buttons/header/toc-toggle
 */

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

  containerEl.appendChild(bookTocBtn);
}
