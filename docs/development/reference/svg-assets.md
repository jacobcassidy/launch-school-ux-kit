# SVG assets

SVG files imported by source code live under [`src/svg`](../../../src/svg). Only referenced files are included in the userscript build.

Lucide icons live in `src/svg/lucide/<feature>/`, using the owning feature's name from `src/features`. Icons reused across features, such as the editor and scratchpad code icon, live in `src/svg/lucide/shared/`; this folder also holds icons for shared styles, such as search. Modified variants remain under their feature's `modified/` subfolder. Update imports in `src/shared/icons.js` and any CSS asset references when moving an icon.

The current project identity lives in [docs/design/branding](../../design/branding/README.md), with full logos for light and dark backgrounds, transparent PNG exports, and previews. Three ascending squares represent steady progress toward mastery and the kit's modular UI components. The SVGs combine vector squares with embedded raster lettering; the wordmark is not outlined vector text. No separate standalone mark is supplied.

Unused icon alternatives and older assets live in the [design reference assets](../../design/README.md) under [`docs/design/svg-reference`](../../design/svg-reference). Move an asset into `src/svg` and update its source reference when adopting it.

The archive includes the Launch School logo asset and unused Lucide icons. The project does not record the exact source revision for the vendored Lucide files; see [third-party notices](../../../THIRD-PARTY-NOTICES.txt) for license details.
