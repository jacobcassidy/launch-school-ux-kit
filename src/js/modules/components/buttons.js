/**
 * BUTTONS
 * @module components/buttons
 */

// Import Components
import { icons } from "./icons.js";

// Import Utils
// import { colorLog } from "../utils/log.js";
import { elements } from "../utils/state.js";
import { watchMarkToggleBtn, watchRunCodeBtn, watchViewSolutionBtn } from "../utils/watch.js";

/**
 * INJECT SETTINGS CONTAINER TOGGLE BUTTON
 * Injects a .btn-toggle-settings-container button in the .site-header to toggle the Settings Container when clicked.
 *
 * @param {HTMLElement} containerEl The container to which the button will be appended.
 */
export function injectSettingsToggleButton(containerEl) {
  const createSettingsToggleButton = () => {
    const settingsToggleButtonEl = document.createElement("button");
    settingsToggleButtonEl.classList.add("site-header__button", "btn--toggle-settings", "has-dropdown");
    settingsToggleButtonEl.title = "Toggle Hotkeys Container";
    settingsToggleButtonEl.appendChild(icons.headerIcons.settings());
    return settingsToggleButtonEl;
  };

  containerEl.appendChild(createSettingsToggleButton());
}

/**
 * INJECT SIDEBAR TOGGLE BUTTON
 * Injects a .btn--toggle-sidebar button in the .site-header__container to toggle the sidebar when clicked.
 *
 * @param {HTMLDivElement} containerEl The container to which the button will be appended.
 */
export function injectSidebarToggleButton(containerEl) {
  const createSidebarToggleButton = () => {
    const sidebarToggleButtonEl = document.createElement("button");
    sidebarToggleButtonEl.classList.add("site-header__button", "btn--toggle-sidebar");
    sidebarToggleButtonEl.title = "Toggle Sidebar";
    const sidebarOpenIconEl = icons.headerIcons.sidebarOpen();
    sidebarOpenIconEl.classList.add("sidebar-open-icon");
    const sidebarCloseIconEl = icons.headerIcons.sidebarClose();
    sidebarCloseIconEl.classList.add("sidebar-close-icon");
    sidebarToggleButtonEl.appendChild(sidebarOpenIconEl);
    sidebarToggleButtonEl.appendChild(sidebarCloseIconEl);
    return sidebarToggleButtonEl;
  };

  containerEl.appendChild(createSidebarToggleButton());
}

/**
 * INJECT TABS PANEL TOGGLE BUTTON
 * Injects a .btn--toggle-tabs-panel button in the .site-header to toggle the Tabs Panel when clicked.
 *
 * @param {HTMLDivElement} containerEl The container to which the button will be appended.
 */
export function injectTabsPanelToggleButton(containerEl) {
  const tabsPanel = elements.native.tabsPanel;
  if (!tabsPanel) return;

  const createTabsPanelToggleButton = () => {
    const tabsPanelToggleButtonEl = document.createElement("button");
    tabsPanelToggleButtonEl.classList.add("site-header__button", "btn--toggle-tabs-panel");
    tabsPanelToggleButtonEl.title = "Toggle Tabs Panel";
    tabsPanelToggleButtonEl.appendChild(icons.headerIcons.tabsPanel());
    return tabsPanelToggleButtonEl;
  };

  containerEl.appendChild(createTabsPanelToggleButton());
}

/**
 * MOVE TOC BUTTON TO HEADER
 * Moves the book's Table of Contents toggle button to the header
 *
 * @param {HTMLElement} containerEl The container to which the TOC button will be appended.
 */
export function moveTocBtnToHeader(containerEl) {
  const bookTocBtn = document.querySelector(".toc-toggle-button");
  if (bookTocBtn) {
    bookTocBtn.classList.add("site-header__button", "has-dropdown", ".btn--toggle-toc");
    bookTocBtn.title = "Toggle Table of Contents";

    containerEl.appendChild(bookTocBtn);
  }
}

/**
 * UPDATE PANEL BUTTONS
 * Replaces the native button icons with lucide icons
 */
