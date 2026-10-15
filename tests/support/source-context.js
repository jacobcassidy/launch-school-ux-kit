import { readFileSync } from "node:fs";
import vm from "node:vm";

// Run a source module with explicit dependency doubles and browser globals.
export function sourceContext(path, globals) {
  const moduleSource = readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
  const exportedConstants = [...moduleSource.matchAll(/^export const (\w+)/gm)].map((match) => match[1]);
  const source = moduleSource.replace(/^import[\s\S]*?;$/gm, "").replace(/^export /gm, "");
  const context = vm.createContext(globals);
  vm.runInContext(`${source}\n${exportedConstants.map((name) => `globalThis.${name} = ${name};`).join("\n")}`, context);
  return context;
}
