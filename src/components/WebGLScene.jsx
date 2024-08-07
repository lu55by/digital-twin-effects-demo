import { Canvas } from "@react-three/fiber";
import Main from "./Main";
import { Leva } from "leva";
const levaTheme = {
  sizes: {
    rootWidth: "400px", // Set the desired width here
  },
  colors: {
    // elevation1: "red",
    // elevation2: "blue",
    // elevation3: "yellow",
    // accent1: "red",
    // accent2: "blue",
    // accent3: "yellow",
    // highlight1: "red",
    // highlight2: "white",
    // highlight3: "yellow",
    // vivid1: "yellow",
    // folderWidgetColor: "#a00",
    folderTextColor: "#eee",
    // toolTipBackground: "yellow",
    // toolTipText: "red",
  },
};
export default function WebGLScene() {
  return (
    <>
      <Leva collapsed theme={levaTheme} />
      <Canvas
        gl={{
          antialias: true,
        }}
        shadows
        camera={{
          position: [0, 55.8335377410494 + 20, 126.58513431363215],
          // position: [0, 0, 9],
        }}
      >
        <Main />
      </Canvas>
    </>
  );
}