export function updatePanelButtons() {
  // colorLog.run("Running updatePanelButtons()");

  const panelButtons = {
    copyCodeMarkup: {
      elements: document.querySelectorAll(".markup-copy-block button"),
      icons: [icons.panelIcons.copy(), icons.panelIcons.checkmark()],
    },
    copyCode: {
      elements: document.querySelectorAll(".btn-copy-code"),
      icons: [icons.panelIcons.copy()],
    },
    exerciseMarkToggle: {
      elements: document.querySelectorAll(".edit_exercise_submission button"),
      icons: [icons.panelIcons.markComplete(), icons.panelIcons.markIncomplete()],
    },
    newConversations: {
      elements: document.querySelectorAll(".new-conversation-button"),
      icons: [icons.panelIcons.conversationNew()],
    },
    nextExercise: {
      elements: [elements.native.nextExerciseButton],
      icons: [icons.panelIcons.nextExercise()],
    },
    runCode: {
      elements: document.querySelectorAll(".btn-run-code"),
      icons: [icons.panelIcons.run(), icons.panelIcons.stop()],
    },
    showConversationHistory: {
      elements: document.querySelectorAll(".conversation-history-button"),
      icons: [icons.panelIcons.conversationHistory()],
    },
    tableOfContents: {
      elements: document.querySelectorAll(".toc-toggle-button"),
      icons: [icons.headerIcons.toc()],
    },
    viewSolution: {
      elements: document.querySelectorAll("button[data-target='#solution-analysis-collapse']"),
      icons: [icons.panelIcons.viewShow(), icons.panelIcons.viewHide()],
    },
  };

  for (const [btnLabel, btnConfig] of Object.entries(panelButtons)) {
    const btnEls = btnConfig.elements;
    if (btnEls.length < 1 || btnEls[0] === null) continue;

    const btnIconEls = btnConfig.icons;

    btnEls.forEach((btnEl) => {
      if (!btnEl || btnEl.classList.contains("has-new-icon")) return;

      const isExerciseMarkToggle = btnLabel === "exerciseMarkToggle";
      const isCopyCodeMarkup = btnLabel === "copyCodeMarkup";
      const isRunCode = btnLabel === "runCode";
      const isViewSolution = btnLabel === "viewSolution";

      let newIcons = [];

      btnIconEls.forEach((iconEl) => {
        iconEl.classList.add("new-icon");
        newIcons.push(iconEl);
      });

      if (isExerciseMarkToggle) {
        const markForm = document.querySelector(".edit_exercise_submission");
        const hasDeleteInput = markForm.querySelector("input[value=delete]");
        hasDeleteInput ? btnEl.prepend(newIcons[1]) : btnEl.prepend(newIcons[0]);
        watchMarkToggleBtn(newIcons[0], newIcons[1]);
      } else if (isCopyCodeMarkup) {
        newIcons.forEach((iconEl) => {
          btnEl.prepend(iconEl.cloneNode(true));
        });
      } else if (isRunCode) {
        btnEl.prepend(newIcons[0]);
        watchRunCodeBtn(btnEl, newIcons[0], newIcons[1]);
      } else if (isViewSolution) {
        newIcons.forEach((iconEL) => {
          btnEl.prepend(iconEL);
        });
        watchViewSolutionBtn(btnEl, newIcons);
      } else {
        btnEl.prepend(newIcons[0]);
      }

      btnEl.classList.add("has-new-icon");
    });
  }
}

/**
 * UPDATE TAB BUTTONS
 * Replaces native text and icon with a new icon and tooltip
 */
export function updateTabButtons() {
  // colorLog.run("Running updateTabButtons()");

  const createTabTooltip = (tooltipText, btnDataTab) => {
    const tooltipEl = document.createElement("div");
    tooltipEl.classList.add("tooltip", "tab-tooltip", `tab-tooltip-${btnDataTab}`);
    tooltipEl.textContent = tooltipText;
    document.body.appendChild(tooltipEl);
  };

  const tabBtns = document.querySelectorAll(".tab-button");

  tabBtns.forEach((btn) => {
    const isHidden = getComputedStyle(btn).display === "none";
    if (isHidden) {
      btn.classList.add("is-hidden");
      return;
    }

    // Remove the title and use an aria-label and tooltip instead.
    btn.removeAttribute("title");

    const btnDataTab = btn.getAttribute("data-tab");
    let tabIconEl;
    let tooltipFallback;

    switch (btnDataTab) {
      case "instructions":
        tabIconEl = icons.tabIcons.instructions();
        tooltipFallback = "Instructions";
        break;
      case "lsbot-help":
        tabIconEl = icons.tabIcons.lsbot();
        tooltipFallback = "LSBot";
        break;
      case "submit-review":
        tabIconEl = icons.tabIcons.review();
        tooltipFallback = "Submit Review";
        break;
      case "code-editor":
        tabIconEl = icons.tabIcons.scratchpad();
        tooltipFallback = "Scratchpad";
        break;
      case "community":
        tabIconEl = icons.tabIcons.community();
        tooltipFallback = "Community Solutions";
        break;
      case "feedback":
        tabIconEl = icons.tabIcons.feedback();
        tooltipFallback = "Give Feedback";
        break;
      default:
        break;
    }

    const tabTooltipText = btn.innerText.trim() || tooltipFallback;
    btn.setAttribute("aria-label", tabTooltipText);
    btn.replaceChildren(tabIconEl);
    createTabTooltip(tabTooltipText, btnDataTab);
  });
}
