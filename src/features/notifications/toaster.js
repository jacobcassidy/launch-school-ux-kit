/**
 * TOASTER
 * @module features/notifications/toaster
 */

/**
 * Reuses the existing toast container or appends a new one to the body.
 *
 * @returns {HTMLDivElement} Existing or newly appended toast container.
 */
export function injectToaster() {
  const existingToaster = document.querySelector(".toast-container");
  if (existingToaster) return existingToaster;

  /**
   * Creates a detached container for toast messages.
   *
   * @returns {HTMLDivElement} New toast container.
   */
  const createToaster = () => {
    const toasterEl = document.createElement("div");
    toasterEl.classList.add("toast-container");
    return toasterEl;
  };

  const toasterEl = createToaster();
  document.body.appendChild(toasterEl);
  return toasterEl;
}
