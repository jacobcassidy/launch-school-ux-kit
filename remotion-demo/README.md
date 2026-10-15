# Launch School UX Kit demo video

A reproducible Remotion composition implementing [the demo prompt](../docs/media/demo/demo-video-prompt.md): 1920 × 1080, 30 fps, 88 seconds, silent.

## Install and preview

From the repository root, with Node.js 24 or later:

```sh
npm run demo:install
npm run demo:studio
```

Open the local URL printed by Studio and select `LaunchSchoolDemo`. Keep Studio running while editing the composition.

The video dependencies have their own package and lockfile in this directory. They are separate from the userscript build dependencies.

## Render

Install FFmpeg, then run from the repository root:

```sh
npm run demo:check
npm run demo:render
```

The first render downloads Remotion's Chrome Headless Shell if it is not cached. Rendering produces these files in `docs/media/demo/`:

- `ux-kit-demo.mp4`: H.264, CRF 18, compatible with Safari and common video players.
- `ux-kit-demo.webm`: VP9, CRF 26, used as an additional browser playback source.
- `ux-kit-demo-poster.png`: the title card at one second.

The [demo player](../docs/media/demo/ux-kit-demo.html) includes both video formats.

## Source and timing

[Composition.tsx](src/Composition.tsx) contains the capture timeline and an independently editable sequence for each action card. [Root.tsx](src/Root.tsx) registers the 2640-frame composition.

- Cards fade in for 15 frames, hold for 60, and fade out for 15.
- UI actions occur 15 frames after their card begins. Consecutive cards have at least 15 frames between them.
- The real LSBot response appears at frame 1530; the next card starts at frame 1545.
- All three typing sequences use native PWA captures at three frames per character.
- Yellow flash highlights last 15 frames. Matching header controls have red circles during their cards.
- The final scroll starts at frame 2220. “Enjoy!” begins fading in at frame 2235 and remains through the end. Scrolling ends at frame 2610, followed by a one-second hold.

## Capture provenance

The checked-in assets were captured from the installed **Launch School Safari PWA**, on the Python introduction chapter, with this repository's UX Kit active. They include the actual LSBot answer and actual Scratchpad execution result. No browser chrome or recreated application UI is used.

Native screen recording was disabled in the capture session. This video therefore animates native screenshots, with short dissolves between UI states, real screenshots of each typed character, and continuous scrolling built from overlapping captures. It is not a continuous screen recording. The macOS title bar, window shadow, cards, circles, and highlights are presentation layers added by Remotion.

Before capturing, both UI options were off, LSBot was a new conversation, and the Scratchpad contained only its starting comment. The LSBot prompt was “Explain abstraction in one sentence.” The feedback text is only typed; it is not submitted.

## Refresh the captures

Capture a 1706 × 964 native PWA window and follow the prompt's steps. Keep the filenames used in the composition. Park the cursor in the blank native title bar. For scroll captures, use overlapping half-page scrolls so the script can align the text.

The original PNGs are retained locally in the ignored repository-root `.capture-source/` directory. The lossless WebP assets in `public/captures/` are sufficient to render the video on a fresh checkout.

To regenerate the WebP assets and scrolling strips:

```sh
cd remotion-demo
python3 -m venv /tmp/ux-kit-captures
/tmp/ux-kit-captures/bin/pip install -r scripts/requirements-captures.txt
/tmp/ux-kit-captures/bin/python scripts/prepare-captures.py ../.capture-source
npx prettier --write src/scroll-captures.json
```

`prepare-captures.py` removes native title-bar pixels, clears the cursor halo from a blank header region, preserves native UI pixels, and matches overlapping scroll captures. Character captures store only the changing input or editor region to reduce asset size. It writes the scroll distances and typing regions to `src/scroll-captures.json`.
