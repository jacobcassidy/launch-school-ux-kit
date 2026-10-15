/**
 * SYNC ACTIVE SIDEBAR ITEM
 * @module features/sidebar/active-sidebar-item
 */

/**
 * Updates current-page classes on sidebar links using the page path and catalog special case.
 *
 * @returns {void}
 */
export function syncActiveSidebarItem() {
  const currentUrl = window.location.pathname;

  document.querySelectorAll(".sidebar-list__item a").forEach(
    /**
     * Adds or removes the current-page marker according to the link path and catalog special case.
     *
     * @param {HTMLAnchorElement} link Sidebar navigation link.
     * @returns {void}
     */
    (link) => {
      const linkClasses = link.classList;
      const linkUrl = new URL(link.href).pathname;

      if ((currentUrl.startsWith("/course_catalog/") && linkClasses.contains("courses")) || linkUrl === currentUrl) {
        link.classList.add("current-page");
      } else {
        link.classList.remove("current-page");
      }
    },
  );
}
