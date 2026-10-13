# Architecture

## Ownership

The userscript uses plain JavaScript modules. Application coordination lives in `src/app`, feature code and styles in flat `src/features/<feature>` folders, and reused utilities in `src/shared`. Each feature's `index.js` explicitly exports the functions needed by the application.

| Owner             | Responsibilities                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Header            | Rendering, layout measurement, missing-header detection, visibility, persisted state                                               |
| Sidebar           | Rendering, list configuration and order, heading, active links, dropdowns, unread counts, collapse controls, persisted preferences |
| Settings          | Menu and toggle, outside-click and Escape handling, preference checkboxes, current-page shortcut section                           |
| Tabs              | Tab and panel controls, activation and focus, visibility, persisted panel state                                                    |
| Editor            | Copy code and markup, run code, work in editor, copy and focus actions                                                             |
| Exercises         | Completion, next exercise, solution, pagination, review submission                                                                 |
| Prompts           | Conversation controls, prompt focus and submission, question boxes                                                                 |
| Table of contents | Native control placement, styling, visibility actions                                                                              |
| Notifications     | Toast container, display, transition timing, cleanup                                                                               |
| Shortcuts         | Registry, platform modifiers and labels, activation, keyboard watcher, tooltips, dynamic control observation                       |
| Application       | DOM-ready entry, UI loading, reload scheduling, navigation, shortcut registration and refresh                                      |
| Shared            | DOM registry, setters and discovery, button helpers, icons, flash feedback, stylesheet injection                                   |

## Dependencies and callbacks

Shared modules do not import features or application code. Features import shared utilities and their own modules. The application imports feature public exports and passes cross-feature actions as named callback options.

Header rendering receives Settings, sidebar, tabs-panel, and TOC builders. Header visibility receives the Settings close action, and missing-header detection receives the reload callback. Settings receives sidebar preference values and setters and the TOC close action; TOC receives the Settings close action. Question boxes receive tab focus. Editor and exercise actions receive tab actions and notification callbacks. Replacement watchers receive the application shortcut-refresh callback, and keyboard handling receives toast display.

The one direct feature dependency is Settings' shortcut section, which reads the shortcut registry and platform formatting through the shortcuts public exports. Shortcuts refresh flows through the application, which rebuilds registration, updates tooltips, then refreshes the Settings section. There is no event bus or plugin registry.

## DOM registry and initialization

`src/shared/dom` keeps native and injected element references together. Preserve the registry's object shape and null handling: pages may omit sidebar, tabs, editor, TOC, or exercise controls.

The entry waits for DOM readiness, records the current URL, then loads the UI. Loading injects styles, discovers native controls, renders the header and toaster, discovers injected controls, synchronizes Settings checkboxes, and updates sidebar and page controls. It rebuilds shortcuts and their Settings section, restores header, tabs, and sidebar state, then registers watchers. Restoration uses the existing session-storage keys and defaults.

Watchers use identity sets or document binding flags to avoid duplicate listeners and observers across repeated loads. Native navigation schedules one reload per animation frame. The reload module retains loader registration so it can run the initialized application loader without an import cycle. Module evaluation does not introduce DOM mutations.

## Styles and distribution

`src/styles/index.css` preserves the cascade: variables, defaults, animations; header, panels, sidebar, wrappers; boxes, buttons, code, editor, LSBot, search, Settings, tables, tabs, text, toasts, TOC, togglers, tooltips; book and home overrides. Feature styles live beside feature code, with shared controls and layout under `src/styles/shared`.

Esbuild bundles CSS through the virtual stylesheet module, embeds SVG assets, and appends userscript metadata and license notices. See [Contributing](../../CONTRIBUTING.md) for build commands and output paths.

## Migration plans

The [feature organization plan](plans/repository-organization-by-features.md) defines this layout. The [incremental organization plan](plans/repository-organization.md) is retained as an alternative, rather than a second migration.
