import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "./source-context.js";

for (const [setter, stateKey, className] of [
  ["setSettingSidebarHiddenHeaders", "isSettingSidebarHiddenHeadersOn", "hide-section-headers"],
  ["setSettingSidebarShrink", "isSettingSidebarShrinkOn", "shrink"],
]) {
  test(`${setter} saves preferences without a sidebar and applies them when present`, () => {
    const elements = { native: { sidebar: null } };
    const ui = { sidebar: {} };
    const saved = {};
    const context = sourceContext("../src/js/modules/utils/state/setters/ui.js", {
      elements,
      ui,
      sessionStorage: {
        setItem(key, value) {
          saved[key] = value;
        },
      },
    });
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
