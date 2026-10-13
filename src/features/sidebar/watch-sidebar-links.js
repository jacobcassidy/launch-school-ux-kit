/**
 * WATCH SIDEBAR LINKS
 * @module features/sidebar/watch-sidebar-links
 */

/**
 * Registers sidebar section toggles, the Pages dropdown, and collapsed-sidebar tooltips on current controls.
 *
 * @returns {void}
 */
export function watchSidebarLinks() {
  const sidebar = document.querySelector(".sidebar.nav-drawer");

  if (!sidebar) {
    return;
  }

  /**
   * Binds each current sidebar section button once to toggle its closed class.
   *
   * @returns {void}
   */
  const watchSidebarListSections = () => {
    const listHeaderBtns = document.querySelectorAll(".sidebar-list-toggle-btn");

    listHeaderBtns.forEach(
      /**
       * Registers a section-toggle click listener once for a current sidebar button.
       *
       * @param {HTMLButtonElement} btn Sidebar section control.
       * @returns {void}
       */
      (btn) => {
        if (watchedSidebarListButtons.has(btn)) return;
        btn.addEventListener(
          "click",
          /**
           * Toggles the current sidebar section's closed class.
           *
           * @returns {void}
           */
          () => {
            btn.classList.toggle("is-closed");
          },
        );
        watchedSidebarListButtons.add(btn);
      },
    );
  };

  /**
   * Binds the current Pages control once to toggle its dropdown while suppressing native navigation.
   *
   * @returns {void}
   */
  const watchSidebarPagesDropdown = () => {
    const pagesLink = document.querySelector(".sidebar-list__item .pages");
    const pagesDropdown = document.querySelector(".sidebar-list__item .pages + .dropdown");

    if (!pagesLink?.addEventListener || !pagesDropdown || watchedPagesLinks.has(pagesLink)) return;

    pagesLink.addEventListener(
      "click",
      /**
       * Toggles the Pages dropdown and suppresses the native click behavior.
       *
       * @param {MouseEvent} event Click on the Pages control.
       * @returns {void}
       */
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        pagesDropdown.classList.toggle("expanded");
      },
    );
    watchedPagesLinks.add(pagesLink);
  };

  /**
   * Binds current sidebar links once to show their tooltips only while the native sidebar is collapsed.
   *
   * @returns {void}
   */
  const watchSidebarTooltips = () => {
    const sidebarToggle = document.querySelector("#navbar-collapsor");
    const sidebarLinks = document.querySelectorAll(".sidebar-lists a");
    if (sidebarLinks.length < 1 || !sidebarToggle) return;

    /**
     * Positions and shows a tooltip for the hovered control and binds its removal on mouseleave.
     *
     * @param {HTMLElement} link Sidebar link whose tooltip should be shown.
     * @returns {void}
     */
    const handleTooltip = (link) => {
      if (!sidebarToggle.checked) return;

      const linkDataTooltip = link.getAttribute("data-tooltip");
      const linkTooltip = document.querySelector(`.sidebar-tooltip-${linkDataTooltip}`);
      if (!linkTooltip) return;

      /**
       * Hides the current tooltip after the pointer leaves its control.
       *
       * @returns {void}
       */
      const handleTooltipRemoval = () => linkTooltip.classList.remove("active");

      const linkWidth = link.offsetWidth;
      const linkRect = link.getBoundingClientRect();

      linkTooltip.classList.add("active");
      linkTooltip.style.left = `${linkWidth + 4}px`;
      linkTooltip.style.top = `${linkRect.top}px`;

      link.addEventListener("mouseleave", handleTooltipRemoval, { once: true });
    };

    sidebarLinks.forEach(
      /**
       * Binds hover tooltip display once for a current sidebar link.
       *
       * @param {HTMLAnchorElement} link Sidebar link to observe.
       * @returns {void}
       */
      (link) => {
        if (watchedSidebarLinks.has(link)) return;

        link.addEventListener(
          "mouseenter",
          /**
           * Shows the hovered link's tooltip when the sidebar is collapsed.
           *
           * @returns {void}
           */
          () => handleTooltip(link),
        );
        watchedSidebarLinks.add(link);
      },
    );
  };

  watchSidebarListSections();
  watchSidebarPagesDropdown();
  watchSidebarTooltips();
}
const watchedSidebarListButtons = new WeakSet();
const watchedPagesLinks = new WeakSet();
const watchedSidebarLinks = new WeakSet();
