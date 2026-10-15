"""Prepare native PWA screenshots and stitch their overlapping scroll regions.

Run with Pillow and NumPy installed:
    python scripts/prepare-captures.py /path/to/original/pngs
The checked-in WebP assets are sufficient for previewing and rendering.
"""

import json
from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "captures"
SOURCE = Path(sys.argv[1])
OUTPUT.mkdir(parents=True, exist_ok=True)
TYPING = {
    "12-prompt-": {"base": "11-lsbot", "rect": [895, 815, 635, 117]},
    "15-code-": {"base": "15-code-empty", "rect": [901, 153, 756, 560]},
    "18-feedback-": {"base": "17-feedback", "rect": [895, 350, 770, 230]},
}

for path in sorted(SOURCE.glob("*.png")):
    if path.stem == "probe-original":
        continue
    image = Image.open(path).convert("RGB")
    if image.size != (1706, 964):
        raise ValueError(f"Unexpected capture dimensions: {path}: {image.size}")
    # Remove the native title bar. Remotion supplies clean window chrome above
    # the captured web-app surface. Clear the cursor halo's remaining fringe
    # from an otherwise empty part of the header, without changing any control.
    image = image.crop((0, 32, 1706, 964))
    normalized = Image.new("RGB", (1706, 933))
    normalized.paste(image)
    normalized.paste(image.crop((0, 931, 1706, 932)), (0, 932))
    image = normalized
    ImageDraw.Draw(image).rectangle((662, 1, 722, 15), fill=image.getpixel((650, 8)))
    for prefix, region in TYPING.items():
        if path.stem.startswith(prefix) and path.stem[len(prefix):].isdigit():
            x, y, width, height = region["rect"]
            image = image.crop((x, y, x + width, y + height))
            break
    image.save(OUTPUT / f"{path.stem}.webp", lossless=True)


def stitch(names, box, filename):
    images = [Image.open(OUTPUT / f"{name}.webp").convert("RGB").crop(box) for name in names]
    height = images[0].height
    offsets = [0]
    errors = []
    for previous, current in zip(images, images[1:]):
        # Match horizontal text patterns in the overlap, ignoring the clip edges.
        a = np.asarray(previous.convert("L"), dtype=np.float32)[20:-20, ::5]
        b = np.asarray(current.convert("L"), dtype=np.float32)[20:-20, ::5]
        candidates = []
        for shift in range(min(650, height - 160)):
            overlap = a.shape[0] - shift
            candidates.append(float(np.mean(np.abs(a[shift:] - b[:overlap]))))
        delta = int(np.argmin(candidates))
        offsets.append(offsets[-1] + delta)
        errors.append(round(candidates[delta], 3))
    canvas = Image.new("RGB", (images[0].width, height + offsets[-1]), "white")
    # Keep the center of each overlap; this avoids the rounded clip boundaries.
    for index, (image, offset) in enumerate(zip(images, offsets)):
        top = 0 if index == 0 else (height - (offset - offsets[index - 1])) // 2
        bottom = height if index == len(images) - 1 else (height + offsets[index + 1] - offset) // 2
        if bottom > top:
            canvas.paste(image.crop((0, top, image.width, bottom)), (0, offset + top))
    canvas.save(OUTPUT / filename, lossless=True)
    result = {"src": f"captures/{filename}", "x": box[0], "y": box[1],
              "width": images[0].width, "height": height,
              "distance": offsets[-1], "offsets": offsets, "matchErrors": errors}
    print(filename, json.dumps(result))
    return result


metadata = {
    "typing": TYPING,
    "toc": stitch(["09-toc-open"] + [f"09-toc-scroll-{i}" for i in range(1, 8)],
                  (1355, 58, 1685, 908), "toc-scroll.webp"),
    "content": stitch(["20-header-hidden"] + [f"21-content-scroll-{i:02}" for i in range(1, 13)],
                      (0, 0, 1706, 933), "content-scroll.webp"),
}
(ROOT / "src" / "scroll-captures.json").write_text(json.dumps(metadata, indent=2) + "\n")
