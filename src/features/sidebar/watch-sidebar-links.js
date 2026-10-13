/**
 * WATCH SIDEBAR LINKS
 * @module features/sidebar/watch-sidebar-links
 */

/**
 * Toggles the visibility of different elements based on interactive sidebar links.
 */
export function watchSidebarLinks() {
  const sidebar = document.querySelector(".sidebar.nav-drawer");

  if (!sidebar) {
    return;
  }

  const watchSidebarListSections = () => {
    const listHeaderBtns = document.querySelectorAll(".sidebar-list-toggle-btn");

    listHeaderBtns.forEach((btn) => {
      if (watchedSidebarListButtons.has(btn)) return;
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-closed");
      });
      watchedSidebarListButtons.add(btn);
    });
  };

  const watchSidebarPagesDropdown = () => {
    const pagesLink = document.querySelector(".sidebar-list__item .pages");
    const pagesDropdown = document.querySelector(".sidebar-list__item .pages + .dropdown");

    if (!pagesLink?.addEventListener || !pagesDropdown || watchedPagesLinks.has(pagesLink)) return;

    pagesLink.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      pagesDropdown.classList.toggle("expanded");
    });
    watchedPagesLinks.add(pagesLink);
  };

  const watchSidebarTooltips = () => {
    const sidebarToggle = document.querySelector("#navbar-collapsor");
    const sidebarLinks = document.querySelectorAll(".sidebar-lists a");
    if (sidebarLinks.length < 1 || !sidebarToggle) return;

    const handleTooltip = (link) => {
      if (!sidebarToggle.checked) return;

      const linkDataTooltip = link.getAttribute("data-tooltip");
      const linkTooltip = document.querySelector(`.sidebar-tooltip-${linkDataTooltip}`);
      if (!linkTooltip) return;

      const handleTooltipRemoval = () => linkTooltip.classList.remove("active");

      const linkWidth = link.offsetWidth;
      const linkRect = link.getBoundingClientRect();

      linkTooltip.classList.add("active");
      linkTooltip.style.left = `${linkWidth + 4}px`;
      linkTooltip.style.top = `${linkRect.top}px`;

      link.addEventListener("mouseleave", handleTooltipRemoval, { once: true });
    };

    sidebarLinks.forEach((link) => {
      if (watchedSidebarLinks.has(link)) return;

      link.addEventListener("mouseenter", () => handleTooltip(link));
      watchedSidebarLinks.add(link);
    });
  };

  watchSidebarListSections();
  watchSidebarPagesDropdown();
  watchSidebarTooltips();
}
const watchedSidebarListButtons = new WeakSet();
const watchedPagesLinks = new WeakSet();
const watchedSidebarLinks = new WeakSet();
