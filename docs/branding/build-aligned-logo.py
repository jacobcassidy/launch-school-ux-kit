"""Assemble the logo with the foundation's original lettering and exact block geometry."""

import base64
import json
import re
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FOUNDATION = ROOT / "imagegen-foundation.png"
CANVAS = (1774, 887)
ROW_GAP = 32
SIZE_RATIO = 1.35
OVERLAP = 0.20
CORNER_RADIUS = 0.09
CORAL = "#FD533A"
OFF_WHITE = "#F2F2F0"
BACKGROUND = "#141821"
ROWS = [
    {"text": "Launch", "crop": (765, 190, 780, 181)},
    {"text": "School", "crop": (765, 373, 780, 187)},
    {"text": "UX Kit", "crop": (765, 561, 780, 182)},
]


def run(*args):
    result = subprocess.run(args, check=True, text=True, capture_output=True)
    return result.stdout.strip()


def crop_geometry(crop):
    x, y, width, height = crop
    return f"{width}x{height}+{x}+{y}"


def ink_bounds(path, crop):
    bounds = run(
        "magick", str(path), "-crop", crop_geometry(crop), "+repage",
        "-alpha", "extract", "-threshold", "50%", "-format", "%@", "info:",
    )
    width, height, x, y = map(int, re.fullmatch(r"(\d+)x(\d+)\+(\d+)\+(\d+)", bounds).groups())
    return (crop[0] + x, crop[1] + y, width, height)


def compose(blocks_png, rows, output):
    args = ["magick", str(blocks_png), "-define", "compose:outside-overlay=false"]
    for row, image in zip(ROWS, rows):
        x, y, _, _ = row["crop"]
        args += [str(image), "-geometry", f"+{x}+{y + row['shift']}", "-compose", "Src", "-composite"]
    run(*args, f"PNG32:{output}")


