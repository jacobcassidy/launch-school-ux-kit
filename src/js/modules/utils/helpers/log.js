/**
 * LOG
 * @module utils/helpers/log
 */

export const colorLog = {
  alert: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0.15 30); font-weight: 700;", ...args),
  debug: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0.15 60);", ...args),
  detail: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0 0);", ...args),
  info: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0.15 250);", ...args),
  notice: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0.15 0);", ...args),
  run: (msg, ...args) => console.log(`%c${msg}`, "color: oklch(0.7 0.15 150);", ...args),
};
