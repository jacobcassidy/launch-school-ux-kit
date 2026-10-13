# Launch School UX Kit branding

![Logo on a dark background](logo/preview-dark.png)

- Light logo: [Transparent PNG](logo/launch-school-ux-kit-logo.png) · [SVG](logo/launch-school-ux-kit-logo.svg)
- Dark logo: [Transparent PNG](logo/launch-school-ux-kit-logo-dark.png) · [SVG](logo/launch-school-ux-kit-logo-dark.svg)
- [Light preview](logo/preview-light.png): background `#F6F6F6`, Launch and School lettering in `#636363`, and squares and UX Kit lettering in `#F75C5F` with clean edges.

PNG previews show the dark version on charcoal (`#141821`) by default. Both logo variants have transparent backgrounds. The light logo uses gray (`#636363`) Launch and School lettering; the dark logo uses off-white (`#F2F2F0`). Squares and UX Kit lettering use coral (`#F75C5F`) in both variants, with clean edges and no gray outline.

Recoloring changes RGB values without regenerating or resizing any lettering. The visible text rows have equal 32-pixel gaps.

The blocks are true squares with a 35% increase in side length at each step. Both horizontal edge-to-edge gaps are 12.At each transition, the vertical overlap is 20% of the smaller square's height. Corner radii are 9% of each side. The largest block's top and smallest block's bottom match the text column at y=96 and y=654 in the PNGs.

PNGs, SVGs, and both previews share a 1635 × 750 presentation with equal 96-pixel margins around the visible logo on all four sides. SVGs use the matching viewBox, with the lettering's size and internal spacing preserved. Visible bounds are measured at 50% alpha.

SVGs are fully vector: the squares remain rounded rectangles and all lettering uses paths derived from the original logo's alpha masks. Flat caps and stems use exact horizontal or vertical segments, and diagonal edges use single straight segments. Rounded bowls, shoulders, and feet use fitted cubic Bézier splines with continuous tangents and curvature. Curves ease to zero curvature at straight stem joins, and closed bowls use periodic splines to avoid a seam. The inner c curves ease toward their diagonal cuts, matching the outer curves' direction and curvature there. The curves approaching the triangle gaps in a, u, n, and h, and both curved runs of S, use continuous splines rather than short line fragments. The L, X, K, lowercase l, and i stem use only straight segments. Coordinates use the SVG's native units, with the dense trace's intermediate transforms removed. The lettering retains its measured bounds and row spacing. The SVGs contain no embedded images, raster filters, or font dependencies. Both variants share the same paths, dimensions, spacing, and lettering opacity; only the Launch and School fill color differs. Change the group fill colors to recolor the SVG lettering without changing its shapes.
