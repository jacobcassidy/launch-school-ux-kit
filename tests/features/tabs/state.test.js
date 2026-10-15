import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "../../support/source-context.js";

test("tabs panel visibility setter tolerates missing native and injected panels", () => {
  const ui = { tabsPanel: {} };
  const saved = {};
  const context = sourceContext("src/features/tabs/state.js", {
    elements: { native: { tabsPanel: null, contentPanel: null }, injected: { tabsPanelToggleButton: null } },
    ui,
    sessionStorage: {
      getItem: () => null,
      setItem(key, value) {
        saved[key] = value;
      },
    },
  });

  ui.tabsPanel = context.tabsPanelState;
  assert.doesNotThrow(() => context.setIsTabsPanelHidden(true));
  assert.equal(ui.tabsPanel.isHidden, true);
  assert.equal(saved.isTabsPanelHidden, true);
  assert.doesNotThrow(() => context.setIsTabsPanelHidden(false));
  assert.equal(ui.tabsPanel.isHidden, false);
  assert.equal(saved.isTabsPanelHidden, false);
});
