/**
 * SIDEBAR HEADER RENDERING
 * @module features/sidebar/header
 */

import { icons } from "../../shared/icons.js";

/**
 * Builds and prepends the branded sidebar header when a native sidebar exists.
 *
 * @returns {void}
 */
export function injectSidebarHeader() {
  const sidebar = document.querySelector(".nav-drawer");

  /**
   * Builds a sidebar heading containing the Launch School catalog link and logo.
   *
   * @returns {HTMLElement} Detached sidebar header.
   */
  const createSidebarHeader = () => {
    const sidebarHeaderEl = document.createElement("header");
    sidebarHeaderEl.className = "sidebar-header";
    const sidebarHeaderLogoEl = document.createElement("a");
    sidebarHeaderLogoEl.setAttribute("href", "/course_catalog");
    sidebarHeaderLogoEl.className = "sidebar-header__logo";
    const sidebarLogoTextEl = document.createElement("span");
    sidebarLogoTextEl.className = "logo-title hidden-on-collapse";
    sidebarLogoTextEl.textContent = "LaunchSchool";
    const modifiedLogoIconEl = icons.sidebarIcons.modifiedLogo();
    modifiedLogoIconEl.classList.add("logo-icon");
    sidebarHeaderLogoEl.appendChild(modifiedLogoIconEl);
    sidebarHeaderLogoEl.appendChild(sidebarLogoTextEl);
    sidebarHeaderEl.appendChild(sidebarHeaderLogoEl);
    return sidebarHeaderEl;
  };

  if (sidebar) sidebar.prepend(createSidebarHeader());
}
