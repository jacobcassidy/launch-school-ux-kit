import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "../../support/source-context.js";

for (const [setter, stateKey, className] of [
  ["setSettingSidebarHiddenHeaders", "isSettingSidebarHiddenHeadersOn", "hide-section-headers"],
  ["setSettingSidebarShrink", "isSettingSidebarShrinkOn", "shrink"],
]) {
  test(`${setter} saves preferences without a sidebar and applies them when present`, () => {
    const elements = { native: { sidebar: null } };
    const ui = { sidebar: {} };
    const saved = {};
    const context = sourceContext("src/features/sidebar/state.js", {
      elements,
      ui,
      sessionStorage: {
        getItem: () => null,
        setItem(key, value) {
          saved[key] = value;
        },
      },
    });
    ui.sidebar = context.sidebarState;
    context[setter](true);
    assert.equal(ui.sidebar[stateKey], true);
    assert.equal(saved[stateKey], true);
    const classes = new Set();
    elements.native.sidebar = { classList: { add: (x) => classes.add(x), remove: (x) => classes.delete(x) } };
    context[setter](true);
    assert.ok(classes.has(className));
    context[setter](false);
    assert.ok(!classes.has(className));
    assert.equal(saved[stateKey], false);
  });
}

test("sidebar collapse setter tolerates a missing native control", () => {
  const context = sourceContext("src/features/sidebar/state.js", {
    document: {
      querySelector(selector) {
        if (selector === "#navbar-collapsor") return { checked: false };
        return null;
      },
    },
    elements: { native: {}, injected: {} },
    sessionStorage: { getItem: () => null },
  });

  assert.doesNotThrow(() => context.setIsSidebarCollapsed(true));
});
