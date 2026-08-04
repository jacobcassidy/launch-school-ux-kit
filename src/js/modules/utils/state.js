/**
 * STATE
 * @module utils/state
 */

export const elements = {
  injected: {
    header: null,
    settingsContainer: null,
    settingsToggleButton: null,
    sidebarToggleButton: null,
    tabsPanelToggleButton: null,
    sidebarShrinkToggler: null,
  },
  native: {
    contentPanel: null,
    editorPanel: null,
    instructionsPanel: null,
    nextExerciseButton: null,
    scratchpad: null,
    sidebar: null,
    tabNav: null,
    tabsPanel: null,
    tocButton: null,
  },
};

export const sidebarLists = {
  mainList: {
    listElements: [],
    listOrder: {
      courses: 1,
      exercises: 2,
      bookshelf: 3,
    },
    listTitle: "Study",
  },

  communityList: {
    listElements: [],
    listOrder: {
      chat: 1,
      events: 2,
      forum: 3,
    },
    listTitle: "Community",
  },

  extrasList: {
    listElements: [],
    listOrder: {
      archives: 1,
      pages: 2,
      resources: 3,
      social: 4,
      videos: 5,
    },
    listTitle: "Extras",
  },

  accountList: {
    listElements: [],
    listOrder: {
      "my-account": 1,
      "my-assessments": 2,
      "my-exercises": 3,
      "sign-out": 4,
    },
    listTitle: "Account",
  },
};

export const states = {
  elements: {
    header: {
      isHidden: sessionStorage.getItem("isHeaderHidden") === "true",
    },
    sidebar: {
      isCollapsed:
        sessionStorage.getItem("isSidebarCollapsed") === "true" || document.querySelector("#navbar-collapsor").checked,
      isSettingSidebarShrinkOn: sessionStorage.getItem("isSettingSidebarShrinkOn") === "true",
    },
    tabsPanel: {
      isHidden: sessionStorage.getItem("isTabsPanelHidden") === "true",
    },
  },
  hotkeys: {
    cmdOnly: {},
    cmdCtrl: {},
    native: {},
  },
  load: {
    isReloadScheduled: false,
    lastUrl: null,
    previousBody: null,
  },
};

// SET INJECTED ELEMENTS
export function setElementHeader(el) {
  elements.injected.header = el;
}

export function setElementSettingsContainer(el) {
  elements.injected.settingsContainer = el;
}

export function setElementSettingsToggleBtn(el) {
  elements.injected.settingsToggleButton = el;
}

export function setElementSidebarShrinkToggler(el) {
  elements.injected.sidebarShrinkToggler = el;
}

export function setElementSidebarToggleButton(el) {
  elements.injected.sidebarToggleButton = el;
}

export function setElementTabsPanelToggleButton(el) {
  elements.injected.tabsPanelToggleButton = el;
}

// SET NATIVE ELEMENTS
export function setElementContentPanel(el) {
  elements.native.contentPanel = el;
}

export function setElementEditorPanel(el) {
  elements.native.editorPanel = el;
}

export function setElementInstructionsPanel(el) {
  elements.native.instructionsPanel = el;
}

export function setElementNextExerciseButton(el) {
  elements.native.nextExerciseButton = el;
}

export function setElementScratchpad(el) {
  elements.native.scratchpad = el;
}

export function setElementSidebar(el) {
  elements.native.sidebar = el;
}

export function setElementTabsPanel(el) {
  elements.native.tabsPanel = el;
}

export function setElementTabNav(el) {
  elements.native.tabNav = el;
}

export function setElementTocButton(el) {
  elements.native.tocButton = el;
}

/**
 * SET SIDEBAR LISTS LINK
 *
 * @param {HTMLElement} parentElement The sidebar list link's parent li element to be set.
 * @param {string} linkLabel The name of the sidebar list link item to be set.
 */
export function setSidebarListsElement(parentElement, linkLabel) {
  let listElements;

  for (const listProperties of Object.values(sidebarLists)) {
    for (const [propertyName, propertyValue] of Object.entries(listProperties)) {
      if (propertyName === "listElements") {
        listElements = propertyValue;
      }

      if (propertyName === "listOrder") {
        for (const [linkName, linkOrder] of Object.entries(propertyValue)) {
          if (linkName === linkLabel) {
            if (listElements) listElements[linkOrder - 1] = parentElement;
          }
        }
      }
    }
  }
}

