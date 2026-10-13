import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { Window } from "happy-dom";

const bundle = readFileSync(new URL("../../dist/js/index.min.js", import.meta.url), "utf8");

for (const hidden of [true, false]) {
  test(`feature-owned preferences restore ${hidden ? "hidden" : "default"} UI across repeated native renders`, async (t) => {
    const window = new Window({ url: "https://launchschool.com/books/test" });
    t.after(() => window.close());
    const { document } = window;
    for (const key of [
      "isHeaderHidden",
      "isTabsPanelHidden",
      "isSettingSidebarHiddenHeadersOn",
      "isSettingSidebarShrinkOn",
    ]) {
      window.sessionStorage.setItem(key, String(hidden));
    }
    document.body.innerHTML =
      '<nav class="sidebar nav-drawer"></nav><article class="book-content-panel"></article><aside class="tabs-panel"></aside><button class="toc-toggle-button"></button>';
    const toc = document.querySelector(".toc-toggle-button");
    toc.addEventListener("click", () => toc.classList.toggle("open"));
    window.eval(bundle);
    document.dispatchEvent(new window.Event("DOMContentLoaded"));
    await window.happyDOM.whenAsyncComplete();
    for (let pass = 0; pass < 2; pass++) {
      document.dispatchEvent(new window.Event("turbo:render"));
      await window.happyDOM.whenAsyncComplete();
      assert.equal(document.querySelectorAll(".site-header").length, 1);
      assert.equal(document.querySelectorAll(".toast-container").length, 1);
      assert.equal(document.querySelectorAll(".current-page-added-shortcuts-section").length, 1);
      assert.equal(document.querySelector(".site-header").inert, hidden);
      assert.equal(document.querySelector(".tabs-panel").inert, hidden);
      assert.equal(document.querySelector(".nav-drawer").classList.contains("shrink"), hidden);
      assert.equal(document.querySelector(".nav-drawer").classList.contains("hide-section-headers"), hidden);
      assert.equal(document.querySelector("#setting--sidebar-shrink").checked, hidden);
      assert.equal(document.querySelector("#setting--sidebar-hidden-headers").checked, hidden);
    }
    // These controls exercise application callbacks even when the header is hidden.
    toc.click();
    document.querySelector(".btn--toggle-settings").click();
    assert.equal(toc.classList.contains("open"), false);
    assert.equal(document.querySelector(".settings-container").classList.contains("active"), true);
    document.dispatchEvent(new window.KeyboardEvent("keydown", { code: "KeyT", ctrlKey: true, altKey: true }));
    assert.equal(toc.classList.contains("open"), true);
    assert.equal(document.querySelector(".settings-container").classList.contains("active"), false);
    const shrink = document.querySelector("#setting--sidebar-shrink");
    shrink.checked = !hidden;
    shrink.dispatchEvent(new window.Event("change"));
    assert.equal(document.querySelector(".nav-drawer").classList.contains("shrink"), !hidden);
    assert.equal(window.sessionStorage.getItem("isSettingSidebarShrinkOn"), String(!hidden));
  });
}
