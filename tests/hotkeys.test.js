import assert from "node:assert/strict";
import test from "node:test";
import { sourceContext } from "./source-context.js";

function fixture(hotkeys = { cmdOnly: {}, cmdShift: {}, cmdCtrl: {} }) {
  let handler;
  const activated = [];
  const toasts = [];
  const context = sourceContext("../src/js/modules/utils/watch/events/hotkeys.js", {
    hotkeys,
    document: {
      documentElement: { dataset: {} },
      addEventListener(event, callback) {
        handler = callback;
      },
    },
    activateHotkey: (modifier, code) => activated.push([modifier, code]),
    showToast: (text) => toasts.push(text),
  });
  context.watchHotkeys();
  return { send: (event) => handler(event), activated, toasts };
}

test("registered tab shortcuts beyond five are dispatched", () => {
  const { send, activated } = fixture({ cmdOnly: {}, cmdShift: {}, cmdCtrl: { Digit6: {}, Digit9: {} } });
  for (const code of ["Digit6", "Digit9"]) send({ metaKey: true, ctrlKey: true, code });
  assert.deepEqual(activated, [
    ["cmdCtrl", "Digit6"],
    ["cmdCtrl", "Digit9"],
  ]);
});

test("unregistered tab shortcuts and repeated key presses are ignored", () => {
  const { send, activated } = fixture();
  send({ metaKey: true, ctrlKey: true, code: "Digit6" });
  send({ metaKey: true, ctrlKey: true, code: "KeyC", repeat: true });
  assert.equal(activated.length, 0);
});

test("unavailable action shortcuts retain their explanatory toast", () => {
  const { send, toasts } = fixture();
  send({ metaKey: true, ctrlKey: true, code: "KeyC" });
  assert.deepEqual(toasts, ["No editor code available to copy on this page"]);
});

for (const available of [true, false]) {
  test(`Cmd+B is intercepted only when the sidebar shortcut exists (${available})`, () => {
    const { send, activated } = fixture({ cmdOnly: available ? { KeyB: {} } : {}, cmdShift: {}, cmdCtrl: {} });
    const calls = [];
    send({
      metaKey: true,
      code: "KeyB",
      preventDefault: () => calls.push("prevent"),
      stopPropagation: () => calls.push("stop"),
      stopImmediatePropagation: () => calls.push("stopImmediate"),
    });
    assert.deepEqual(calls, available ? ["prevent", "stop", "stopImmediate"] : []);
    assert.deepEqual(activated, available ? [["cmdOnly", "KeyB"]] : []);
  });
}
