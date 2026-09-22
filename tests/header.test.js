import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "./source-context.js";

function fixture({ loggedOut = true, pathname = "/course_catalog/example", title = null } = {}) {
  const node = () => ({
    children: [],
    classes: [],
    classList: { add() {}, remove() {} },
    appendChild(child) {
      child.parent = this;
      this.children.push(child);
    },
    querySelector() {
      return this.children[0];
    },
  });
  const body = node();
  body.insertBefore = body.appendChild;
  const nav = node();
  if (loggedOut) body.appendChild(nav);
  const document = {
    body,
    createElement: node,
    querySelector(selector) {
      if (selector === ".columns:has(> #logo + .nav)") return nav.parent === body ? nav : null;
      if (selector === "title") return { innerText: "Public page" };
      if (selector === ".courses-tabs li.active a") return title;
      return null;
    },
  };
  const noop = () => {};
  const context = sourceContext("../src/js/modules/components/header.js", {
    document,
    window: { location: { pathname } },
    injectSidebarToggleButton: noop,
    injectTabsPanelToggleButton: noop,
    moveTocBtnToHeader: noop,
    injectSettingsToggleButton: noop,
    injectSettingsMenu: noop,
  });
  context.injectHeader();
  return { header: body.children.at(-1), nav };
}

test("logged-out catalog pages retain navigation without requiring an active tab", () => {
  const { header, nav } = fixture();
  assert.equal(header.className, "site-header");
  assert.equal(nav.parent, header.children[0]);
  assert.equal(header.children[1].children.length, 0);
});

test("logged-out public pages do not get a duplicate title", () => {
  const { header } = fixture({ pathname: "/public-page" });
  assert.equal(header.children[1].children.length, 0);
});

test("catalog pages without a title do not abort header creation", () => {
  const { header } = fixture({ loggedOut: false });
  assert.equal(header.className, "site-header");
});

test("logged-in catalog pages retain their active course title", () => {
  const { header } = fixture({ loggedOut: false, title: { innerText: "Course" } });
  assert.equal(header.children[1].children[0].innerHTML, "Course");
});
