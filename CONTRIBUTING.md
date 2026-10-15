# Contributing

Use Node.js 24 or later and npm. The supported Node version is declared in `package.json`, and `.nvmrc` selects the current major version.

The npm package metadata identifies the local build tooling. Its version is independent of the userscript release documented in `CHANGELOG.md`; the userscript install version is declared in `src/userscript/header.txt`.

## Set up the project

```sh
npm ci
npx lefthook install
```

Lefthook installs the repository's pre-commit checks. It runs ESLint, Stylelint, Markdownlint, and Prettier on staged files.

## Validate and build

```sh
npm test
npm run check
npm run lint:scripts
npm run lint:styles
npm run lint:docs
npm run build
```

`npm test` builds the userscript and runs the test suite. `npm run build` stages the bundle at `.build-tmp/index.min.js` and promotes it to `dist/index.min.js` after a successful build. Failed builds preserve the existing release bundle. Use `npm run watch` during development; it writes an unminified bundle to `.dev-dist/index.js` and leaves the installable bundle untouched.

## Contribute changes

Fork the repository, create a branch from `dev`, and open a pull request targeting `dev`.

## Publish a release

Open a pull request from this repository's `dev` branch into `main`. Add a dated `## [X.Y.Z] - YYYY-MM-DD` section to `CHANGELOG.md` with release notes and a stable semantic version greater than the latest version on `main` and every existing version tag. An edition suffix after the date is optional. An `[Unreleased]` section may remain above the new release, but it does not count as a version bump.

The Release workflow's `Changelog version` check fails if the version is unchanged, older, already tagged, malformed, duplicated, or missing release notes. Branch protection on `main` must require this check from GitHub Actions with branches up to date before merging, including administrators, to block merges. Other source branches do not publish releases and skip this check.

After the pull request merges, the workflow creates a `vX.Y.Z` tag at the exact merged commit and publishes a GitHub release using that version's changelog section as its notes. GitHub provides the source archives, including the committed `dist/index.min.js`; no separate build runs during publication. Re-running the publish job preserves an existing release for the same tag and commit, and refuses to reuse a tag pointing elsewhere. The npm tooling version and date-based userscript version remain independent of the changelog release version.
