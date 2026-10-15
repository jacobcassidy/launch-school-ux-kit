import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile, access } from "node:fs/promises";
import os from "node:os";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

const repository = fileURLToPath(new URL("../../", import.meta.url));

function build(directory, args = []) {
  const child = spawn(
    process.execPath,
    ["--import", path.join(directory, "observe-promotion.mjs"), path.join(repository, "esbuild.config.js"), ...args],
    { cwd: directory },
  );
  let output = "";
  child.stdout.on("data", (data) => (output += data));
  child.stderr.on("data", (data) => (output += data));
  const finished = new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, output }));
  });
  return { child, finished, output: () => output };
}

test("build outputs use flat paths and failed builds preserve the release", async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "ls-ux-build-paths-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const file of ["src", "LICENSE", "THIRD-PARTY-NOTICES.txt"]) {
    await cp(path.join(repository, file), path.join(directory, file), { recursive: true });
  }
  await writeFile(
    path.join(directory, "observe-promotion.mjs"),
    `
    import fs from "node:fs";
    const rename = fs.renameSync;
    fs.renameSync = (from, to) => {
      fs.writeFileSync("promotion.json", JSON.stringify({ from, to, stagedFiles: fs.readdirSync(".build-tmp", { recursive: true }) }));
      return rename(from, to);
    };
  `,
  );
  const release = path.join(directory, "dist/index.min.js");
  const firstBuild = await build(directory).finished;
  assert.equal(firstBuild.code, 0, firstBuild.output);
  const contents = await readFile(release, "utf8");
  const promotion = JSON.parse(await readFile(path.join(directory, "promotion.json"), "utf8"));
  assert.equal(promotion.from, "./.build-tmp/index.min.js");
  assert.equal(promotion.to, "./dist/index.min.js");
  assert.deepEqual(promotion.stagedFiles, ["index.min.js"]);
  await assert.rejects(access(path.join(directory, "dist/js")), { code: "ENOENT" });
  await assert.rejects(access(path.join(directory, ".build-tmp")), { code: "ENOENT" });

  const entry = path.join(directory, "src/app/index.js");
  const source = await readFile(entry, "utf8");
  await writeFile(entry, "export const broken = ;");
  const failedBuild = await build(directory).finished;
  assert.notEqual(failedBuild.code, 0);
  assert.match(failedBuild.output, /Unexpected/);
  assert.equal(await readFile(release, "utf8"), contents);
  await assert.rejects(access(path.join(directory, ".build-tmp/js")), { code: "ENOENT" });
  await writeFile(entry, source);

  // Include stale output to verify the watch build cleans the previous layout.
  await cp(path.join(directory, "dist"), path.join(directory, ".dev-dist/js"), { recursive: true });
  const watcher = build(directory, ["--watch"]);
  t.after(() => watcher.child.kill());
  const watchFile = path.join(directory, ".dev-dist/index.js");
  let watchContents;
  try {
    for (let attempt = 0; attempt < 100; attempt++) {
      watchContents = await readFile(watchFile, "utf8").catch(() => null);
      if (watchContents) break;
      await delay(50);
    }
    assert.ok(watchContents, `watch bundle was not written: ${watcher.output()}`);
    assert.match(watchContents, /==UserScript==/);
    assert.equal(await readFile(release, "utf8"), contents);
    await assert.rejects(access(path.join(directory, ".dev-dist/js")), { code: "ENOENT" });
  } finally {
    watcher.child.kill();
    await watcher.finished;
  }
});
