/**
 * HEADER
 * @module features/header/header
 */

import { watchHeaderLayout, disconnectHeaderLayout } from "./header-layout.js";
import { elements } from "../../shared/dom/elements.js";
import { setElementTocButton } from "../../shared/dom/setters.js";

const headerElementSources = new WeakMap();

/**
 * Creates the custom header if absent, refreshes its page controls, and registers layout and cache lifecycle watchers.
 *
 * @param {object} options Feature dependencies.
 * @param {function(HTMLElement): void} options.injectSettingsMenu Inserts the settings menu.
 * @param {function(HTMLElement): void} options.injectSettingsToggleButton Inserts the settings toggle.
 * @param {function(HTMLElement): void} options.injectSidebarToggleButton Inserts the sidebar toggle.
 * @param {function(HTMLElement): void} options.injectTabsPanelToggleButton Inserts the tabs-panel toggle.
 * @param {function(HTMLElement, HTMLElement=): void} options.moveTocButtonToHeader Moves and decorates the native TOC control.
 * @returns {void}
 */
export function injectHeader(options) {
  watchHeaderBeforeCache();
  let header = document.querySelector(".site-header");
  if (!header) {
    header = document.createElement("header");
    header.className = "site-header";
    injectHeaderContainers(header, options);
    document.body.insertBefore(header, document.body.firstChild);
  }

  refreshHeader(header, options);
  watchHeaderLayout(header);
}

/**
 * Registers native cache listeners once to restore moved page controls and remove transient injected UI.
 *
 * @returns {void}
 */
function watchHeaderBeforeCache() {
  if (document.documentElement.dataset.headerBeforeCacheBound) return;
  document.documentElement.dataset.headerBeforeCacheBound = "true";

  /**
   * Returns moved native controls to connected source markers, disconnects headers, and removes transient injected UI before caching.
   *
   * @returns {void}
   */
  const restoreHeaderSources = () => {
    document.querySelectorAll(".site-header").forEach(
      /**
       * Restores native controls from one header, then disconnects and removes the injected header.
       *
       * @param {HTMLElement} header Custom header being removed before page caching.
       * @returns {void}
       */
      (header) => {
        disconnectHeaderLayout(header);
        const movedElements = [
          ...header.querySelectorAll(".gretel-breadcrumbs"),
          ...header.querySelectorAll(".toc-toggle-button"),
          ...header.querySelectorAll(".logged-out-nav"),
        ];

        movedElements.forEach(
          /**
           * Restores a moved native control to its connected source marker and clears its tracking record.
           *
           * @param {HTMLElement} element Native control previously moved into the header.
           * @returns {void}
           */
          (element) => {
            const source = headerElementSources.get(element);
            if (source?.marker.isConnected) source.marker.before(element);
            source?.marker.remove();
            headerElementSources.delete(element);
          },
        );

        header.remove();
      },
    );

    document.querySelectorAll("#ls-ui-script-styles, .toast-container, .tab-tooltip").forEach(
      /**
       * Removes a transient injected element before native page caching.
       *
       * @param {Element} element Stylesheet, toast container, or tab tooltip to remove.
       * @returns {void}
       */
      (element) => element.remove(),
    );
    document.querySelectorAll(".sidebar-tooltip.active").forEach(
      /**
       * Hides an active sidebar tooltip before native page caching.
       *
       * @param {HTMLElement} tooltip Injected sidebar tooltip to reset.
       * @returns {void}
       */
      (tooltip) => tooltip.classList.remove("active"),
    );
  };

  for (const eventType of ["turbo:before-cache", "turbolinks:before-cache"]) {
    document.addEventListener(eventType, restoreHeaderSources);
  }
}

/**
 * Appends the three header containers and injects settings controls into the right container.
 *
 * @param {HTMLElement} headerEl Header receiving the containers.
 * @param {object} options Feature dependencies.
 * @param {function(HTMLElement): void} options.injectSettingsMenu Inserts the settings menu.
 * @param {function(HTMLElement): void} options.injectSettingsToggleButton Inserts the settings toggle.
 * @returns {void}
 */
function injectHeaderContainers(headerEl, { injectSettingsMenu, injectSettingsToggleButton }) {
  for (let i = 0; i < 3; i += 1) {
    /**
     * Creates the current numbered header container and adds settings controls to the third container.
     *
     * @returns {HTMLDivElement} New header container.
     */
    const createHeaderContainer = () => {
      const containerEl = document.createElement("div");
      const containerNum = i + 1;
      containerEl.classList.add("site-header__container", `container-${containerNum}`);

      if (containerNum === 3) {
        injectSettingsToggleButton(containerEl);
        injectSettingsMenu(containerEl);
      }

      return containerEl;
    };

    headerEl.appendChild(createHeaderContainer());
  }
}

/**
 * Reconciles native navigation, title, and available toggles while preserving settings controls and their listeners.
 *
 * @param {HTMLElement} header Existing custom header.
 * @param {object} options Feature dependencies.
 * @param {function(HTMLElement): void} options.injectSidebarToggleButton Inserts a missing sidebar toggle.
 * @param {function(HTMLElement): void} options.injectTabsPanelToggleButton Inserts a missing tabs-panel toggle.
 * @param {function(HTMLElement, HTMLElement=): void} options.moveTocButtonToHeader Moves and decorates the current TOC control.
 * @returns {void}
 */
