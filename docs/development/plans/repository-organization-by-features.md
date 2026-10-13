# Organize the repository by features

## Summary

Group each feature’s UI, actions, state, and event watchers together. Keep styles for all features under `src/styles/features/<feature>/`, with application initialization and coordination separate from features and a small shared layer for reused DOM and visual utilities.

This is an alternative to [the incremental organization plan](repository-organization.md). Implement one source organization approach. This plan retains the documentation cleanup, useful root README, and migration from `dist/js/index.min.js` to `dist/index.min.js`.

The result should let a maintainer find most sidebar changes in the sidebar feature, most Settings changes in Settings, and most exercise changes in exercises. Preserve existing userscript behavior throughout the reorganization.

## Target layout and ownership

```text
src/
├── app/
│   ├── index.js                  # Userscript entry and DOM-ready initialization
│   ├── load-ui.js                # Coordinates feature rendering and watchers
│   ├── reload.js                 # Reload scheduling and loader registration
│   ├── navigation.js             # Native page navigation watcher
│   ├── shortcuts.js              # Registers feature actions and refreshes their UI
│   └── state.js                  # Last URL and reload scheduling state
├── features/
│   ├── header/
│   ├── sidebar/
│   ├── settings/
│   ├── tabs/
│   ├── editor/
│   ├── exercises/
│   ├── prompts/
│   ├── toc/
│   ├── notifications/
│   └── shortcuts/
├── shared/
│   ├── dom/                      # Element registry, setters, sync, and button helpers
│   ├── icons.js                   # Reused SVG factories and catalog
│   ├── flash.js                   # Focus feedback reused across controls
│   └── styles.js                  # Injects the bundled stylesheet once
├── styles/
│   ├── index.css                 # Ordered imports of shared and feature styles
│   ├── features/                 # Feature CSS, grouped by feature
│   ├── base/                     # Variables, defaults, and animations
│   ├── shared/                   # Common controls, text, and page layout
│   └── pages/                    # Book and home page overrides
├── svg/                          # Runtime SVG assets
└── userscript/
    └── header.txt
```

Each feature uses a flat folder with an `index.js` that explicitly exports the functions needed by application coordination. Use descriptive filenames such as `sidebar.js`, `lists.js`, `actions.js`, `state.js`, and `unread-count.js`; retain existing descriptive basenames for moved modules. Keep feature styles in `src/styles/features/<feature>/`, using the existing descriptive basenames. Do not create empty layers or a separate component hierarchy inside every feature.

When a control and its watcher share a basename, prefix the watcher with `watch-`, such as `next-exercise.js` and `watch-next-exercise.js`. Keep setters beside the owning state in `state.js` and feature visibility/interaction actions in `actions.js`.

| Owner             | Existing responsibilities to place together                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header            | Header rendering, layout measurement, missing-header detection, visibility actions, and persisted header state.                                                                                                                      |
| Sidebar           | Sidebar rendering, list ordering and configuration, sidebar heading, active link synchronization, link/dropdown interactions, unread counts, sidebar toggle button and watcher, collapse actions, and persisted sidebar preferences. |
| Settings          | Settings menu, Settings toggle button and watcher, show/hide/toggle actions, outside-click and Escape handling, sidebar preference toggler watchers, and the current-page shortcut section.                                          |
| Tabs              | Tab buttons and watchers, tabs-panel toggle button and watcher, tab activation, focus behavior, visibility actions, and persisted tabs-panel state.                                                                                  |
| Editor            | Copy-code, copy-markup, run-code, and work-in-editor controls; their watchers; editor focus and copy shortcut actions.                                                                                                               |
| Exercises         | Completion, next-exercise, solution, and pagination controls; their watchers; completion toggle, next-exercise, and submit-review shortcut actions.                                                                                  |
| Prompts           | Conversation controls, prompt focus and submission watchers, question-box handling, and prompt submission behavior.                                                                                                                  |
| Table of contents | Native TOC button placement and styling plus show/hide/toggle actions.                                                                                                                                                               |
| Notifications     | Toast container injection, toast display, transition timing, and cleanup.                                                                                                                                                            |
| Shortcuts         | Shortcut registry and setter, platform modifier matching and labels, shortcut activation, keyboard watcher, tooltip synchronization, and dynamic shortcut-control observation.                                                       |
| Application       | Existing entry, UI load sequence, reload scheduling, URL changes, and the cross-feature shortcut availability/registration sequence.                                                                                                 |
| Shared            | Native and injected element registries and setters, element discovery, button property helpers, icon factories, flash feedback, and stylesheet injection.                                                                            |

### Split files that currently mix features

