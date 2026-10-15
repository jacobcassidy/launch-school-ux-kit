import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const media = fileURLToPath(new URL("../../docs/media/demo/", import.meta.url));
const run = (args) => {
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg exited with ${result.status}`);
};

console.info("Exporting WebM...");
run([
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  `${media}ux-kit-demo.mp4`,
  "-c:v",
  "libvpx-vp9",
  "-b:v",
  "0",
  "-crf",
  "26",
  "-row-mt",
  "1",
  "-threads",
  "4",
  "-deadline",
  "good",
  "-cpu-used",
  "4",
  "-an",
  `${media}ux-kit-demo.webm`,
]);
console.info("Exporting the title-card poster...");
run([
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  `${media}ux-kit-demo.mp4`,
  "-ss",
  "1",
  "-frames:v",
  "1",
  "-update",
  "1",
  `${media}ux-kit-demo-poster.png`,
]);
console.info(`Demo deliverables saved in ${media}`);
