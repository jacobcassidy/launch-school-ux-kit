import { icons } from "../../shared/icons.js";
import { applyButtonAppearance } from "../../shared/dom/buttons.js";
/**
 * PAGINATION BUTTON
 * @module features/exercises/pagination-buttons
 */

/**
 * Updates the pagination button styles and icons.
 */
export function updatePaginationButtons() {
  const nextPageBtns = getNextPaginationButtons();
  const prevPageBtns = getPreviousPaginationButtons();
  const paginationBtnClasses = ["btn", "btn--outline", "btn--pagination"];

  if (nextPageBtns.length > 0) {
    const btns = nextPageBtns;
    const newIcons = [() => icons.panelIcons.arrowRight()];
    const btnClasses = [...paginationBtnClasses, "btn--pagination-next"];
    applyButtonAppearance(btns, newIcons, btnClasses, true);
  }

  if (prevPageBtns.length > 0) {
    const btns = prevPageBtns;
    const newIcons = [() => icons.panelIcons.arrowLeft()];
    const btnClasses = [...paginationBtnClasses, "btn--pagination-prev"];
    applyButtonAppearance(btns, newIcons, btnClasses);
  }
}

function getNextPaginationButtons() {
  const assignmentSelector = ".footer-nav a:has(.fa-chevron-right)";
  const chapterSelector = ".next-chapter a";
  return getPaginationButtons(assignmentSelector, chapterSelector);
}

function getPreviousPaginationButtons() {
  const assignmentSelector = ".footer-nav a:has(.fa-chevron-left)";
  const chapterSelector = ".previous-chapter a";
  return getPaginationButtons(assignmentSelector, chapterSelector);
}

function getPaginationButtons(assignmentSelector, chapterSelector) {
  const assignmentBtns = document.querySelectorAll(assignmentSelector);
  const chapterBtns = document.querySelectorAll(chapterSelector);
  let btns = [];

  if (assignmentBtns.length > 0) assignmentBtns.forEach((btn) => btns.push(btn));
  if (chapterBtns.length > 0) chapterBtns.forEach((btn) => btns.push(btn));

  return btns;
}
