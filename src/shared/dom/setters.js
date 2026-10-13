/**
 * DOM SETTERS
 * @module shared/dom/setters
 */

import { elements } from "./elements.js";

// SET INJECTED ELEMENTS

/**
 * Stores the current injected custom header reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current custom header, or null when absent.
 * @returns {void}
 */
export function setElementHeader(el) {
  elements.injected.header = el;
}

/**
 * Stores the current injected settings menu reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current settings menu, or null when absent.
 * @returns {void}
 */
export function setElementSettingsMenu(el) {
  elements.injected.settingsMenu = el;
}

/**
 * Stores the current injected settings-toggle button reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current settings-toggle button, or null when absent.
 * @returns {void}
 */
export function setElementSettingsToggleButton(el) {
  elements.injected.settingsToggleButton = el;
}

/**
 * Stores the current injected sidebar-toggle button reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current sidebar-toggle button, or null when absent.
 * @returns {void}
 */
export function setElementSidebarToggleButton(el) {
  elements.injected.sidebarToggleButton = el;
}

/**
 * Stores the current injected tabs-panel toggle reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current tabs-panel toggle, or null when absent.
 * @returns {void}
 */
export function setElementTabsPanelToggleButton(el) {
  elements.injected.tabsPanelToggleButton = el;
}

// SET NATIVE ELEMENTS

/**
 * Stores the current native content panel reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current content panel, or null when absent.
 * @returns {void}
 */
export function setElementContentPanel(el) {
  elements.native.contentPanel = el;
}

/**
 * Stores the current native editor panel reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current editor panel, or null when absent.
 * @returns {void}
 */
export function setElementEditorPanel(el) {
  elements.native.editorPanel = el;
}

/**
 * Stores the current native next-exercise control reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current next-exercise control, or null when absent.
 * @returns {void}
 */
export function setElementNextExerciseButton(el) {
  elements.native.nextExerciseButton = el;
}

/**
 * Stores the current native scratchpad tab content reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current scratchpad tab content, or null when absent.
 * @returns {void}
 */
export function setElementScratchpad(el) {
  elements.native.scratchpad = el;
}

/**
 * Stores the current native sidebar reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current sidebar, or null when absent.
 * @returns {void}
 */
export function setElementSidebar(el) {
  elements.native.sidebar = el;
}

/**
 * Stores the current native tabs panel reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current tabs panel, or null when absent.
 * @returns {void}
 */
export function setElementTabsPanel(el) {
  elements.native.tabsPanel = el;
}

/**
 * Stores the current native tab navigation reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current tab navigation, or null when absent.
 * @returns {void}
 */
export function setElementTabNav(el) {
  elements.native.tabNav = el;
}

/**
 * Stores the current native TOC control reference in the shared DOM registry.
 *
 * @param {HTMLElement|null} el Current TOC control, or null when absent.
 * @returns {void}
 */
export function setElementTocButton(el) {
  elements.native.tocButton = el;
}
