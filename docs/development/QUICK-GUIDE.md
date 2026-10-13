# Development Quick Guide

## Project at a glance

Launch School UX Kit is a browser userscript built with plain JavaScript modules and esbuild. The source entry point is `src/app/index.js`; it coordinates feature modules in `src/features/`, shared DOM and style helpers in `src/shared/`, and the stylesheet entry point at `src/styles/index.css`.

The application waits for the page DOM, discovers Launch School controls, injects the kit's styles and UI, restores saved panel preferences, then registers page watchers and keyboard shortcuts. Feature code lives with the feature it owns. Cross-feature actions are passed through the application as callbacks; shared utilities do not depend on features.

## Development build and release build

| Command         | Output               | Purpose                                                                                                                                                          |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run watch` | `.dev-dist/index.js` | Rebuilds on source changes. The bundle is readable and unminified, so it is convenient to inspect and load temporarily in a userscript manager while developing. |
| `npm run build` | `dist/index.min.js`  | Creates the minified, installable userscript for releases and end users.                                                                                         |

Both bundles include the userscript header from `src/userscript/header.txt`, bundled application code, embedded CSS and SVG assets, and license notices. Watch mode also notices changes to the header and license files. Its output is ignored by Git and does not replace the release bundle.

The release build first writes to `.build-tmp/index.min.js`. Only after esbuild succeeds does it move the result to `dist/index.min.js`, so a failed build leaves the previous release bundle intact. The temporary staging directory is removed after success.

## Typical edit loop

1. Install the project dependencies with `npm ci` (Node.js 24 or later).
2. Start `npm run watch` and load `.dev-dist/index.js` into your userscript manager for local iteration.
3. Make application changes in `src/app/`, feature behavior changes in `src/features/<feature>/`, shared helpers in `src/shared/`, and styles in `src/styles/`.
4. Use `npm test` to build the release bundle and run the automated test suite. Run `npm run check`, `npm run lint:scripts`, `npm run lint:styles`, and `npm run lint:docs` for formatting and lint checks.
5. Run `npm run build` when you need the installable release output in `dist/index.min.js`.

## Where to look

- `src/userscript/header.txt`: userscript metadata, including the installed script version.
- `src/app/`: DOM-ready startup, UI loading, navigation, reloads, and shortcut wiring.
- `src/features/`: UI and behavior grouped by feature; each `index.js` defines its public exports.
- `src/shared/`: reusable DOM references, buttons, icons, styles, and visual feedback.
- `src/styles/`: base styles, shared styles, feature styles, and page-specific overrides.
- `tests/`: Node test suite, organized around application, feature, shared, and tooling behavior.
- `dist/index.min.js`: generated installable userscript; regenerate it with `npm run build`.

For setup details and the contribution workflow, see [Contributing](../../CONTRIBUTING.md). For module ownership and initialization details, see [Architecture](architecture.md).
