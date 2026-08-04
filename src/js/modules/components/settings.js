/**
 * SETTINGS
 * @module component/settings
 */

// Import Utils
import { hideSettingsContainer } from "../utils/hide.js";
import { elements } from "../utils/state.js";

/**
 * INJECT SETTINGS CONTAINER
 * Injects the settings container element into the .site-header
 *
 * @param {HTMLElement} containerEl The container (.site-header) to which the container will be appended.
 */
export function injectSettingsContainer(containerEl) {
  const createSettingsContainer = () => {
    const settingsContainerEl = document.createElement("div");
    settingsContainerEl.className = "settings-container";
    const settingsContainerHeaderEl = document.createElement("h2");
    settingsContainerHeaderEl.className = "setting-container__title";
    settingsContainerHeaderEl.innerText = "Settings";
    settingsContainerEl.appendChild(settingsContainerHeaderEl);
    return settingsContainerEl;
  };

  const createUISettingsSection = () => {
    const uiSectionEl = document.createElement("div");
    uiSectionEl.className = "settings-section ui-section";

    const togglesListWrapperEl = document.createElement("div");
    togglesListWrapperEl.className = "settings-list-wrapper";

    const togglesListEl = document.createElement("ul");
    togglesListEl.className = "settings-list";

    const settingsSidebarSizingEl = createSettingSidebarSizing();

    togglesListEl.append(settingsSidebarSizingEl);
    togglesListWrapperEl.append(togglesListEl);
    uiSectionEl.append(togglesListWrapperEl);

    return uiSectionEl;
  };

  const createSettingSidebarSizing = () => {
    const togglesListItemEl = document.createElement("li");
    togglesListItemEl.className = "settings-list__item";

    const toggleSidebarSettingTextEl = document.createElement("span");
    toggleSidebarSettingTextEl.className = "setting--toggle-sidebar setting-desc";
    toggleSidebarSettingTextEl.innerText = "Shrink sidebar instead of hiding it when collapsed";

    const toggleSidebarSettingTogglerEl = createToggler("sidebar-sizing-setting");

    togglesListItemEl.append(toggleSidebarSettingTogglerEl);
    togglesListItemEl.append(toggleSidebarSettingTextEl);

    return togglesListItemEl;
  };

  const createToggler = (id) => {
    const togglerEl = document.createElement("span");
    togglerEl.className = "toggler setting-status";
    const togglerInputEl = document.createElement("input");
    const togglerLabelEl = document.createElement("label");

    togglerInputEl.id = id;
    togglerInputEl.name = id;
    togglerInputEl.type = "checkbox";
    togglerInputEl.value = 1;

    togglerLabelEl.htmlFor = id;
    togglerLabelEl.innerHTML = `
      <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
      </svg>
      <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
        <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
        <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
      </svg>
    `;

    togglerEl.append(togglerInputEl);
    togglerEl.append(togglerLabelEl);

    return togglerEl;
  };

  // Add toggle settings sections

  // Add toggle for minimize/hidden sidebar

  // <label for="toggle-sidebar" class="settings-container__label">Minimize Sidebar</label>
  // <input type="checkbox" id="toggle-sidebar" class="settings-container__input" />

  const settingsContainerEl = createSettingsContainer();
  const settingsUISection = createUISettingsSection();
  settingsContainerEl.append(settingsUISection);

  //  settingsContainerEl.appendChild(toggleSection);

  containerEl.appendChild(settingsContainerEl);
}

/**
 * HANDLE OUTSIDE SETTINGS CONTAINER CLICK
 */
export function handleOutsideSettingsContainerClick(e) {
  const settingsContainer = elements.injected.settingsContainer;
  const settingsContainerToggleBtn = elements.injected.settingsToggleButton;

  if (settingsContainer.contains(e.target) || settingsContainerToggleBtn.contains(e.target)) return;
  hideSettingsContainer();
}
