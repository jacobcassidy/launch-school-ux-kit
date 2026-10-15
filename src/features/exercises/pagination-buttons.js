/**
 * PAGINATION BUTTONS
 * @module features/exercises/pagination-buttons
 */

import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";

/**
 * Decorates assignment and chapter navigation links with directional icons and pagination classes.
 *
 * @returns {void}
 */
export function updatePaginationButtons() {
  const nextPageBtns = getNextPaginationButtons();
  const prevPageBtns = getPreviousPaginationButtons();
  const paginationBtnClasses = ["btn", "btn--outline", "btn--pagination"];

  if (nextPageBtns.length > 0) {
    const btns = nextPageBtns;
    const newIcons = [
      /**
       * Creates a fresh icon using the panelIcons.arrowRight factory.
       *
       * @returns {SVGElement} New icon element.
       */
      () => icons.panelIcons.arrowRight(),
    ];
    const btnClasses = [...paginationBtnClasses, "btn--pagination-next"];
    applyButtonAppearance(btns, newIcons, btnClasses, true);
  }

  if (prevPageBtns.length > 0) {
    const btns = prevPageBtns;
    const newIcons = [
      /**
       * Creates a fresh icon using the panelIcons.arrowLeft factory.
       *
       * @returns {SVGElement} New icon element.
       */
      () => icons.panelIcons.arrowLeft(),
    ];
    const btnClasses = [...paginationBtnClasses, "btn--pagination-prev"];
    applyButtonAppearance(btns, newIcons, btnClasses);
  }
}

/**
 * Collects forward navigation links from assignment and chapter pagination.
 *
 * @returns {HTMLAnchorElement[]} Matching links in assignment-then-chapter order.
 */
function getNextPaginationButtons() {
  const assignmentSelector = ".footer-nav a:has(.fa-chevron-right)";
  const chapterSelector = ".next-chapter a";
  return getPaginationButtons(assignmentSelector, chapterSelector);
}

/**
 * Collects backward navigation links from assignment and chapter pagination.
 *
 * @returns {HTMLAnchorElement[]} Matching links in assignment-then-chapter order.
 */
function getPreviousPaginationButtons() {
  const assignmentSelector = ".footer-nav a:has(.fa-chevron-left)";
  const chapterSelector = ".previous-chapter a";
  return getPaginationButtons(assignmentSelector, chapterSelector);
}

/**
 * Combines matching assignment and chapter navigation links.
 *
 * @param {string} assignmentSelector Selector for assignment pagination links.
 * @param {string} chapterSelector Selector for chapter pagination links.
 * @returns {HTMLAnchorElement[]} Matching links in assignment-then-chapter order.
 */
function getPaginationButtons(assignmentSelector, chapterSelector) {
  const assignmentBtns = document.querySelectorAll(assignmentSelector);
  const chapterBtns = document.querySelectorAll(chapterSelector);
  let btns = [];

  if (assignmentBtns.length > 0)
    assignmentBtns.forEach(
      /**
       * Adds an assignment pagination link to the combined collection.
       *
       * @param {HTMLAnchorElement} btn Matching assignment link.
       * @returns {number} New collection length; ignored by forEach.
       */
      (btn) => btns.push(btn),
    );
  if (chapterBtns.length > 0)
    chapterBtns.forEach(
      /**
       * Adds a chapter pagination link to the combined collection.
       *
       * @param {HTMLAnchorElement} btn Matching chapter link.
       * @returns {number} New collection length; ignored by forEach.
       */
      (btn) => btns.push(btn),
    );

  return btns;
}
