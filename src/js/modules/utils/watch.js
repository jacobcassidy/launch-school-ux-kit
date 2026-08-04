/**
 * WATCH
 * @module utils/watch
 */

// Import Utils
import { activateHotkey } from "./activate.js";
import { colorLog } from "./log.js";
import { elements, states } from "./state.js";
import { handleFocus } from "./focus.js";
import { scheduleReload } from "./load.js";
import { toggleSettingsContainer, toggleSidebar, toggleTabsPanel } from "./toggle.js";
import { showToast } from "./show.js";

/**
 * WATCH FOR CONTENT CHANGE
 */
export function watchForMissingHeader() {
  // colorLog.run("Running watchForMissingHeader()");
  if (document.documentElement.dataset.headerObserverBound) {
    // colorLog.detail("Header watch already exist. Exited watchForMissingHeader().");
    return;
  }
  document.documentElement.dataset.headerObserverBound = "true";

  let headerMissingTimeoutId;

  // Observe .site-header for mutations
  const observer = new MutationObserver(() => {
    // colorLog.detail("Running contentChange observer");

    if (document.querySelector(".site-header")) {
      clearTimeout(headerMissingTimeoutId);
      headerMissingTimeoutId = undefined;
      return;
    }

    if (headerMissingTimeoutId) return;

    headerMissingTimeoutId = setTimeout(() => {
      headerMissingTimeoutId = undefined;
      const siteHeader = document.querySelector(".site-header");
      if (siteHeader) {
        // colorLog.detail("header exists again.");
      } else {
        colorLog.detail(".site-header has been missing for over 300ms. Scheduling reload.");
        scheduleReload();
      }
    }, 300);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

/**
 * WATCH FOR URL CHANGE
 */
export function watchForUrlChange() {
  // colorLog.run("Running watchForUrlChange()");

  if (document.documentElement.dataset.watchPageBound) {
    // colorLog.detail("URL watch already exist. Exited watchForUrlChange().");
    return;
  }
  document.documentElement.dataset.watchPageBound = "true";

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  /**
   * CHECK FOR URL CHANGE
   * Schedules a UI reload if the page URL has changed.
   *
   * @param {string} from Where this function was called from.
   */
  const checkForUrlChange = (from) => {
    colorLog.detail(`checkForUrlChange() called from ${from}`);

    if (states.load.isReloadScheduled) {
      // colorLog.detail("Reload already scheduled. Exited checkForUrlChange().");
      return;
    }

    const currentUrl = `${location.origin}${location.pathname}`;
    const isChangedUrl = currentUrl !== states.load.lastUrl;

    if (!isChangedUrl) {
      // colorLog.detail("No URL change detected. Exiting checkForUrlChange().");
      return;
    }

    colorLog.detail("URL has changed.");
    scheduleReload();
  };

  // Triggered by browsers back/forward navigation
  window.addEventListener("popstate", () => {
    // colorLog.notice("popstate: Browser back/forward nav");
    checkForUrlChange("popstate");
  });

  // Triggered by url hashchange such as /page to /page#section2
  window.addEventListener("hashchange", () => {
    // colorLog.notice("hashchange in URL");
    checkForUrlChange("hashchange");
  });

  // Triggered by turbo:load
  document.addEventListener("turbo:load", () => {
    // colorLog.alert("EVENT UPDATE! turbo:load");
    checkForUrlChange("turbo:load");
  });

  // Triggered by turbo:render
  document.addEventListener("turbo:render", () => {
    // colorLog.alert("EVENT UPDATE! turbo:render");
    checkForUrlChange("turbo:render");
  });

  // Triggered by pushState
  history.pushState = function (...args) {
    // colorLog.notice("history.pushState");
    originalPushState.apply(this, args);
    checkForUrlChange("pushState");
  };

  // Triggered by replaceState
  history.replaceState = function (...args) {
    // colorLog.notice("history.replaceState");
    originalReplaceState.apply(this, args);
    checkForUrlChange("replaceState");
  };
}

/**
 * WATCH HOTKEYS
 * Runs the activated hotkey
 */
export function watchHotkeys() {
  // colorLog.run("Running watchHotkeys()");

  if (document.documentElement.dataset.hotkeysBound) {
    // colorLog.detail("Hotkeys already exist. Exited watchHotkeys().");
    return;
  }
  document.documentElement.dataset.hotkeysBound = "true";

  document.addEventListener("keydown", (event) => {
    const keyAlt = event.altKey;
    const keyCmd = event.metaKey;
    const keyCtrl = event.ctrlKey;
    const keyShift = event.shiftKey;
    const isCmdCtrl = keyCmd && keyCtrl && !keyShift && !keyAlt;
    const isCmdOnly = keyCmd && !keyAlt && !keyCtrl && !keyShift;
    let modifier;

    if (isCmdOnly) modifier = "cmdOnly";
    if (isCmdCtrl) modifier = "cmdCtrl";

    if (event.repeat || (!isCmdOnly && !isCmdCtrl)) return;

    if (isCmdOnly) {
      if (event.code !== "Digit1" && event.code !== "Digit2" && event.code !== "Digit3") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (event.code === "Digit3" && !states.hotkeys.cmdOnly.Digit3) {
        showToast("No Tabs Panel available on this page to toggle", "warn");
      }
    } else if (isCmdCtrl) {
      if (
        event.code !== "Digit1" &&
        event.code !== "Digit2" &&
        event.code !== "Digit3" &&
        event.code !== "Digit4" &&
        event.code !== "Digit5" &&
        event.code !== "Digit6" &&
        event.code !== "KeyC" &&
        event.code !== "KeyE" &&
        event.code !== "KeyM" &&
        event.code !== "KeyN" &&
        event.code !== "KeyR" &&
        event.code !== "KeyT" &&
        event.code !== "Comma"
      )
        return;
    }

    activateHotkey(modifier, event.code);
  });
}

/**
 * WATCH PROMPT SUBMISSION
 * Refocuses the LSBOT prompt after the prompt is submitted.
 */
export function watchPromptSubmission() {
  // colorLog.run("Running watchPromptSubmission()");

  const lsbotPromptInputs = document.querySelectorAll(".lsbot-question-input");
  if (lsbotPromptInputs.length < 1) return;

  lsbotPromptInputs.forEach((prompt) => {
    if (prompt.dataset.focusObserverBound) {
      // colorLog.detail("Prompt watch already exist. Exited watchPromptSubmission() for this prompt.");
      return;
    }
    prompt.dataset.focusObserverBound = "true";

    let observer = null;

    prompt.addEventListener("focus", () => {
      observer?.disconnect();

      observer = new MutationObserver(() => {
        // colorLog.run("Running prompt observer()");
        // if (prompt.disabled)  console.log("Prompt is disabled.");

        if (!prompt.disabled) {
          observer.disconnect();
          // console.log("Prompt focused.");
          prompt.focus();
        }
      });

      observer.observe(prompt, {
        attributes: true,
        attributeFilter: ["disabled"],
      });
    });
  });
}

/**
 * WATCH QUESTION BOXES
 * Opens the Tabs Panel with the LSBOT tab active when a question box submission is made.
 */
export function watchQuestionBoxes() {
  // colorLog.run("Running watchQuestionBoxes()");
  const questionBoxes = document.querySelectorAll(".lsbot-question-box");
  if (questionBoxes.length < 1 || !elements.native.tabsPanel) return;

  const lsbotTabBtn = document.querySelector(".tab-button[data-tab='lsbot-help']");

  const handleSubmitClick = () => {
    // colorLog.run("Running handleSubmitClick()");
    handleFocus(lsbotTabBtn);
  };

  const handleSubmitHotkey = (event) => {
    // colorLog.run("Running handleSubmitHotkey()");
    const keyAlt = event.altKey;
    const keyCmd = event.metaKey;
    const keyCtrl = event.ctrlKey;
    const keyEnter = event.key === "Enter";
    const keyShift = event.shiftKey;
    const isCmdEnter = keyCmd && keyEnter && !keyAlt && !keyCtrl && !keyShift;
    if (!isCmdEnter) return;
    handleFocus(lsbotTabBtn);
  };

  questionBoxes.forEach((box) => {
    if (box.dataset.questionEventBound) {
      // colorLog.detail("Question box watch already exist. Exited watchQuestionBoxes() for this box.");
      return;
    }
    box.dataset.questionEventBound = "true";

    const boxSendLink = box.querySelector(".lsbot-question-link");
    const boxSubmitButton = box.querySelector(".lsbot-question-box-send-answer-button");
    boxSendLink.addEventListener("click", handleSubmitClick);
    boxSubmitButton.addEventListener("click", handleSubmitClick);

    const boxTextarea = box.querySelector(".lsbot-question-box-answer-input");
    boxTextarea.addEventListener("focus", () => boxTextarea.addEventListener("keydown", handleSubmitHotkey));
    boxTextarea.addEventListener("blur", () => boxTextarea.removeEventListener("keydown", handleSubmitHotkey));
  });
}

/**
 * WATCH SETTINGS CONTAINER TOGGLE BUTTON
 * Toggles the settings container when clicked.
 */
export function watchSettingContainerToggleBtn() {
  // colorLog.run("Running watchSettingContainerToggleBtn()");
  const settingsContainerToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsContainerToggleBtn) return;

  if (settingsContainerToggleBtn.dataset.settingsContainerToggleBtnEventBound) {
    // colorLog.detail("Settings Container Toggle Button watch already exist. Exited watchSettingContainerToggleBtn().");
    return;
  }
  settingsContainerToggleBtn.dataset.settingsContainerToggleBtnEventBound = "true";

  settingsContainerToggleBtn.addEventListener("click", () => toggleSettingsContainer());
}

/**
 * WATCH SIDEBAR LINKS
 */
export function watchSidebarLinks() {
  // colorLog.run("Running watchSidebarLinks()");
  const toggleListSection = () => {
    const listHeaderBtns = document.querySelectorAll(".sidebar-list-toggle-btn");

    listHeaderBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-closed");
      });
    });
  };

  const togglePagesDropdown = () => {
    const pagesLink = document.querySelector(".sidebar-list__item .pages");
    const pagesDropdown = document.querySelector(".sidebar-list__item .pages + .dropdown");

    pagesLink.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      pagesDropdown.classList.toggle("expanded");
    });
  };

  const toggleTooltip = () => {
    const sidebarLinks = document.querySelectorAll(".sidebar-lists a");
    if (sidebarLinks.length < 1) return;

    const handleTooltip = (link) => {
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

  toggleListSection();
  togglePagesDropdown();
  toggleTooltip();
}

/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * Toggles the sidebar when the button is clicked
 */
export function watchSidebarToggleBtn() {
  // colorLog.run("Running watchSidebarToggleBtn()");
  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) return;

  if (sidebarToggleBtn.dataset.sidebarBtnEventBound) {
    // colorLog.detail("Sidebar Toggle Button watch already exist. Exited watchSidebarToggleBtn().");
    return;
  }
  sidebarToggleBtn.dataset.sidebarBtnEventBound = "true";

  sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
}

