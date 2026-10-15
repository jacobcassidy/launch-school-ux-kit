import { Composition } from "remotion";
import { DemoVideo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaunchSchoolDemo"
        component={DemoVideo}
        durationInFrames={2640}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
