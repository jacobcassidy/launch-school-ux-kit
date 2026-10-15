import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readRelease, validateRelease } from "../../scripts/release.js";

const section = (version, notes = "### Added\n\n- A new feature.", suffix = "") =>
  `## [${version}] - 2026-10-15${suffix}\n\n${notes}\n`;
const base = `# Changelog\n\n${section("1.9.0")}`;
const changelog = `# Changelog\n\n${section("1.10.0", "### Fixed\n\n- A fix.", " (Edition)")}\n${section("1.9.0")}`;

test("extracts only the new release notes, preserving an edition title", () => {
  assert.deepEqual(readRelease(changelog), {
    version: "1.10.0",
    tag: "v1.10.0",
    title: "v1.10.0 (Edition)",
    notes: "### Fixed\n\n- A fix.",
  });
  const unreleased = changelog.replace("# Changelog", "# Changelog\n\n## [Unreleased]\n\n- Future work.");
  assert.deepEqual(readRelease(unreleased.replace(/\n/g, "\r\n")), readRelease(changelog));
});

test("accepts numeric patch, minor, and major increases", () => {
  for (const version of ["1.9.1", "1.10.0", "2.0.0"]) {
    assert.equal(validateRelease(section(version), base, ["v1.8.1", "1.3.0"]).version, version);
  }
});

test("blocks an unchanged, older, already tagged, or out-of-order version", () => {
  for (const version of ["1.9.0", "1.8.9", "0.10.0"]) {
    assert.throws(() => validateRelease(section(version), base, []), /greater than main/);
  }
  for (const tag of ["v1.10.0", "1.10.0", "v1.11.0", "v2.0.0"]) {
    assert.throws(() => validateRelease(changelog, base, [tag]), /newer than existing tag/);
  }
  assert.equal(validateRelease(changelog, base, ["v1.10.0"], true).tag, "v1.10.0");
  assert.throws(() => validateRelease(changelog, base, ["1.10.0"], true), /newer than existing tag/);
});

test("rejects missing, malformed, duplicate, and empty release sections", () => {
  for (const text of [
    "# Changelog\n\n## [Unreleased]\n\n- Future work.",
    section("01.10.0"),
    section("1.10.0-beta.1"),
    "## [1.10.0]\n\n- Undated.",
    `${section("broken")}\n${section("1.10.0")}`,
  ]) {
    assert.throws(() => readRelease(text), /latest changelog release/);
  }
  assert.throws(() => readRelease(`${section("1.10.0")}\n${section("1.10.0")}`), /duplicated/);
  assert.throws(() => readRelease(section("1.10.0", "### Added\n\n### Fixed")), /needs release notes/);
});

test("CLI blocks missing bumps and prepares an exact-commit release with safe retries", (t) => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "ls-ux-release-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const git = (...args) => execFileSync("git", args, { cwd: directory, encoding: "utf8" }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Release Test");
  git("config", "user.email", "release-test@example.com");
  git("config", "commit.gpgsign", "false");
  writeFileSync(path.join(directory, "CHANGELOG.md"), base);
  git("add", "CHANGELOG.md");
  git("commit", "--quiet", "-m", "Initial changelog");
  const baseSha = git("rev-parse", "HEAD");
  const notesPath = path.join(directory, "notes.md");
  const outputPath = path.join(directory, "output.txt");
  const run = (mode) =>
    spawnSync(process.execPath, [fileURLToPath(new URL("../../scripts/release.js", import.meta.url)), mode], {
      cwd: directory,
      encoding: "utf8",
      env: { ...process.env, BASE_SHA: baseSha, RELEASE_NOTES_PATH: notesPath, GITHUB_OUTPUT: outputPath },
    });

  assert.match(run("check").stderr, /greater than main/);
  writeFileSync(path.join(directory, "CHANGELOG.md"), changelog);
  git("add", "CHANGELOG.md");
  git("commit", "--quiet", "-m", "Add release notes");
  assert.equal(run("check").status, 0);
  const publish = run("publish");
  assert.equal(publish.status, 0, publish.stderr);
  assert.equal(readFileSync(notesPath, "utf8"), "### Fixed\n\n- A fix.\n");
  assert.equal(readFileSync(outputPath, "utf8"), "tag=v1.10.0\ntitle=v1.10.0 (Edition)\n");

  git("tag", "-a", "v1.10.0", "-m", "Release 1.10.0");
  assert.notEqual(run("check").status, 0);
  assert.equal(run("publish").status, 0);
  git("commit", "--allow-empty", "--quiet", "-m", "Later commit");
  const conflictingTag = run("publish");
  assert.notEqual(conflictingTag.status, 0);
  assert.match(conflictingTag.stderr, /different commit/);
});
