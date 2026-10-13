import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "../../support/source-context.js";

for (const checked of [true, false]) {
  test(`sidebar toggle follows the checkbox (${checked}) despite stale state`, () => {
    const actions = [];
    const context = sourceContext("src/features/sidebar/actions.js", {
      document: { querySelector: () => ({ checked }) },
      setIsSidebarCollapsed: (hidden) => actions.push(hidden ? "hide" : "show"),
    });
    context.toggleSidebar();
    assert.deepEqual(actions, [checked ? "show" : "hide"]);
  });
}

test("sidebar toggle is harmless without a sidebar checkbox", () => {
  const context = sourceContext("src/features/sidebar/actions.js", {
    document: { querySelector: () => null },
  });
  context.toggleSidebar();
});
