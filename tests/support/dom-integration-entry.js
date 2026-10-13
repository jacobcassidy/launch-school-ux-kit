import { injectHeader as renderHeader } from "../../src/features/header/index.js";
import {
  updateSidebar,
  injectSidebarToggleButton,
  watchSidebarLinks,
  watchSidebarToggleBtn,
  watchUnreadCounts,
} from "../../src/features/sidebar/index.js";
import {
  updateTabButtons,
  injectTabsPanelToggleButton,
  watchTabBtns as watchTabs,
} from "../../src/features/tabs/index.js";
import {
  injectSettingsMenu,
  injectSettingsToggleButton,
  injectShortcutsSection,
  watchSettingsToggleBtn as watchSettings,
} from "../../src/features/settings/index.js";
import { moveTocBtnToHeader, hideTocMenu } from "../../src/features/toc/index.js";
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
import { watchForUrlChange } from "../../src/app/navigation.js";
import { watchPromptFocus } from "../../src/features/prompts/index.js";

const injectHeader = () =>
  renderHeader({
    injectSettingsMenu,
    injectSettingsToggleButton,
    injectSidebarToggleButton,
    injectTabsPanelToggleButton,
    moveTocBtnToHeader,
  });
const watchSettingsToggleBtn = () => watchSettings({ hideTocMenu });
const watchTabBtns = () => watchTabs({ refreshShortcuts });
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
  watchForUrlChange,
  shortcuts,
  injectShortcutsSection,
  watchPromptFocus,
  watchSettingsToggleBtn,
  watchSidebarLinks,
  watchSidebarToggleBtn,
  watchTabBtns,
  watchUnreadCounts,
  watchShortcuts,
  watchShortcutElements,
};
