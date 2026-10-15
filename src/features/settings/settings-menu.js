/**
 * SETTINGS MENU
 * @module features/settings/settings-menu
 */

/**
 * Builds an initially hidden settings menu with UI preference controls and appends it to the supplied container.
 *
 * @param {HTMLElement} containerEl Container receiving the settings menu.
 * @returns {void}
 */
export function injectSettingsMenu(containerEl) {
  /**
   * Builds the initially hidden, labelled settings region and its heading.
   *
   * @returns {HTMLDivElement} Detached settings region.
   */
  const createSettingsMenu = () => {
    const settingsMenuEl = document.createElement("div");
    settingsMenuEl.className = "settings-container";
    settingsMenuEl.id = "ls-ux-settings-menu";
    settingsMenuEl.setAttribute("role", "region");
    settingsMenuEl.setAttribute("aria-labelledby", "ls-ux-settings-heading");
    settingsMenuEl.setAttribute("aria-hidden", "true");
    settingsMenuEl.inert = true;
    const settingsMenuHeaderEl = document.createElement("h2");
    settingsMenuHeaderEl.className = "setting-container__title";
    settingsMenuHeaderEl.id = "ls-ux-settings-heading";
    settingsMenuHeaderEl.innerText = "Settings";
    settingsMenuEl.appendChild(settingsMenuHeaderEl);
    return settingsMenuEl;
  };

  const settingsMenuEl = createSettingsMenu();
  injectUISettingsSection(settingsMenuEl);
  containerEl.appendChild(settingsMenuEl);
}

/**
 * Creates a settings section with a title and an empty settings list.
 *
 * @param {string} sectionTitle Section heading used to derive its CSS classes.
 * @returns {HTMLElement} Detached section element.
 */
export function createSettingsSection(sectionTitle) {
  const sectionEl = document.createElement("section");

  const sectionTitleSlug = sectionTitle.trim().replace(/\s+/g, "-").toLowerCase();
  sectionEl.className = `settings-section ${sectionTitleSlug}-section`;

  const sectionHeaderEl = document.createElement("header");
  sectionHeaderEl.className = `settings-section__header ${sectionTitleSlug}-header`;
  sectionHeaderEl.innerText = sectionTitle;

  const settingsListEl = document.createElement("ul");
  settingsListEl.className = "settings-list";

  sectionEl.append(sectionHeaderEl);
  sectionEl.append(settingsListEl);

  return sectionEl;
}

/**
 * Builds a settings list item with a description and an accessible checkbox toggle.
 *
 * @param {string} settingDesc Text describing the preference.
 * @param {string} settingTogglerId ID shared by the checkbox, label, and description linkage.
 * @returns {HTMLLIElement} Detached settings list item.
 */
export function createSetting(settingDesc, settingTogglerId) {
  const settingListItemEl = document.createElement("li");
  settingListItemEl.className = "settings-list__item";

  const settingTextEl = document.createElement("span");
  settingTextEl.className = "setting-desc";
  settingTextEl.id = `${settingTogglerId}--description`;
  settingTextEl.innerText = settingDesc;

  const settingTogglerEl = createSettingToggle(settingTogglerId);

  settingListItemEl.append(settingTogglerEl);
  settingListItemEl.append(settingTextEl);

  return settingListItemEl;
}

/**
 * Builds a focusable checkbox and associated visual label linked to the setting description.
 *
 * @param {string} id Checkbox ID and base ID for the existing description.
 * @returns {HTMLSpanElement} Detached toggle wrapper containing its checkbox and label.
 */
export function createSettingToggle(id) {
  const togglerEl = document.createElement("span");
  togglerEl.className = "toggler setting-status";
  const togglerInputEl = document.createElement("input");
  const togglerLabelEl = document.createElement("label");

  togglerInputEl.id = id;
  togglerInputEl.name = id;
  togglerInputEl.type = "checkbox";
  togglerInputEl.value = 1;
  togglerInputEl.setAttribute("aria-labelledby", `${id}--description`);

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
 * Builds and appends the sidebar UI preferences section.
 *
 * @param {HTMLElement} containerEl Settings container receiving the section.
 * @returns {void}
 */
function injectUISettingsSection(containerEl) {
  /**
   * Builds the UI Options section containing both sidebar preferences.
   *
   * @returns {HTMLElement} Detached settings section.
   */
  const createUISettingsSection = () => {
    const uiSettingsSectionEl = createSettingsSection("UI Options");
    const uiSettingsListEl = uiSettingsSectionEl.querySelector(".settings-list");

    /**
     * Builds the setting for hiding sidebar section headers.
     *
     * @returns {HTMLLIElement} Detached preference list item.
     */
    const createSettingSidebarHiddenHeadersEl = () => {
      const settingDesc = "Hide sidebar's section headers";
      const settingTogglerId = "setting--sidebar-hidden-headers";
      return createSetting(settingDesc, settingTogglerId);
    };

    /**
     * Builds the setting for shrinking the sidebar instead of hiding it.
     *
     * @returns {HTMLLIElement} Detached preference list item.
     */
    const createSettingSidebarShrinkEl = () => {
      const settingDesc = "Shrink sidebar instead of hiding it when closed";
      const settingTogglerId = "setting--sidebar-shrink";
      return createSetting(settingDesc, settingTogglerId);
    };

    uiSettingsListEl.append(createSettingSidebarHiddenHeadersEl());
    uiSettingsListEl.append(createSettingSidebarShrinkEl());

    return uiSettingsSectionEl;
  };

  containerEl.append(createUISettingsSection());
}
