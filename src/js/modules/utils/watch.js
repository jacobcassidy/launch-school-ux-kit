/**
 * WATCH
 * @module utils/watch
 */

// Import Utils
import { activateHotkey } from "./activate.js";
// import { colorLog } from "./log.js";
import { elements, setSettingSidebarHiddenHeaders, setSettingSidebarShrink, states } from "./state.js";
import { handleFocus } from "./focus.js";
import { scheduleReload } from "./load.js";
import { toggleSettings, toggleSidebar, toggleTabsPanel } from "./toggle.js";
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
        // colorLog.info("header exists again.");
      } else {
        // colorLog.notice(".site-header has been missing for over 300ms. Scheduling reload.");
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
    // colorLog.notice(`checkForUrlChange() called from ${from}`);

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

    // colorLog.info("URL has changed.");
    scheduleReload();
  };

  window.addEventListener("popstate", () => checkForUrlChange("popstate"));
  window.addEventListener("hashchange", () => checkForUrlChange("hashchange"));
  document.addEventListener("turbo:load", () => checkForUrlChange("turbo:load"));
  document.addEventListener("turbo:render", () => checkForUrlChange("turbo:render"));

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    checkForUrlChange("pushState");
  };

  history.replaceState = function (...args) {
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
    const isCmdShift = keyCmd && keyShift && !keyCtrl && !keyAlt;
    let modifier;

    if (isCmdCtrl) modifier = "cmdCtrl";
    if (isCmdOnly) modifier = "cmdOnly";
    if (isCmdShift) modifier = "cmdShift";

    if (event.repeat || (!isCmdOnly && !isCmdCtrl && !isCmdShift)) return;

    if (isCmdOnly) {
      if (event.code !== "KeyB") return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    } else if (isCmdShift) {
      if (event.code !== "Digit1" && event.code !== "Digit2") return;

      if (event.code === "Digit2" && !states.hotkeys.cmdShift.Digit2) {
        showToast("No tabs panel available to toggle on this page");
      }
    } else if (isCmdCtrl) {
      if (
        event.code !== "Digit1" &&
        event.code !== "Digit2" &&
        event.code !== "Digit3" &&
        event.code !== "Digit4" &&
        event.code !== "Digit5" &&
        event.code !== "KeyC" &&
        event.code !== "KeyE" &&
        event.code !== "KeyM" &&
        event.code !== "KeyN" &&
        event.code !== "KeyR" &&
        event.code !== "KeyT" &&
        event.code !== "Comma"
      )
        return;

      if (event.code === "KeyC" && !states.hotkeys.cmdCtrl.KeyC) {
        showToast("No editor code available to copy on this page");
      }
      if (event.code === "KeyE" && !states.hotkeys.cmdCtrl.KeyE) {
        showToast("No editor available to focus on this page");
      }
      if (event.code === "KeyM" && !states.hotkeys.cmdCtrl.KeyM) {
        showToast("No exercise to mark status of on this page");
      }
      if (event.code === "KeyN" && !states.hotkeys.cmdCtrl.KeyN) {
        showToast("No next exercise available to go to from this page");
      }
      if (event.code === "KeyR" && !states.hotkeys.cmdCtrl.KeyR) {
        showToast("No reviewer available to focus on this page");
      }
      if (event.code === "KeyT" && !states.hotkeys.cmdCtrl.KeyT) {
        showToast("No table of contents available to toggle on this page");
      }
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
  if (lsbotPromptInputs.length < 1) {
    // colorLog.detail("No lsbot prompt inputs found on this page.");
    return;
  }

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
        // if (prompt.disabled)  colorLog.info("Prompt is disabled.");

        if (!prompt.disabled) {
          observer.disconnect();
          // colorLog.info("Prompt focused.");
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
  if (questionBoxes.length < 1 || !elements.native.tabsPanel) {
    // colorLog.detail("No question boxes found on this page.");
    return;
  }

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
export function watchSettingsToggleBtn() {
  // colorLog.run("Running watchSettingsToggleBtn()");

  const settingsToggleBtn = elements.injected.settingsToggleButton;
  if (!settingsToggleBtn) {
    // colorLog.detail("No settings container toggle button found.");
    return;
  }

  if (settingsToggleBtn.dataset.settingsToggleBtnEventBound) {
    // colorLog.detail("Settings Container Toggle Button watch already exist. Exited watchSettingsToggleBtn().");
    return;
  }
  settingsToggleBtn.dataset.settingsToggleBtnEventBound = "true";

  settingsToggleBtn.addEventListener("click", () => toggleSettings());
}

/**
 * WATCH SIDEBAR LINKS
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

/**
 * WATCH SIDEBAR TOGGLE BUTTON
 * Toggles the sidebar when the button is clicked
 */
export function watchSidebarToggleBtn() {
  // colorLog.run("Running watchSidebarToggleBtn()");

  const sidebarToggleBtn = elements.injected.sidebarToggleButton;
  if (!sidebarToggleBtn) {
    // colorLog.detail("No sidebar toggle button found.");
    return;
  }

  if (sidebarToggleBtn.dataset.sidebarToggleBtnEventBound) {
    // colorLog.detail("Sidebar Toggle Button watch already exist. Exited watchSidebarToggleBtn().");
    return;
  }
  sidebarToggleBtn.dataset.sidebarToggleBtnEventBound = "true";

  sidebarToggleBtn.addEventListener("click", () => toggleSidebar());
}

/**
 * WATCH SETTING SIDEBAR HIDDEN HEADERS TOGGLER
 * Toggles the Sidebar's Hidden Section Headers setting
 */
export function watchSettingSidebarHiddenHeadersToggler() {
  // colorLog.run("Running watchSettingSidebarHiddenHeadersToggler()");

  const settingSidebarHiddenHeadersToggler = document.querySelector("#setting--sidebar-hidden-headers");
  if (!settingSidebarHiddenHeadersToggler) {
    // colorLog.detail("No sidebar hidden headers setting toggler found.");
    return;
  }

  if (settingSidebarHiddenHeadersToggler.dataset.sidebarHiddenHeadersTogglerEventBound) {
    // colorLog.detail(
    // "Sidebar Hidden Headers setting watch already exist. Exited watchSettingSidebarHiddenHeadersToggler().",
    // );
    return;
  }
  settingSidebarHiddenHeadersToggler.dataset.sidebarHiddenHeadersTogglerEventBound = "true";

  settingSidebarHiddenHeadersToggler.addEventListener("change", () => {
    if (settingSidebarHiddenHeadersToggler.checked) {
      setSettingSidebarHiddenHeaders(true);
    } else {
      setSettingSidebarHiddenHeaders(false);
    }
  });
}

/**
 * WATCH SETTING SIDEBAR SHRINK TOGGLER
 * Toggles the Sidebar's collapsed sizing (hidden or shrunken)
 */
export function watchSettingSidebarShrinkToggler() {
  // colorLog.run("Running watchSettingSidebarShrinkToggle()");

  const settingSidebarShrinkToggler = document.querySelector("#setting--sidebar-shrink");
  if (!settingSidebarShrinkToggler) {
    // colorLog.detail("No sidebar shrink setting toggler found.");
    return;
  }

  if (settingSidebarShrinkToggler.dataset.sidebarShrinkTogglerEventBound) {
    // colorLog.detail("Sidebar Shrink setting watch already exist. Exited watchSettingSidebarShrinkToggler().");
    return;
  }
  settingSidebarShrinkToggler.dataset.sidebarShrinkTogglerEventBound = "true";

  settingSidebarShrinkToggler.addEventListener("change", () => {
    if (settingSidebarShrinkToggler.checked) {
      setSettingSidebarShrink(true);
    } else {
      setSettingSidebarShrink(false);
    }
  });
}

/**
 * WATCH TAB BUTTONS
 * Run handleFocus() on each tab button click
 */
export function watchTabBtns() {
  // colorLog.run("Running watchTabBtns()");

  const tabButtons = document.querySelectorAll(".tab-button");
  if (tabButtons.length < 1) {
    // colorLog.detail("No tab buttons found on this page.");
    return;
  }

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
  if (!tabsPanelToggleBtn) {
    // colorLog.detail("No tabs panel toggle button found on this page.");
    return;
  }

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
  if (!instructionsTab) {
    // colorLog.detail("No instructions tab found on this page.");
    return;
  }

  let markForm = instructionsTab.querySelector(".edit_exercise_submission");

  const handleNewMarkForm = (markForm) => {
    const markBtn = markForm.querySelector("button");
    if (markBtn) {
      const hasDeleteInput = markForm.querySelector("input[value=delete]");
      hasDeleteInput ? markBtn.prepend(markIncompleteIcon) : markBtn.prepend(markCompleteIcon);
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

/**
 * WATCH RUN CODE BUTTONS
 */
export function watchRunCodeBtn(btn, runIcon, stopIcon) {
  // colorLog.alert("Running watchRunCodeBtn");

  if (!btn) {
    // colorLog.detail("No run code button found on this page.");
    return;
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        if (btn.classList.contains("stop-button")) {
          btn.prepend(stopIcon);
        } else {
          btn.prepend(runIcon);
        }
      }
    }
  });

  observer.observe(btn, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

/**
 * WATCH VIEW SOLUTIONS BUTTON
 */
export function watchViewSolutionBtn(btn, svgIcons) {
  const parent = document.querySelector("#exercise_analysis .markup-collapse");
  if (!parent) {
    // colorLog.detail("No view solution button found on this page.");
    return;
  }

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
