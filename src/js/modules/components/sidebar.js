/**
 * SIDEBAR
 * @module components/sidebar
 */

// Import Components
import { icons } from "./icons.js";

// Import Utils
// import { colorLog } from "../utils/log.js";
import { setSidebarListsElement, sidebarLists } from "../utils/state.js";
import { syncActiveSidebarItem } from "../utils/sync.js";

/**
 * UPDATE SIDEBAR
 */
export function updateSidebar() {
  const sidebarItemLinks = document.querySelectorAll(".nav-drawer > ul > li > a");
  const sidebar = document.querySelector(".sidebar.nav-drawer");

  // If sidebar already exists, sync active item and exit early.
  if (sidebar) {
    syncActiveSidebarItem();
    return;
  }

  addSidebarLinkClasses();
  removeCountParentheses();

  sidebarItemLinks.forEach((link) => {
    if (!link) return;

    const linkParentElement = link.parentElement;
    const linkClassStr = link.getAttribute("class");
    let linkIconEl;
    let linkLabel;
    let dropdownItemIconEl;
    let tooltipFallback;

    const createSidebarLinkTooltip = (linkEl, tooltipText) => {
      const tooltipDataStr = tooltipText.replace(/\s+/g, "-").toLowerCase();
      const tooltipEl = document.createElement("div");
      const tooltipSpanEl = document.createElement("span");
      tooltipEl.classList.add("tooltip", "sidebar-tooltip", `sidebar-tooltip-${tooltipDataStr}`);
      tooltipSpanEl.textContent = tooltipText;
      tooltipEl.append(tooltipSpanEl);
      document.body.appendChild(tooltipEl);

      linkEl.setAttribute("aria-label", tooltipText);
      linkEl.setAttribute("data-tooltip", tooltipDataStr);
      linkEl.removeAttribute("title");
    };

    if (linkClassStr) {
      switch (true) {
        case linkClassStr.includes("courses"):
          linkLabel = "courses";
          linkIconEl = icons.sidebarIcons.courses();
          tooltipFallback = "Courses";
          break;
        case linkClassStr.includes("forum"):
          linkLabel = "forum";
          linkIconEl = icons.sidebarIcons.forum();
          tooltipFallback = "Forum";
          break;
        case linkClassStr.includes("events"):
          linkLabel = "events";
          linkIconEl = icons.sidebarIcons.events();
          tooltipFallback = "Events";
          break;
        case linkClassStr.includes("social"):
          linkLabel = "social";
          linkIconEl = icons.sidebarIcons.sharing();
          tooltipFallback = "Sharing";
          break;
        case linkClassStr.includes("videos"):
          linkLabel = "videos";
          linkIconEl = icons.sidebarIcons.videos();
          tooltipFallback = "Videos";
          break;
        case linkClassStr.includes("resources"):
          linkLabel = "resources";
          linkIconEl = icons.sidebarIcons.resources();
          tooltipFallback = "Resources";
          break;
        case linkClassStr.includes("my-exercises"):
          linkLabel = "my-exercises";
          linkIconEl = icons.sidebarIcons.myExercises();
          tooltipFallback = "My Exercises";
          break;
        case linkClassStr.includes("exercises"):
          linkLabel = "exercises";
          linkIconEl = icons.sidebarIcons.exercises();
          tooltipFallback = "Exercises";
          break;
        case linkClassStr.includes("bookshelf"):
          linkLabel = "bookshelf";
          linkIconEl = icons.sidebarIcons.bookshelf();
          tooltipFallback = "Bookshelf";
          break;
        case linkClassStr.includes("pages"):
          linkLabel = "pages";
          linkIconEl = icons.sidebarIcons.pages();
          dropdownItemIconEl = () => icons.sidebarIcons.page();
          tooltipFallback = "Pages";
          break;
        case linkClassStr.includes("archives"):
          linkLabel = "archives";
          linkIconEl = icons.sidebarIcons.archives();
          tooltipFallback = "Archives";
          break;
        case linkClassStr.includes("chat"):
          linkLabel = "chat";
          linkIconEl = icons.sidebarIcons.chat();
          tooltipFallback = "Chat Room";
          break;
        case linkClassStr.includes("my-account"):
          linkLabel = "my-account";
          linkIconEl = icons.sidebarIcons.myAccount();
          tooltipFallback = "My Account";
          break;
        case linkClassStr.includes("my-assessments"):
          linkLabel = "my-assessments";
          linkIconEl = icons.sidebarIcons.myAssessments();
          tooltipFallback = "My Assessments";
          break;
        case linkClassStr.includes("exit"):
          linkLabel = "sign-out";
          linkIconEl = icons.sidebarIcons.signOut();
          tooltipFallback = "Sign Out";
          break;
        default:
          linkLabel = null;
          linkIconEl = null;
          tooltipFallback = null;
          break;
      }

      // Regex removes any (#) text from the tooltipText
      const tooltipText = link.innerText.replace(/\([^)]*\)/g, "").trim() || tooltipFallback;
      createSidebarLinkTooltip(link, tooltipText);

      // Set the item in the sidebarLists object if it exists
      if (linkLabel && linkParentElement) setSidebarListsElement(linkParentElement, linkLabel);

      // Replace link icon with custom icon if it exists
      if (linkIconEl) link.prepend(linkIconEl);

      // Add icon to dropdown items if they exists
      if (dropdownItemIconEl) {
        const sidebarDropdownLinks = document.querySelectorAll(".nav-drawer li.has-dropdown ul.dropdown li a");

        if (sidebarDropdownLinks.length > 0) {
          sidebarDropdownLinks.forEach((dropdownLink) => {
            dropdownLink.prepend(dropdownItemIconEl());
          });
        }
      }
    }
  });

  reorderSidebarLists();
  injectSidebarHeader();
  syncActiveSidebarItem();
}

