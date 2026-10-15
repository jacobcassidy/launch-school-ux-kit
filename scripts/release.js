/** Validate changelog versions and prepare GitHub release metadata. */
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const versionPattern = "(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)";
const headingPattern = new RegExp(`^\\[(${versionPattern})\\] - \\d{4}-\\d{2}-\\d{2}(?: (.+))?$`);
const tagPattern = new RegExp(`^v?(${versionPattern})$`);

/** Compare stable semantic versions numerically, including multi-digit components. */
function compareVersions(left, right) {
  const rightParts = right.split(".").map(BigInt);
  for (const [index, part] of left.split(".").map(BigInt).entries()) {
    if (part > rightParts[index]) return 1;
    if (part < rightParts[index]) return -1;
  }
  return 0;
}

/** Read the latest dated release section, allowing an Unreleased section above it. */
export function readRelease(changelog) {
  const text = changelog.replace(/\r\n/g, "\n");
  const headings = [...text.matchAll(/^##[ \t]+(.+)$/gm)];
  const index = headings[0]?.[1] === "[Unreleased]" ? 1 : 0;
  const heading = headings[index];
  const match = heading && headingPattern.exec(heading[1]);
  if (!match) {
    throw new Error("The latest changelog release must use '## [X.Y.Z] - YYYY-MM-DD' (an edition suffix is optional).");
  }

  const version = match[1];
  const duplicates = headings.filter((entry) => entry[1].startsWith(`[${version}]`));
  if (duplicates.length > 1) throw new Error(`Changelog version ${version} is duplicated.`);

  const notes = text.slice(heading.index + heading[0].length, headings[index + 1]?.index).trim();
  if (!notes.replace(/^#{3,6} .*$/gm, "").trim()) {
    throw new Error(`Changelog version ${version} needs release notes.`);
  }

  return { version, tag: `v${version}`, title: `v${version}${match[5] ? ` ${match[5]}` : ""}`, notes };
}

/** Require a version newer than main and every existing version tag. */
export function validateRelease(changelog, baseChangelog, tags, allowExistingTag = false) {
  const release = readRelease(changelog);
  const base = readRelease(baseChangelog);
  if (compareVersions(release.version, base.version) <= 0) {
    throw new Error(`Add a new changelog version greater than main's ${base.version}; found ${release.version}.`);
  }
  for (const tag of tags) {
    const match = tagPattern.exec(tag);
    if (!match) continue;
    const comparison = compareVersions(release.version, match[1]);
    if (comparison === 0 && allowExistingTag && tag === release.tag) continue;
    if (comparison <= 0) {
      throw new Error(`Changelog version ${release.version} must be newer than existing tag ${tag}.`);
    }
  }
  return release;
}

/** Run the same validation before merging and when publishing the merged commit. */
function main() {
  const mode = process.argv[2];
  if (!["check", "publish"].includes(mode) || !process.env.BASE_SHA) {
    throw new Error("Usage: BASE_SHA=<main commit> node scripts/release.js <check|publish>");
  }
  const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
  const tags = git("tag", "--list").split("\n");
  const release = validateRelease(
    readFileSync("CHANGELOG.md", "utf8"),
    git("show", `${process.env.BASE_SHA}:CHANGELOG.md`),
    tags,
    mode === "publish",
  );

  if (mode === "publish" && tags.includes(release.tag)) {
    if (git("rev-parse", `${release.tag}^{commit}`) !== git("rev-parse", "HEAD")) {
      throw new Error(`Existing tag ${release.tag} points to a different commit; refusing to reuse it.`);
    }
  }
  if (mode === "publish") {
    if (!process.env.RELEASE_NOTES_PATH) throw new Error("RELEASE_NOTES_PATH is required when publishing.");
    writeFileSync(process.env.RELEASE_NOTES_PATH, `${release.notes}\n`);
    if (process.env.GITHUB_OUTPUT) {
      appendFileSync(process.env.GITHUB_OUTPUT, `tag=${release.tag}\ntitle=${release.title}\n`);
    }
  }
  console.log(`Validated ${release.tag}: newer than main and existing version tags.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
