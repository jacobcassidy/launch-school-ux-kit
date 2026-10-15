import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import scrollCaptures from "./scroll-captures.json";

const WINDOW = { x: 107, y: 57, width: 1706, height: 966, chrome: 32 };
const surface: CSSProperties = { position: "absolute", left: 0, top: 0, width: 1706, height: 933 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type Capture = { frame: number; name: string; dissolve?: number };
const typedText = {
  prompt: "Explain abstraction in one sentence.",
  code: 'print("Hello, Launch School!")',
  feedback: "I love Launch School!",
};

// Real native PWA captures. Letter captures intentionally share one template.
const captures: Capture[] = [
  { frame: 0, name: "01-full-ui" },
  { frame: 120, name: "02-settings", dissolve: 6 },
  { frame: 225, name: "03-headers-off", dissolve: 5 },
  { frame: 330, name: "04-headers-on", dissolve: 5 },
  { frame: 435, name: "05-sidebar-hidden", dissolve: 6 },
  { frame: 540, name: "06-sidebar-shrunk", dissolve: 6 },
  { frame: 645, name: "07-shrink-off", dissolve: 6 },
  { frame: 750, name: "08-settings-closed", dissolve: 6 },
  { frame: 855, name: "09-toc-open", dissolve: 6 },
  { frame: 1065, name: "09-toc-scroll-7" },
  { frame: 1095, name: "10-toc-closed", dissolve: 6 },
  { frame: 1200, name: "11-lsbot" },
  ...Array.from({ length: typedText.prompt.length }, (_, index) => ({
    frame: 1278 + index * 3,
    name: `12-prompt-${String(index + 1).padStart(2, "0")}`,
  })),
  { frame: 1410, name: "13-lsbot-submitted" },
  { frame: 1530, name: "13-lsbot-response", dissolve: 5 },
  { frame: 1560, name: "14-scratchpad" },
  { frame: 1635, name: "15-code-empty" },
  ...Array.from({ length: typedText.code.length }, (_, index) => ({
    frame: 1638 + index * 3,
    name: `15-code-${String(index + 1).padStart(2, "0")}`,
  })),
  { frame: 1755, name: "16-code-running" },
  { frame: 1770, name: "16-code-output" },
  { frame: 1860, name: "17-feedback" },
  ...Array.from({ length: typedText.feedback.length }, (_, index) => ({
    frame: 1935 + index * 3,
    name: `18-feedback-${String(index + 1).padStart(2, "0")}`,
  })),
  { frame: 2025, name: "19-tabs-hidden", dissolve: 6 },
  { frame: 2130, name: "20-header-hidden", dissolve: 6 },
];

const CaptureImage = ({ capture, opacity = 1 }: { capture: Capture; opacity?: number }) => {
  const field = Object.entries(scrollCaptures.typing).find(
    ([prefix]) => capture.name.startsWith(prefix) && /^\d+$/.test(capture.name.slice(prefix.length)),
  )?.[1];
  return (
    <AbsoluteFill style={{ opacity }}>
      <CanvasImage src={staticFile(`captures/${field ? field.base : capture.name}.webp`)} style={surface} />
      {field ? (
        <CanvasImage
          src={staticFile(`captures/${capture.name}.webp`)}
          style={{
            position: "absolute",
            left: field.rect[0],
            top: field.rect[1],
            width: field.rect[2],
            height: field.rect[3],
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

const CapturedPwa = () => {
  const frame = useCurrentFrame();
  const index = captures.findLastIndex((capture) => capture.frame <= frame);
  const current = captures[index];
  const previous = captures[Math.max(0, index - 1)];
  return (
    <>
      <CaptureImage capture={previous} />
      <CaptureImage
        capture={current}
        opacity={
          current.dissolve ? interpolate(frame, [current.frame, current.frame + current.dissolve], [0, 1], clamp) : 1
        }
      />
      {frame >= 870 && frame < 1065 ? (
        <div
          style={{
            position: "absolute",
            left: scrollCaptures.toc.x,
            top: scrollCaptures.toc.y,
            width: scrollCaptures.toc.width,
            height: scrollCaptures.toc.height,
            overflow: "hidden",
          }}
        >
          <CanvasImage
            src={staticFile(scrollCaptures.toc.src)}
            style={{
              position: "absolute",
              width: scrollCaptures.toc.width,
              translate: `0px ${interpolate(frame, [870, 1065], [0, -scrollCaptures.toc.distance], { ...clamp, easing: Easing.bezier(0.3, 0, 0.7, 1) })}px`,
            }}
          />
        </div>
      ) : null}
      {frame >= 2220 ? (
        <div style={{ ...surface, overflow: "hidden" }}>
          <CanvasImage
            src={staticFile(scrollCaptures.content.src)}
            style={{
              position: "absolute",
              width: scrollCaptures.content.width,
              translate: `0px ${interpolate(frame, [2220, 2610], [0, -scrollCaptures.content.distance], { ...clamp, easing: Easing.bezier(0.25, 0, 0.75, 1) })}px`,
            }}
          />
        </div>
      ) : null}
    </>
  );
};

type Rect = readonly [x: number, y: number, width: number, height: number];
type Flash = { rect: Rect; from?: number; duration?: number };
type CardProps = {
  title: string;
  keys?: string[];
  circle?: Rect;
  circleAfter?: Rect;
  flashes?: Flash[];
  persist?: boolean;
};
const position = ([x, y, width, height]: Rect): CSSProperties => ({
  position: "absolute",
  left: WINDOW.x + x,
  top: WINDOW.y + WINDOW.chrome + y,
  width,
  height,
});

const CardLayer = ({ title, keys, circle, circleAfter, flashes = [], persist }: CardProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = persist
    ? interpolate(frame, [0, 0.5 * fps], [0, 1], clamp)
    : interpolate(frame, [0, 0.5 * fps, 2.5 * fps, 3 * fps], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {flashes.map(({ rect, from = 0, duration = 0.5 }, index) =>
        frame >= from * fps && frame < (from + duration) * fps ? (
          <div key={index} style={{ ...position(rect), background: "rgba(255, 220, 58, 0.3)", borderRadius: 5 }} />
        ) : null,
      )}
      {circle ? (
        <div
          style={{
            ...position(circle),
            ...(circleAfter
              ? { left: WINDOW.x + interpolate(frame, [0.5 * fps, 0.7 * fps], [circle[0], circleAfter[0]], clamp) }
              : {}),
            opacity,
            border: "3px solid #ed555e",
            borderRadius: "50%",
            boxSizing: "border-box",
          }}
        />
      ) : null}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity,
            background: "rgba(35, 37, 41, 0.88)",
            borderRadius: 20,
            padding: 48,
            color: "#fff",
            fontSize: 40,
            fontWeight: 400,
            lineHeight: 1.2,
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div>{title}</div>
          {keys ? (
            <div style={{ display: "flex", gap: 4 }}>
              {keys.map((key, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    minWidth: 56,
                    width: key.length === 1 ? 56 : undefined,
                    height: 56,
                    paddingInline: 12,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 9,
                    color: "#ff6974",
                    fontSize: 32,
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DemoVideo = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ background: "#eef0f3", fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif" }}
    >
      <div
        style={{
          position: "absolute",
          left: WINDOW.x,
          top: WINDOW.y,
          width: WINDOW.width,
          height: WINDOW.height,
          borderRadius: 13,
          background: "#fff",
          boxShadow: "0 28px 64px rgba(23,31,45,0.22), 0 4px 12px rgba(23,31,45,0.10), 0 0 0 1px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", height: 32, width: "100%", background: "#fff" }}>
          {["#ff6058", "#ffbd2e", "#28c840"].map((color, index) => (
            <div
              key={color}
              style={{
                position: "absolute",
                left: 9 + 23 * index,
                top: 9,
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: color,
                boxShadow: "inset 0 0 0 0.7px rgba(0,0,0,0.16)",
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", top: 32, width: 1706, height: 933, overflow: "hidden" }}>
          <CapturedPwa />
        </div>
      </div>
      <Sequence name="Launch School UX Kit Demo" durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Launch School UX Kit Demo" />
      </Sequence>
      <Sequence name="Show Settings Panel" from={105} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Show Settings Panel" keys={["⌘", "⌃", ","]} circle={[1658, 0, 44, 44]} />
      </Sequence>
      <Sequence name="Hide Sidebar Section Headers" from={210} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Hide Sidebar Section Headers"
          circle={[1294, 134, 68, 68]}
          flashes={[
            { rect: [12, 55, 170, 24] },
            { rect: [12, 252, 170, 24] },
            { rect: [12, 449, 170, 24] },
            { rect: [12, 734, 170, 24] },
          ]}
        />
      </Sequence>
      <Sequence name="Show Sidebar Section Headers" from={315} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Show Sidebar Section Headers"
          circle={[1294, 134, 68, 68]}
          flashes={[
            { rect: [12, 55, 170, 24], from: 0.5, duration: 2.5 },
            { rect: [12, 252, 170, 24], from: 0.5, duration: 2.5 },
            { rect: [12, 449, 170, 24], from: 0.5, duration: 2.5 },
            { rect: [12, 734, 170, 24], from: 0.5, duration: 2.5 },
          ]}
        />
      </Sequence>
      <Sequence name="Hide Sidebar" from={420} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Hide Sidebar"
          keys={["⌘", "B"]}
          circle={[198, 0, 44, 44]}
          circleAfter={[4, 0, 44, 44]}
          flashes={[{ rect: [0, 0, 195, 933] }]}
        />
      </Sequence>
      <Sequence name="Shrink Sidebar Instead of Hiding" from={525} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Shrink Sidebar Instead of Hiding"
          circle={[1294, 174, 68, 68]}
          flashes={[{ rect: [0, 0, 43, 933], from: 0.5 }]}
        />
      </Sequence>
      <Sequence name="Hide Sidebar When Closed" from={630} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Hide Sidebar When Closed" circle={[1294, 174, 68, 68]} />
      </Sequence>
      <Sequence name="Close Settings" from={735} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Close Settings" keys={["⌘", "⌃", ","]} circle={[1658, 0, 44, 44]} />
      </Sequence>
      <Sequence name="Show Table of Contents" from={840} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Show Table of Contents" keys={["⌘", "⌃", "T"]} circle={[1624, 0, 44, 44]} />
      </Sequence>
      <Sequence name="Hide Table of Contents" from={1080} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Hide Table of Contents" keys={["⌘", "⌃", "T"]} circle={[1624, 0, 44, 44]} />
      </Sequence>
      <Sequence name="Focus Tab #1 (Ask LSBot)" from={1185} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Focus Tab #1 (Ask LSBot)"
          keys={["⌘", "⌃", "1"]}
          flashes={[{ rect: [852, 43, 118, 43] }, { rect: [852, 86, 854, 847] }]}
        />
      </Sequence>
      <Sequence name="Submit LSBot prompt" from={1395} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Submit LSBot prompt" keys={["Enter"]} />
      </Sequence>
      <Sequence name="Focus Tab #2 (Scratchpad)" from={1545} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Focus Tab #2 (Scratchpad)"
          keys={["⌘", "⌃", "2"]}
          flashes={[{ rect: [970, 43, 116, 43] }, { rect: [852, 86, 854, 847] }]}
        />
      </Sequence>
      <Sequence name="Run code" from={1740} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Run code" keys={["⌘", "S"]} flashes={[{ rect: [902, 794, 754, 114], from: 1 }]} />
      </Sequence>
      <Sequence name="Focus Tab #3 (Give Feedback)" from={1845} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer
          title="Focus Tab #3 (Give Feedback)"
          keys={["⌘", "⌃", "3"]}
          flashes={[{ rect: [1086, 43, 115, 43] }, { rect: [852, 86, 854, 847] }]}
        />
      </Sequence>
      <Sequence name="Hide Tabs Panel" from={2010} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Hide Tabs Panel" keys={["⌘", "⇧", "2"]} flashes={[{ rect: [852, 43, 854, 890] }]} />
      </Sequence>
      <Sequence name="Hide Header" from={2115} durationInFrames={3 * fps} premountFor={fps}>
        <CardLayer title="Hide Header" keys={["⌘", "⇧", "1"]} flashes={[{ rect: [0, 0, 1706, 43] }]} />
      </Sequence>
      <Sequence name="Enjoy!" from={2235} durationInFrames={durationInFrames - 2235} premountFor={fps}>
        <CardLayer title="Enjoy!" persist />
      </Sequence>
    </AbsoluteFill>
  );
};