- Split `show.js`, `hide.js`, and `toggle.js` into each owning feature’s `actions.js`. Move toast display and its private transition helper into notifications. Preserve existing exported function names when moving them.
- Split `activate.js`: shortcut activation belongs to shortcuts; tab activation belongs to tabs. Move platform shortcut helpers into shortcuts and `handleFocus` into tabs.
- Split UI state and its setters: header, sidebar, and tabs own their persisted state and corresponding setters; application state owns `lastUrl` and `isReloadScheduled`. Keep storage key names, defaults, and session-storage behavior unchanged.
- Keep the existing native/injected DOM registry and element discovery together in shared DOM. These references are used across features and should retain their existing object shape and null handling.
- Separate preference checkbox synchronization from injected-element discovery. Settings owns synchronizing its checkbox UI; sidebar owns applying its stored preferences to the native sidebar.
- Replace loaded-state synchronization with feature-owned restoration functions called by the application at the same point in the load sequence.
- Move shortcut availability registration into application coordination. Extract its inline copy, editor-focus, next-exercise, review-submission, and tab actions into their owning features. Preserve registration order, availability checks, labels, and tooltip behavior.
- Remove the old `modules/components` and `modules/utils` directories after every caller has migrated. Update module comments, imports, source URLs used in tests, SVG references, and bundler entry points.

### Keep dependencies explicit

- Shared modules must not import features or application modules. Feature modules may import shared code and their own modules; application modules compose features through their explicit public exports.
- Pass cross-feature actions and change notifications as named callback options from application coordination. Do not introduce an event bus, plugin registry, or dependency injection framework.
- Header rendering receives the Settings menu builder and the Settings, sidebar, tabs-panel, and TOC control builders. Header visibility receives the Settings close action. Missing-header detection receives the application reload callback.
- Settings receives sidebar preference values/setters and the TOC close action. TOC receives the Settings close action. Question-box handling receives the tabs focus action. This preserves coordinated behavior without mutual feature imports.
- Editor actions receive tabs activation/focus and notification callbacks for scratchpad focus and copy feedback. Exercise actions receive tabs activation and notification callbacks for review submission, completion feedback, and next-exercise feedback.
- Exercise control replacement watchers and dynamic shortcut-control observation receive the application shortcut-refresh callback. Keyboard handling receives the notification callback. Application shortcut refresh rebuilds registration, updates tooltips, and refreshes the Settings shortcut section in the existing order.
- Allow one direct feature dependency: the Settings shortcut section reads the shortcut registry and platform key formatting through the shortcuts public exports. Shortcuts must not import Settings; changes flow back through the application callback.
- Preserve the loader registration pattern used by reload scheduling. Keep module evaluation free of new DOM mutations and avoid accessing injected callbacks before application initialization.

### Colocate styles without changing the cascade

- Move header and sidebar part styles to `src/styles/features/header` and `src/styles/features/sidebar`.
- Move all feature CSS into `src/styles/features/<feature>/`: Settings and toggler styles into `settings`, tabs styles into `tabs`, code/editor styles into `editor`, LSBot styles into `prompts`, TOC styles into `toc`, and toast styles into `notifications`. Keep separate stylesheet files when a feature currently has several.
- Keep common boxes, buttons, search, tables, text, tooltips, panel layout, and wrappers in `src/styles/shared`. Retain base variables/defaults/animations and book/home overrides under `src/styles/base` and `src/styles/pages`.
- Rebuild the stylesheet entry’s import paths while preserving the exact current import order, rule contents, selectors, and custom property names. Update CSS asset URLs as needed and direct stylesheet paths used by tests. Keep every CSS file under `src/styles`.
- Update esbuild to use the application entry and stylesheet entry shown above. Preserve the virtual stylesheet module, SVG loaders, metadata, and license injection.

## Documentation, tests, and distribution

### Documentation

- Keep installation, features, shortcuts, and limitations in the root README. Add links to root `CONTRIBUTING.md` and `docs/README.md`.
- Move the contributor guide to `CONTRIBUTING.md`. Use `docs/development/architecture.md` to explain the feature ownership table, callback wiring, shared DOM registry, initialization order, and stylesheet cascade.
- Keep technical guides under `docs/reference`, current logos/previews and their guide under `docs/branding`, the HTML player and video together under `docs/media/demo`, and versioned screenshots under `docs/media/screenshots`.
- Move unused SVG alternatives and old assets into `docs/design/svg-reference`, preserving their internal hierarchy. Add a short design archive guide and update third-party notice paths.
- Move both organization plans into `docs/development/plans` when the documentation migration is implemented. Preserve the alternative plan and update links between the plans and the documentation index. Save this new plan under `docs/dev/plans` until implementation.
- Move the local TODO file into `docs/development`, retain its contents, and update the ignore rule without tracking the file.
- Correct the SVG guide’s outdated outlined-wordmark and standalone-mark claims to match the actual branding files. Update affected local and GitHub links and label historical screenshots by version. Preserve historical changelog entries and existing media bytes.

### Tests

