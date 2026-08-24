/**
 * HEADER
 * @module components/header
 */

// Import components
import {
  injectSettingsMenu,
  injectSettingsToggleButton,
  injectSidebarToggleButton,
  injectTabsPanelToggleButton,
  moveTocBtnToHeader,
} from "../components";

/**
 * INJECT SITE HEADER
 * Injects a new .site-header element in the DOM
 */
export function injectHeader() {
  // colorLog.run("Running injectHeader()");
  const currentDomHeader = document.querySelector(".site-header");
  if (currentDomHeader) return;

  const createHeader = () => {
    // colorLog.run("Running createHeader()");
    const siteHeaderEl = document.createElement("header");
    siteHeaderEl.className = "site-header";

    injectHeaderContainers(siteHeaderEl);

    return siteHeaderEl;
  };

  // Inject the site header as the first child of the body element.
  document.body.insertBefore(createHeader(), document.body.firstChild);
  // colorLog.detail(".site-header has been injected.");
}

/**
 * INJECT HEADER CONTAINERS
 * Injects three .site-header__container elements to the .site-header
 *
 * @param {HTMLElement} headerEl The header element to which the containers will be appended.
 */
function injectHeaderContainers(headerEl) {
  for (let i = 0; i < 3; i += 1) {
    const createHeaderContainer = () => {
      const containerEl = document.createElement("div");
      const containerNum = i + 1;
      containerEl.classList.add("site-header__container", `container-${containerNum}`);

      injectContainerElements(containerEl, containerNum);

      return containerEl;
    };

    headerEl.appendChild(createHeaderContainer());
  }
}

/**
 * INJECT CONTAINER ELEMENTS
 * Injects elements to each .site-header__container
 *
 * @param {HTMLDivElement} containerEl The container to which the elements will be appended..
 * @param {number} containerNum The number of the container to which the elements will be appended.
 */
function injectContainerElements(containerEl, containerNum) {
  if (containerNum === 1) {
    injectSidebarToggleButton(containerEl);
  }

  if (containerNum === 2) {
    // If breadcrumbs exist, move them inside the container, otherwise add the title there.
    const breadcrumbs = document.querySelector(".gretel-breadcrumbs");

    if (breadcrumbs) {
      containerEl.appendChild(breadcrumbs);
    } else {
      injectTitleToHeaderWithNoBreadcrumbs(containerEl);
    }
  }

  if (containerNum === 3) {
    injectTabsPanelToggleButton(containerEl);
    moveTocBtnToHeader(containerEl);
    injectSettingsToggleButton(containerEl);
    injectSettingsMenu(containerEl);
  }
}

/**
 * INJECT TITLE TO HEADER WITH NO BREADCRUMBS
 * If breadcrumbs don't exist, injects the non-default HTML title to the .site-header__container
 *
 * @param {HTMLDivElement} containerEl The container to which the title will be appended.
 */
function injectTitleToHeaderWithNoBreadcrumbs(containerEl) {
  // Don't add title when the logged-out nav exists.
  const loggedOutNav = document.querySelector(".columns:has(> #logo + .nav)");
  if (loggedOutNav) return;

  const currentUrl = window.location.pathname;
  let titleEl;

  if (currentUrl.startsWith("/course_catalog/")) {
    // Add the courses-tabs title if on the courses page
    titleEl = document.querySelector(".courses-tabs li.active a");
  } else {
    titleEl = document.querySelector("title");
  }

  const titleText = titleEl.innerText;
  const defaultTitle = "Launch School - an online school for Software Engineers";

  // Don't add the title if it's the default one.
  if (titleText === defaultTitle) return;

  const createHeaderTitle = () => {
    const headerTitleEl = document.createElement("div");
    headerTitleEl.classList.add("title-text");
    headerTitleEl.innerHTML = titleText;

    return headerTitleEl;
  };

  containerEl.appendChild(createHeaderTitle());
}