/**
 * ADD SIDEBAR LINK CLASSES
 */
function addSidebarLinkClasses() {
  const sidebar = document.querySelector(".nav-drawer");
  const assessmentLink = sidebar.querySelector(".assessments");
  const exercisesLinks = sidebar.querySelectorAll(".exercises");

  if (!assessmentLink || exercisesLinks.length < 1) return;

  assessmentLink ? assessmentLink.classList.add("my-assessments") : null;

  exercisesLinks.forEach((link) => {
    const linkTitleStr = link.getAttribute("title");

    if (linkTitleStr?.includes("My Exercises")) {
      link.classList.add("my-exercises");
    }
  });
}

/**
 * INJECT SIDEBAR HEADER
 */
function injectSidebarHeader() {
  const sidebar = document.querySelector(".nav-drawer");
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

/**
 * REMOVE COUNT PARENTHESES
 */
function removeCountParentheses() {
  // colorLog.run("Running removeCountParentheses()");

  const counts = document.querySelectorAll('.nav-drawer [class*="_unread_count"]');
  if (counts.length < 1) return;

  counts.forEach((count) => {
    const runWhenHasCountText = () => {
      const countText = count.textContent.trim();
      if (!countText) return;

      observer.disconnect();

      const newCountEl = document.createElement("span");
      newCountEl.className = "unread-count";
      newCountEl.textContent = countText.replace(/[()]/g, "");
      count.after(newCountEl);
    };

    const observer = new MutationObserver(runWhenHasCountText);

    observer.observe(count, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    // Disconnect unneeded observers
    setTimeout(() => {
      observer.disconnect();
    }, 1500);

    runWhenHasCountText();
  });
}

/**
 * REORDER SIDEBAR LISTS
 */
function reorderSidebarLists() {
  const sidebar = document.querySelector(".nav-drawer");
  sidebar.classList.add("sidebar");
  const updatedListsWrapperEl = document.createElement("div");
  updatedListsWrapperEl.className = "sidebar-lists";
  const sidebarListsNames = Object.keys(sidebarLists);

  sidebarListsNames.forEach((listName) => {
    const listClassName = listName.replace(/([A-Z])/g, "-$1").toLowerCase();
    const listWrapperEl = document.createElement("div");
    listWrapperEl.className = `sidebar-list-wrapper ${listClassName}-wrapper`;
    const listEl = document.createElement("ul");
    listEl.className = `sidebar-list ${listClassName}`;

    for (const [listKey, listProperties] of Object.entries(sidebarLists)) {
      if (listKey === listName) {
        for (const [propertyKey, propertyValue] of Object.entries(listProperties)) {
          if (propertyKey === "listElements") {
            propertyValue.forEach((item) => {
              item.className = "sidebar-list__item";
              listEl.appendChild(item);
            });
          }
          if (propertyKey === "listTitle") {
            const listHeaderEl = document.createElement("button");
            listHeaderEl.className = "sidebar-list-toggle-btn";
            const listHeaderTitleEl = document.createElement("span");
            listHeaderTitleEl.className = "list-title";
            listHeaderTitleEl.innerText = propertyValue;
            listHeaderEl.appendChild(listHeaderTitleEl);
            listHeaderEl.appendChild(icons.sidebarIcons.toggle());
            listWrapperEl.appendChild(listHeaderEl);
          }
        }
      }
    }
    listWrapperEl.appendChild(listEl);
    updatedListsWrapperEl.appendChild(listWrapperEl);
  });

  if (sidebar) sidebar.appendChild(updatedListsWrapperEl);
}
