/**
 * SETTINGS
 * @module component/settings
 */

// Import Utils
import { hideSettings } from "../utils/hide.js";
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

  const settingsContainerEl = createSettingsContainer();
  injectUISettingsSection(settingsContainerEl);
  containerEl.appendChild(settingsContainerEl);
}

/**
 * HANDLE OUTSIDE SETTINGS CONTAINER CLICK
 */
export function handleOutsideSettingsContainerClick(e) {
  const settingsContainer = elements.injected.settingsContainer;
  const settingsContainerToggleBtn = elements.injected.settingsToggleButton;

  if (settingsContainer.contains(e.target) || settingsContainerToggleBtn.contains(e.target)) return;
  hideSettings();
}

/**
 * HANDLE ESCAPE KEY TO CLOSE SETTINGS
 */
export function handleSettingsEsc(e) {
  if (e.key === "Escape") {
    hideSettings();
  }
}

/**
 * CREATE NEW SETTINGS SECTION
 */
export function createNewSettingsSection(sectionTitle) {
  const sectionEl = document.createElement("section");

  const sectionTitleSlug = sectionTitle.trim().replace(/\s+/g, "-").toLowerCase();
  sectionEl.className = `settings-section ${sectionTitleSlug}-section`;

  const sectionTitleEl = document.createElement("li");
  sectionTitleEl.className = `settings-list__title ${sectionTitleSlug}-title`;
  sectionTitleEl.innerText = sectionTitle;

  const settingsWrapperEl = document.createElement("div");
  settingsWrapperEl.className = "settings-list-wrapper";

  const settingsListEl = document.createElement("ul");
  settingsListEl.className = "settings-list";

  settingsListEl.append(sectionTitleEl);
  settingsWrapperEl.append(settingsListEl);
  sectionEl.append(settingsWrapperEl);

  return sectionEl;
}

/**
 * CREATE NEW SETTING
 */
export function createNewSetting(settingDesc, settingTogglerId) {
  const settingListItemEl = document.createElement("li");
  settingListItemEl.className = "settings-list__item";

  const settingTextEl = document.createElement("span");
  settingTextEl.className = "setting-desc";
  settingTextEl.innerText = settingDesc;

  const settingTogglerEl = createNewSettingToggler(settingTogglerId);

  settingListItemEl.append(settingTogglerEl);
  settingListItemEl.append(settingTextEl);

  return settingListItemEl;
}

/**
 * CREATE NEW SETTING TOGGLER
 */
export function createNewSettingToggler(id) {
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
}

/**
 * INJECT UI SETTINGS SECTION
 */
function injectUISettingsSection(containerEl) {
  const createUISettingsSection = () => {
    const uiSettingsSectionEl = createNewSettingsSection("UI Settings");
    const uiSettingsListEl = uiSettingsSectionEl.querySelector(".settings-list");

    const createSettingSidebarHiddenHeadersEl = () => {
      const settingDesc = "Hide expanded sidebar's section headers";
      const settingTogglerId = "setting--sidebar-hidden-headers";
      return createNewSetting(settingDesc, settingTogglerId);
    };

    const createSettingSidebarShrinkEl = () => {
      const settingDesc = "Shrink sidebar instead of hiding it when collapsed";
      const settingTogglerId = "setting--sidebar-shrink";
      return createNewSetting(settingDesc, settingTogglerId);
    };

    uiSettingsListEl.append(createSettingSidebarHiddenHeadersEl());
    uiSettingsListEl.append(createSettingSidebarShrinkEl());

    return uiSettingsSectionEl;
  };

  containerEl.append(createUISettingsSection());
}