```text
tests/
├── app/                          # Initialization and reload/navigation behavior
├── features/
│   ├── header/
│   ├── sidebar/
│   ├── settings/
│   ├── tabs/
│   ├── editor/
│   ├── exercises/
│   ├── prompts/
│   ├── toc/
│   ├── notifications/
│   └── shortcuts/
├── shared/                       # Shared DOM/button utilities
├── integration/                  # Bundle, DOM, contrast, and cross-feature checks
├── tooling/                      # Userscript metadata watch tooling
└── support/                      # Source loader, header fixture, integration entry
```

- Move initialization/reload tests into application tests. Move single-feature cases into the corresponding feature folder. Keep mixed cases such as cloned listeners, repeated UI, button icons, contrast, bundle smoke, and DOM integration together under integration tests. Empty feature test folders need not be created.
- Move DOM setter and button property tests into shared tests and userscript header watcher tests into tooling tests.
- Move the three reusable support modules into `tests/support`. Make the source loader resolve source strings relative to the repository root and update callers to paths such as `src/features/header/header.js`. Update fixture imports, direct file reads, and esbuild integration-entry paths for their new locations.
- Change the npm test script to `npm run build && node --test` so the default recursive test discovery includes the nested test cases. Verify all existing cases are discovered and support modules are not treated as test cases.
- Preserve test assertions and dependency doubles while adapting them to split state/actions and callback options. Add targeted coverage for callback wiring and split feature-state restoration where existing tests do not exercise those boundaries.

### Distribution

- Move the committed release bundle to `dist/index.min.js` and remove `dist/js/index.min.js`. Update the release destination, CI freshness check, smoke test, README installation link, and contributor instructions together.
- Write the watch bundle to `.dev-dist/index.js` and the staged release bundle to `.build-tmp/index.min.js`, removing the `js` directory from both output paths. Continue writing the release bundle only after a successful build.
- Preserve the userscript header, license notices, platform shortcuts, accessibility behavior, and runtime output. Source module exports are internal interfaces; this change does not introduce a new public runtime API.

## Validation and implementation sequence

1. Record the passing baseline, discovered test count, release output, and current load/import order. Inspect and preserve unrelated working-tree edits before making changes.
2. Complete the documentation/media/reference-asset cleanup and commit it separately. Verify links, assets, and third-party notice paths; exclude the ignored TODO and unrelated user edits.
3. Migrate test organization/support paths and recursive discovery while source paths still target the existing implementation. Validate unchanged assertions and test discovery, then commit this task separately.
4. Establish application/shared modules and split mixed actions/state into the owning feature folders. Migrate all feature rendering, callbacks, watchers, styles, and tests in one complete source migration. Remove old directories only after all references are updated. Validate the full migration and commit it separately.
5. Complete and validate the distribution path migration, then commit it separately.

Run the existing test suite, formatting check, and script/style/documentation lint checks after the relevant migration. Acceptance checks must cover:

- Every baseline test remains discovered and passing; imports and shared test helpers resolve correctly from nested folders.
- Repeated initialization and native navigation do not duplicate UI, listeners, or observers. Header replacement and reload scheduling still work.
- Header, sidebar, and tabs restore their stored state using the existing storage keys. Missing native controls continue to be handled safely.
- Settings retains keyboard navigation, Escape/outside-click behavior, focus restoration, checkbox synchronization, and mutual exclusion with TOC. Hidden controls remain excluded from keyboard navigation.
- Shortcut registration, numbered visible tabs, platform modifiers, tooltips, and the Settings shortcut list remain synchronized after native controls are replaced.
- Exercise completion, next-exercise, review-submission guards, editor controls, prompt submission/refocus, and notification cleanup retain existing behavior.
- Feature styles preserve the existing cascade and appearance. Perform a focused visual smoke check of the full UI, collapsed sidebar, hidden header/tabs, Settings, and TOC.
- No active imports or CSS URLs point to archived SVGs or removed source folders. No feature imports application modules, shared code imports features, or callback wiring introduces an import cycle.
- The watch build writes `.dev-dist/index.js`, staging writes `.build-tmp/index.min.js`, and the release build writes `dist/index.min.js`; none of these outputs has a `js` subdirectory. CI checks the release file, installation instructions use its new URL, and the old tracked bundle is absent. Compare generated behavior with the baseline and investigate bundle differences caused by changed module ordering.

## Assumptions

- This plan replaces the incremental source layout if selected; do not apply both source migrations in sequence.
- Use plain JavaScript modules, existing build tools, and named callback options. No framework, TypeScript migration, or unrelated behavior changes are included.
- Keep common DOM references, icon factories, and visual utilities shared; feature-specific state and actions belong to features.
- Preserve historical assets and the alternative plan. No image or video regeneration is needed.

## Documentation navigation

See the [documentation index](../../README.md) and [implemented architecture](../architecture.md).
