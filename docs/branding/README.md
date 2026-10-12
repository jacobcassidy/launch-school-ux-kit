# Launch School UX Kit branding

![Aligned logo on a dark background](preview.png)

- Light logo: [Transparent PNG](launch-school-ux-kit-logo.png) · [SVG](launch-school-ux-kit-logo.svg)
- Dark logo: [Transparent PNG](launch-school-ux-kit-logo-dark.png) · [SVG](launch-school-ux-kit-logo-dark.svg)
- [Light preview](preview-light.png): background `#F6F6F6`, Launch and School lettering in `#636363`, and squares and UX Kit lettering in `#F75C5F` with clean edges.

PNG previews show the dark version on charcoal (`#141821`) by default. Both logo variants have transparent backgrounds. The light logo uses gray (`#636363`) Launch and School lettering; the dark logo uses off-white (`#F2F2F0`). Squares and UX Kit lettering use coral (`#F75C5F`) in both variants, with clean edges and no gray outline.

The logo retains the foundational lettering's original alpha masks, font weight, and horizontal spacing. Recoloring changes RGB values without regenerating or resizing any lettering. The visible text rows have equal 32-pixel gaps.

The blocks are true squares with a 35% increase in side length at each step. At each transition, the vertical overlap is 20% of the smaller square's height; overlap distances and both horizontal and vertical position increments therefore grow with the same size ratio. Corner radii are 9% of each side. The largest block's top and smallest block's bottom match the text column at y=32 and y=590 in the cropped PNGs.

Aligned PNGs, SVGs, and the default preview share a 1504 × 622 presentation with equal 32-pixel margins around the visible logo on all four sides. Cropping uses integer pixel coordinates, preserving the lettering without resizing or resampling; SVGs use the matching viewBox. Visible bounds are measured at 50% alpha, excluding faint transparent-edge noise from the foundation.

SVGs combine vector squares with embedded raster lettering. The wordmark is not outlined vector text; its original alpha masks preserve the foundational letter shapes. SVG color filters recolor the lettering without changing its opacity.