def main():
    assert run("magick", "identify", "-format", "%wx%h", str(FOUNDATION)) == "1774x887"
    for row in ROWS:
        row["source_ink"] = ink_bounds(FOUNDATION, row["crop"])

    top = ROWS[0]["source_ink"][1]
    next_top = top
    for row in ROWS:
        row["shift"] = next_top - row["source_ink"][1]
        x, _, width, height = row["source_ink"]
        row["destination_ink"] = (x, next_top, width, height)
        next_top += height + ROW_GAP
    bottom = next_top - ROW_GAP
    span = bottom - top

    small = span / (1 + SIZE_RATIO + SIZE_RATIO**2 - OVERLAP * (1 + SIZE_RATIO))
    medium, large = small * SIZE_RATIO, small * SIZE_RATIO**2
    gap_small, gap_medium = small * 0.06, medium * 0.06
    symbol_width = small + medium + large + gap_small + gap_medium
    right = min(row["source_ink"][0] for row in ROWS) - 40
    left = right - symbol_width
    y_large = top
    y_medium = y_large + large - OVERLAP * medium
    y_small = y_medium + medium - OVERLAP * small
    blocks = [
        {"x": left, "y": y_small, "side": small},
        {"x": left + small + gap_small, "y": y_medium, "side": medium},
        {"x": left + small + gap_small + medium + gap_medium, "y": y_large, "side": large},
    ]
    assert abs(y_small + small - bottom) < 1e-9
    assert abs((y_small - y_medium) / (y_medium - y_large) - 1 / SIZE_RATIO) < 1e-9
    assert abs((blocks[2]["x"] - blocks[1]["x"]) / (blocks[1]["x"] - blocks[0]["x"]) - SIZE_RATIO) < 1e-9

    rects = "\n".join(
        f'    <rect x="{b["x"]:.6f}" y="{b["y"]:.6f}" width="{b["side"]:.6f}" height="{b["side"]:.6f}" rx="{b["side"] * CORNER_RADIUS:.6f}" />'
        for b in blocks
    )
    mark = f'<g fill="{CORAL}">\n{rects}\n  </g>'
    header = '<svg xmlns="http://www.w3.org/2000/svg" width="1774" height="887" viewBox="0 0 1774 887" fill="none" role="img" aria-labelledby="title description">'
    foundation_data = base64.b64encode(FOUNDATION.read_bytes()).decode()
    clips = "\n".join(
        f'    <clipPath id="row-{i}"><rect x="{row["crop"][0]}" y="{row["crop"][1]}" width="{row["crop"][2]}" height="{row["crop"][3]}" /></clipPath>'
        for i, row in enumerate(ROWS)
    )
    color_filter = '''    <filter id="off-white" color-interpolation-filters="sRGB">
      <feComponentTransfer>
        <feFuncR type="linear" slope="0" intercept="0.9490196078431372" />
        <feFuncG type="linear" slope="0" intercept="0.9490196078431372" />
        <feFuncB type="linear" slope="0" intercept="0.9411764705882353" />
        <feFuncA type="identity" />
      </feComponentTransfer>
    </filter>'''
    for dark in (False, True):
        letters = []
        for i, row in enumerate(ROWS):
            recolor = ' filter="url(#off-white)"' if dark and i < 2 else ""
            letters.append(f'  <g transform="translate(0 {row["shift"]})"><g clip-path="url(#row-{i})"><use href="#foundation"{recolor} /></g></g>')
        svg = f'''{header}
  <title id="title">Launch School UX Kit</title>
  <desc id="description">Original foundational lettering with three precisely aligned coral squares. Lettering is embedded raster content; blocks are vector shapes.</desc>
  <defs>
    <image id="foundation" width="1774" height="887" href="data:image/png;base64,{foundation_data}" />
{clips}
{color_filter if dark else ""}
  </defs>
  {mark}
{chr(10).join(letters)}
</svg>
'''
        suffix = "-dark" if dark else ""
        (ROOT / f"launch-school-ux-kit-aligned{suffix}.svg").write_text(svg)

    with tempfile.TemporaryDirectory(prefix="launch-school-branding-") as temporary:
        temp = Path(temporary)
        mark_svg = temp / "blocks.svg"
        mark_svg.write_text(f"{header}\n{mark}\n</svg>\n")
        blocks_png = temp / "blocks.png"
        run("rsvg-convert", "--output", str(blocks_png), str(mark_svg))
        light_rows, dark_rows = [], []
        for i, row in enumerate(ROWS):
            source = temp / f"row-{i}.png"
            run("magick", str(FOUNDATION), "-crop", crop_geometry(row["crop"]), "+repage", f"PNG32:{source}")
            light_rows.append(source)
            dark = temp / f"row-{i}-dark.png"
            if i < 2:
                run("magick", str(source), "-channel", "RGB", "-fill", OFF_WHITE, "-colorize", "100", "+channel", f"PNG32:{dark}")
                dark_rows.append(dark)
            else:
                dark_rows.append(source)
        light = ROOT / "launch-school-ux-kit-aligned.png"
        dark = ROOT / "launch-school-ux-kit-aligned-dark.png"
        compose(blocks_png, light_rows, light)
        compose(blocks_png, dark_rows, dark)
        mark_ink = ink_bounds(light, (0, 0, 750, CANVAS[1]))
        assert mark_ink[1] == top and mark_ink[1] + mark_ink[3] == bottom
        for i, row in enumerate(ROWS):
            x, y, width, height = row["crop"]
            crop = (x, y + row["shift"], width, height)
            actual = temp / "actual.png"
            run("magick", str(light), "-crop", crop_geometry(crop), "+repage", f"PNG32:{actual}")
            run("magick", "compare", "-metric", "AE", str(light_rows[i]), str(actual), "null:")
            assert ink_bounds(light, crop) == row["destination_ink"]
            run("magick", str(dark), "-crop", crop_geometry(crop), "+repage", "-alpha", "extract", str(temp / "dark-alpha.png"))
            run("magick", str(light_rows[i]), "-alpha", "extract", str(temp / "source-alpha.png"))
            run("magick", "compare", "-metric", "AE", str(temp / "source-alpha.png"), str(temp / "dark-alpha.png"), "null:")
        run("magick", str(dark), "-background", BACKGROUND, "-alpha", "remove", "-alpha", "off", str(ROOT / "preview.png"))

    layout = {
        "source": FOUNDATION.name, "method": "Copy original text pixels without resampling; recolor RGB only for dark lettering.",
        "canvas": CANVAS, "row_gap": ROW_GAP, "size_ratio": SIZE_RATIO,
        "overlap_fraction_of_smaller_square": OVERLAP, "corner_radius_fraction": CORNER_RADIUS,
        "text_top": top, "text_bottom": bottom, "blocks": blocks, "rows": ROWS,
    }
    (ROOT / "aligned-layout.json").write_text(json.dumps(layout, indent=2) + "\n")
    print(f"Foundation text pixels preserved exactly; dark alpha masks match exactly. Equal row gaps: {ROW_GAP}px.")
    print(f"Blocks and lettering span y={top} to {bottom}; side lengths: {small:.3f}, {medium:.3f}, {large:.3f}.")


if __name__ == "__main__":
    main()