/**
 * WATCH TAB BUTTONS
 * Run handleFocus() on each tab button click
 */
export function watchTabBtns() {
  // colorLog.run("Running watchTabBtns()");
  const tabButtons = document.querySelectorAll(".tab-button");
  if (tabButtons.length < 1) return;

  const handleTooltip = (tabBtn) => {
    const btnDataTabStr = tabBtn.getAttribute("data-tab");
    const tabTooltip = document.querySelector(`.tab-tooltip-${btnDataTabStr}`);

    const handleTooltipRemoval = () => {
      // colorLog.detail("Running removeTooltip()");
      tabTooltip.classList.remove("active");
    };

    const tabBtnWidth = tabBtn.offsetWidth;
    const tabTooltipWidth = tabTooltip.offsetWidth;
    const tabRect = tabBtn.getBoundingClientRect();

    tabTooltip.classList.add("active");
    tabTooltip.style.left = `${tabRect.left + tabBtnWidth / 2 - tabTooltipWidth / 2}px`;
    tabTooltip.style.top = `${tabRect.bottom + 6}px`;

    tabBtn.addEventListener("mouseleave", handleTooltipRemoval, { once: true });
  };

  tabButtons.forEach((tabBtn) => {
    if (tabBtn.dataset.tabBtnEventBound) {
      // colorLog.detail("Tab Button watch already exist. Exited watchTabBtns() for this tab button.");
      return;
    }
    tabBtn.dataset.tabBtnEventBound = "true";

    tabBtn.addEventListener("click", () => {
      handleFocus(tabBtn);
    });

    tabBtn.addEventListener("mouseenter", () => {
      handleTooltip(tabBtn);
    });
  });
}

