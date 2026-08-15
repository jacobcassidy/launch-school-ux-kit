/**
 * WATCH SIDEBAR LINKS
 * @module utils/watch/events/sidebar-links
 */

/**
 * Toggles the visibility of different elements based on interactive sidebar links.
 */
export function watchSidebarLinks() {
  // colorLog.run("Running watchSidebarLinks()");

  const sidebar = document.querySelector(".sidebar.nav-drawer");

  if (!sidebar) {
    // colorLog.detail("No sidebar found.");
    return;
  }

  if (sidebar.dataset.sidebarLinksEventBound) {
    // colorLog.detail("Sidebar Links watch already exist. Exited watchSidebarLinks().");
    return;
  }
  sidebar.dataset.sidebarLinksEventBound = "true";

  const toggleSidebarListSection = () => {
    const listHeaderBtns = document.querySelectorAll(".sidebar-list-toggle-btn");

    listHeaderBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-closed");
      });
    });
  };

  const toggleSidebarPagesDropdown = () => {
    const pagesLink = document.querySelector(".sidebar-list__item .pages");
    const pagesDropdown = document.querySelector(".sidebar-list__item .pages + .dropdown");

    pagesLink.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      pagesDropdown.classList.toggle("expanded");
    });
  };

  const toggleSidebarTooltip = () => {
    const sidebarToggle = document.querySelector("#navbar-collapsor");
    const sidebarLinks = document.querySelectorAll(".sidebar-lists a");
    if (sidebarLinks.length < 1) return;

    const handleTooltip = (link) => {
      if (!sidebarToggle.checked) return;

      const linkDataTooltip = link.getAttribute("data-tooltip");
      const linkTooltip = document.querySelector(`.sidebar-tooltip-${linkDataTooltip}`);

      const handleTooltipRemoval = () => linkTooltip.classList.remove("active");

      const linkWidth = link.offsetWidth;
      const linkRect = link.getBoundingClientRect();

      linkTooltip.classList.add("active");
      linkTooltip.style.left = `${linkWidth + 4}px`;
      linkTooltip.style.top = `${linkRect.top}px`;

      link.addEventListener("mouseleave", handleTooltipRemoval, { once: true });
    };

    sidebarLinks.forEach((link) => {
      if (link.dataset.sidebarLinkEventBound) return;
      link.dataset.sidebarLinkEventBound = "true";

      link.addEventListener("mouseenter", () => handleTooltip(link));
    });
  };

  toggleSidebarListSection();
  toggleSidebarPagesDropdown();
  toggleSidebarTooltip();
}
