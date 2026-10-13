import { injectHeader as renderHeader } from "../../src/features/header/index.js";
import {
  updateSidebar,
  injectSidebarToggleButton,
  watchSidebarLinks,
  watchSidebarToggleButton,
  watchUnreadCounts,
} from "../../src/features/sidebar/index.js";
import {
  updateTabButtons,
  injectTabsPanelToggleButton,
  watchTabButtons as watchTabs,
} from "../../src/features/tabs/index.js";
import {
  injectSettingsMenu,
  injectSettingsToggleButton,
  injectShortcutsSection,
  watchSettingsToggleButton as watchSettings,
} from "../../src/features/settings/index.js";
import { moveTocButtonToHeader, hideTocMenu } from "../../src/features/toc/index.js";
import { showToast } from "../../src/features/notifications/index.js";
import {
  shortcuts,
  syncShortcutTooltips,
  watchShortcuts as watchKeyboard,
  watchShortcutElements as watchDynamicControls,
} from "../../src/features/shortcuts/index.js";
import { elements } from "../../src/shared/dom/elements.js";
import { syncNativeElementsState } from "../../src/shared/dom/native-elements-state.js";
import { syncInjectedElementsState } from "../../src/shared/dom/injected-elements-state.js";
import { syncAvailableShortcuts, refreshShortcuts } from "../../src/app/shortcuts.js";
import { setLoadUIHandler } from "../../src/app/reload.js";
import { watchUrlChanges } from "../../src/app/navigation.js";
import { watchPromptEnterShortcut } from "../../src/features/prompts/index.js";

const injectHeader = () =>
  renderHeader({
    injectSettingsMenu,
    injectSettingsToggleButton,
    injectSidebarToggleButton,
    injectTabsPanelToggleButton,
    moveTocButtonToHeader,
  });
const watchSettingsToggleButton = () => watchSettings({ hideTocMenu });
const watchTabButtons = () => watchTabs({ refreshShortcuts });
const watchShortcuts = () => watchKeyboard({ showToast });
const watchShortcutElements = () => watchDynamicControls({ refreshShortcuts });

globalThis.integration = {
  elements,
  injectHeader,
  updateSidebar,
  updateTabButtons,
  syncAvailableShortcuts,
  syncShortcutTooltips,
  syncNativeElementsState,
  syncInjectedElementsState,
  setLoadUIHandler,
  watchUrlChanges,
  shortcuts,
  injectShortcutsSection,
  watchPromptEnterShortcut,
  watchSettingsToggleButton,
  watchSidebarLinks,
  watchSidebarToggleButton,
  watchTabButtons,
  watchUnreadCounts,
  watchShortcuts,
  watchShortcutElements,
};