/**
 * WATCH TABS PANEL TOGGLE BUTTON
 */
export function watchTabsPanelToggleBtn() {
  // colorLog.run("Running watchTabsPanelToggleBtn()");
  const tabsPanelToggleBtn = elements.injected.tabsPanelToggleButton;
  if (!tabsPanelToggleBtn) return;

  if (tabsPanelToggleBtn.dataset.tabsPanelToggleBtnEventBound) {
    // colorLog.detail("Tabs Panel Toggle Button watch already exist. Exited watchTabsPanelToggleBtn().");
    return;
  }
  tabsPanelToggleBtn.dataset.tabsPanelToggleBtnEventBound = "true";

  tabsPanelToggleBtn.addEventListener("click", () => toggleTabsPanel());
}

/**
 * WATCH MARK TOGGLE BUTTON
 */
export function watchMarkToggleBtn(markCompleteIcon, markIncompleteIcon) {
  // colorLog.run("Running watchMarkToggleBtn");
  const instructionsTab = document.querySelector("#tab-instructions");
  if (!instructionsTab) return;

  let markForm = instructionsTab.querySelector(".edit_exercise_submission");

  const handleNewMarkForm = (markForm) => {
    const markBtn = markForm.querySelector("button");
    if (markBtn) {
      const hasDeleteInput = markForm.querySelector("input[value=delete]");
      hasDeleteInput
        ? markBtn.prepend(markIncompleteIcon.cloneNode(true))
        : markBtn.prepend(markCompleteIcon.cloneNode(true));
      markBtn.classList.add("has-new-icon");
    }
  };

  const observer = new MutationObserver(() => {
    const newMarkForm = instructionsTab.querySelector(".edit_exercise_submission");

    if (newMarkForm && newMarkForm !== markForm) {
      markForm = newMarkForm;
      handleNewMarkForm(markForm);
    }
  });

  observer.observe(instructionsTab, {
    childList: true,
    subtree: true,
  });
}

export function watchViewSolutionBtn(btn, svgIcons) {
  const parent = document.querySelector("#exercise_analysis .markup-collapse");
  if (!parent) return;

  let previousState = parent.classList.contains("open") ? "open" : "closed";

  const handleUpdatedSolutionBtn = () => {
    svgIcons.forEach((svg) => {
      btn.prepend(svg);
    });
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName !== "class") continue;

      const state = parent.classList.contains("open") ? "open" : "closed";
      if (state && state !== previousState) {
        previousState = state;
        handleUpdatedSolutionBtn();
      }
    }
  });

  observer.observe(parent, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