function refreshHeader(header, { injectSidebarToggleButton, injectTabsPanelToggleButton, moveTocButtonToHeader }) {
  const left = header.querySelector(".container-1");
  const center = header.querySelector(".container-2");
  const right = header.querySelector(".container-3");
  const hasSidebar = !!document.querySelector(".nav-drawer");
  const loggedOutNav = refreshNativeElement(".columns:has(> #logo + .nav)", left, {
    keepAcrossPages: true,
    available: !hasSidebar,
  });
  if (loggedOutNav) {
    loggedOutNav.classList.remove("clearfix");
    loggedOutNav.classList.add("logged-out-nav");
  }

  const sidebarToggle = refreshToggle(left, ".btn--toggle-sidebar", hasSidebar, injectSidebarToggleButton);
  if (sidebarToggle && left.firstChild !== sidebarToggle) left.insertBefore(sidebarToggle, left.firstChild);

  const breadcrumbs = refreshNativeElement(".gretel-breadcrumbs", center);
  refreshTitle(center, !!breadcrumbs || !!loggedOutNav);

  const tabsToggle = refreshToggle(
    right,
    ".btn--toggle-tabs-panel",
    !!elements.native.tabsPanel,
    injectTabsPanelToggleButton,
  );
  const tocButton = refreshNativeElement(".toc-toggle-button", right, {
    /**
     * Moves and decorates the native TOC button in the right header container.
     *
     * @param {HTMLElement} button Native TOC control.
     * @returns {void}
     */
    onMove: (button) => moveTocButtonToHeader(right, button),
  });
  setElementTocButton(tocButton);

  const settingsToggle = right.querySelector(".btn--toggle-settings");
  if (tocButton && tocButton.nextSibling !== settingsToggle) right.insertBefore(tocButton, settingsToggle);
  const nextControl = tocButton || settingsToggle;
  if (tabsToggle && tabsToggle.nextSibling !== nextControl) right.insertBefore(tabsToggle, nextControl);
}

/**
 * Reconciles a moved native control with the current page, using source markers to retain or restore it safely.
 *
 * @param {string} selector Selector for the native control.
 * @param {HTMLElement} containerEl Header container receiving the control.
 * @param {object} [options={}] Retention and placement options.
 * @param {boolean} [options.keepAcrossPages=false] Retain a connected control across page changes.
 * @param {boolean} [options.available=true] Whether this page supports the control.
 * @param {function(HTMLElement): void} [options.onMove] Moves the new control instead of the default append.
 * @returns {HTMLElement|null} Retained or newly moved control, or null if unavailable.
 */
function refreshNativeElement(selector, containerEl, { keepAcrossPages = false, available = true, onMove } = {}) {
  const header = containerEl.closest(".site-header");
  const currentElement = containerEl.querySelector(selector);
  const nextElement = available
    ? [...document.querySelectorAll(selector)].find(
        /**
         * Selects native controls that are outside the current custom header.
         *
         * @param {HTMLElement} element Candidate native control.
         * @returns {boolean} Whether the control belongs to the native page content.
         */
        (element) => !header.contains(element),
      )
    : null;
  const pageUrl = `${window.location.pathname}${window.location.search || ""}`;

  if (currentElement) {
    const source = headerElementSources.get(currentElement);
    if (!nextElement && available && source?.marker.isConnected && (keepAcrossPages || source.pageUrl === pageUrl)) {
      return currentElement;
    }
    // History can change before the outgoing DOM is cached or replaced.
    // Preserve its native controls so cached book pages can restore them.
    if (available && !nextElement && source?.marker.isConnected) source.marker.before(currentElement);
    else currentElement.remove();
    source?.marker.remove();
    headerElementSources.delete(currentElement);
  }

  if (!nextElement) return null;

  const marker = document.createComment("Launch School UX Kit header source");
  nextElement.before(marker);
  headerElementSources.set(nextElement, { marker, pageUrl });
  if (onMove) onMove(nextElement);
  else containerEl.appendChild(nextElement);
  return nextElement;
}

/**
 * Removes an unavailable toggle or injects it when missing.
 *
 * @param {HTMLElement} containerEl Header container owning the toggle.
 * @param {string} selector Selector for the toggle.
 * @param {boolean} available Whether the current page supports it.
 * @param {function(HTMLElement): void} injectButton Inserts the missing toggle.
 * @returns {HTMLElement|null} Current toggle, or null if unavailable.
 */
function refreshToggle(containerEl, selector, available, injectButton) {
  const button = containerEl.querySelector(selector);
  if (!available) {
    button?.remove();
    return null;
  }
  if (!button) injectButton(containerEl);
  return containerEl.querySelector(selector);
}

/**
 * Removes fallback text when native navigation supplies a heading, otherwise updates it from the catalog or document title.
 *
 * @param {HTMLElement} containerEl Center header container.
 * @param {boolean} hasNativeHeading Whether breadcrumbs or logged-out navigation provide the heading.
 * @returns {void}
 */
function refreshTitle(containerEl, hasNativeHeading) {
  let headerTitle = containerEl.querySelector(".title-text");
  if (hasNativeHeading) {
    headerTitle?.remove();
    return;
  }

  const currentUrl = window.location.pathname;
  let titleEl;

  if (currentUrl.startsWith("/course_catalog/")) {
    // Add the courses-tabs title if on the courses page
    titleEl = document.querySelector(".courses-tabs li.active a");
  } else {
    titleEl = document.querySelector("title");
  }

  const titleText = titleEl?.textContent.trim();
  const defaultTitle = "Launch School - an online school for Software Engineers";

  if (!titleText || titleText === defaultTitle) {
    headerTitle?.remove();
    return;
  }
  if (!headerTitle) {
    headerTitle = document.createElement("div");
    headerTitle.classList.add("title-text");
    containerEl.appendChild(headerTitle);
  }
  if (headerTitle.textContent !== titleText) headerTitle.textContent = titleText;
}
