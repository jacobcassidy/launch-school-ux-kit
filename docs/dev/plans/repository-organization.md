# Simplify the repository and make docs easier to navigate

## Summary

Organize documentation by purpose, separate media from technical references, and simplify JavaScript nesting. Keep installation, features, and shortcuts in the root README.

The biggest improvement is making `docs/reference` contain actual reference guides: it currently also holds videos, an HTML player, and historical screenshots.

## Documentation layout

```text
README.md
CONTRIBUTING.md
CHANGELOG.md
docs/
├── README.md                     # Documentation index
├── development/
│   └── architecture.md           # Source layout and runtime flow
├── reference/
│   ├── sidebar-lists.md
│   ├── styles.md
│   └── svg-assets.md
├── branding/                     # Current logos, previews, and guide
├── media/
│   ├── demo/                     # HTML player and video together
│   └── screenshots/
│       ├── v1.0.0/
│       ├── v1.1.0/
│       └── v1.5.0/
└── design/
    ├── README.md                 # Explains retained design references
    └── svg-reference/            # Unused icons and older assets
```

- Move the contributor guide to root `CONTRIBUTING.md`, using the conventional name. Link it and the documentation index from the root README.
- Add a short documentation index linking every guide, branding assets, demo, and screenshot versions. Label screenshots as historical examples.
- Move the demo player and video together so their relative links continue working.
- Retain versioned screenshots and existing branding filenames.
- Move unused SVG references from source into the design archive, preserving their internal directory structure. Update asset documentation and third-party notice paths.
- Correct the SVG guide’s outdated claims about outlined lettering and a standalone mark to match the actual branding assets.
- Move the local, ignored TODO file into `docs/development`, update its ignore rule, and preserve its contents without committing it.
- Update affected links, including GitHub URLs in the README. Leave historical changelog entries intact.

## Source, tests, and tooling

Simplify JavaScript into these direct folders:

```text
src/js/
├── index.js
├── components/
├── config/
├── dom/
├── helpers/
├── state/
├── sync/
└── watch/
```

- Remove the `modules` and `utils` nesting; rename `configs` to `config`. Preserve existing subfolders, exports, and module responsibilities.
- Update imports, test source paths, SVG paths, and module documentation to match.
- Add an architecture guide explaining initialization, UI injection, state synchronization, and event watchers.
- Put the three shared test support files—source loader, header fixture, and integration entry—under `tests/support`. Keep test cases directly under `tests`.
- Preserve the source loader’s existing resolution of paths relative to `tests`; update the integration entry’s imports and bundling path.
- Retain the existing CSS organization, runtime SVG folders, root tool configurations, and build script location.
- Move the installable bundle from `dist/js/index.min.js` to `dist/index.min.js` and remove the old tracked output. Update the release build destination, CI bundle freshness check, bundle smoke test, README installation link, and contributor guide to use the new path. Keep the staging and development watch output paths unchanged. No public runtime API or behavior changes are intended.

## Validation and completion

- Check all moved Markdown links, images, HTML media references, and README URLs.
- Verify no active source imports or CSS URLs point into the archived SVG directory.
- Run the existing test suite, formatting check, and script, style, and documentation lint checks.
- Confirm the generated userscript remains equivalent; investigate any bundle differences caused by moving modules.
- Verify the release build produces `dist/index.min.js`, the old tracked bundle is absent, and active installation instructions, tests, and CI checks use the new path. Preserve historical changelog references.
- Complete four separate commits: documentation and reference assets, JavaScript organization, test support organization, and distribution path migration. Validate each task before committing.
- Leave the existing branding README edits and logo-preview deletion uncommitted as unrelated user changes.

## Assumptions

- Use the selected incremental source cleanup rather than regrouping code by feature.
- Preserve historical assets; no deletion or media regeneration is needed.
- Keep the README useful on its own and use the docs index for deeper material.
