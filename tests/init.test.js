import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "./source-context.js";

for (const readyState of ["loading", "interactive", "complete"]) {
  test(`initialization at document state: ${readyState}`, () => {
    let loads = 0;
    let listener;
    const document = {
      readyState,
      body: {},
      addEventListener(event, callback, options) {
        assert.equal(event, "DOMContentLoaded");
        assert.equal(options.once, true);
        listener = callback;
      },
    };
    sourceContext("../src/js/index.js", {
      document,
      location: { origin: "https://launchschool.com", pathname: "/courses" },
      setLastUrl() {},
      loadUI() {
        loads++;
      },
    });
    assert.equal(loads, readyState === "loading" ? 0 : 1);
    if (listener) listener();
    assert.equal(loads, 1);
  });
}
