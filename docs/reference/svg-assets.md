# SVG assets

SVG files imported by source code live under [`src/svg`](../../src/svg). Only referenced files are included in the userscript build.

The project identity is available as a [full logo](../../src/svg/custom/ux-kit-logo.svg) and a [standalone mark](../../src/svg/custom/ux-kit-mark.svg). Three ascending blocks represent steady progress toward mastery and the kit's modular UI components. Both assets have transparent backgrounds and use the same coral and neutral gray palette on light and dark surfaces. All lettering is outlined, so no fonts are required. See the [light and dark preview](ux-kit-logo-preview.png).

The files under [`src/svg/reference`](../../src/svg/reference) are retained icon alternatives and older assets that have no import or CSS URL reference in the current source. They are kept for reference and do not enter the build unless source code imports them. Move an asset out of this folder when adopting it.

The reference folder contains the Launch School logo asset as well as unused Lucide icons. The project does not record the exact source revision for the vendored Lucide files; see [third-party notices](../../THIRD-PARTY-NOTICES.txt) for license details.
