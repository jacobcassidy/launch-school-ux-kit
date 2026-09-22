import { readFileSync } from "node:fs";
import vm from "node:vm";

// Run a source module with explicit dependency doubles and browser globals.
export function sourceContext(path, globals) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8")
    .replace(/^import[\s\S]*?;$/gm, "")
    .replace(/^export /gm, "");
  const context = vm.createContext(globals);
  vm.runInContext(source, context);
  return context;
}