/**
 * SET AVAILABLE HOTKEY
 *
 * @param {string} modifier The settings object's modifier key name being accessed [cmdCtrl, cmdOnly].
 * @param {string} key The event.code name for the key being pressed with the modifier keys.
 * @param {string|number} symbol The key symbol to displayed in the settings container.
 * @param {string} label The hotkey label to displayed in the settings container.
 * @param {() => void|null} callbackFunc The function that will run when the hotkey is triggered.
 */
export function setAvailableHotkey(modifier, key, symbol, label, callbackFunc = null) {
  let callback;
  if (!callbackFunc) {
    callback = null;
  } else {
    callback = () => callbackFunc();
  }

  states.hotkeys[modifier][key] = { callback: callback, label: label, symbol: symbol };
}

// SET IS HEADER HIDDEN STATE
export function setIsHeaderHidden(value) {
  if (value === true) {
    elements.injected.header.classList.add("is-hidden");
  } else {
    elements.injected.header.classList.remove("is-hidden");
  }

  states.elements.header.isHidden = value;
  sessionStorage.setItem("isHeaderHidden", value);
}

// SET IS RELOAD SCHEDULED STATE
export function setIsReloadScheduled(value) {
  states.load.isReloadScheduled = value;
}

// SET IS SIDEBAR COLLAPSED STATE
export function setIsSidebarCollapsed(value) {
  const sidebarCollapseCheckbox = document.querySelector("#navbar-collapsor");
  const sidebarCollapseBtn = document.querySelector("#navbar-collapse");
  const sidebarToggleBtn = document.querySelector(".btn--toggle-sidebar");

  // If no sidebar found, set value to null.
  if (!sidebarCollapseCheckbox) {
    states.elements.sidebar.isCollapsed = null;
    return;
  }

  const isActiveSidebar = !sidebarCollapseCheckbox.checked;
  if (value === true) {
    sidebarToggleBtn.classList.remove("active");

    if (isActiveSidebar) {
      sidebarCollapseBtn.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          button: 0,
        }),
      );

      sidebarCollapseBtn.click();
    }
  } else {
    sidebarToggleBtn.classList.add("active");

    const nativeSidebarShowBtn = document.querySelector("#navbar-expand");
    if (!isActiveSidebar) {
      nativeSidebarShowBtn.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          button: 0,
        }),
      );

      nativeSidebarShowBtn.click();
    }
  }

  states.elements.sidebar.isCollapsed = value;
}

// SET SETTING SIDEBAR SHRINK WHEN COLLAPSED
export function setSettingSidebarShrink(value) {
  if (value === true) {
    elements.native.sidebar.classList.add("shrink");
  } else {
    elements.native.sidebar.classList.remove("shrink");
  }

  states.elements.sidebar.isSettingSidebarShrinkOn = value;
  sessionStorage.setItem("isSettingSidebarShrinkOn", value);
}

// SET IS TABS PANEL HIDDEN STATE
export function setIsTabsPanelHidden(value) {
  const tabsPanel = elements.native.tabsPanel;
  const contentPanel = elements.native.contentPanel;
  const tabsPanelToggleButton = elements.injected.tabsPanelToggleButton;

  if (value === true) {
    tabsPanel.classList.add("hidden", "panel-collapsed");
    contentPanel.classList.remove("half-width");
    tabsPanel.classList.remove("is-active", "half-width");
    tabsPanelToggleButton.classList.remove("active");
  } else {
    tabsPanel.classList.remove("hidden", "panel-collapsed");
    contentPanel.classList.add("half-width");
    tabsPanel.classList.add("is-active", "half-width");
    tabsPanelToggleButton.classList.add("active");
  }

  states.elements.tabsPanel.isHidden = value;
  sessionStorage.setItem("isTabsPanelHidden", value);
}

// SET LAST URL
export function setLastUrl(value) {
  states.load.lastUrl = value;
}

// SET PREVIOUS BODY
export function setPreviousBody(value) {
  states.load.previousBody = value;
}
