import { Canvas } from "@react-three/fiber";
import Main from "./Main";
import { Leva } from "leva";

/**
 * Leva configuration object for theming the control panel.
 * Defines colors and sizes to match the application design.
 */
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

/**
 * WebGLScene Component
 *
 * Sets up the 3D scene using React Three Fiber Canvas.
 * Configures the camera, shadows, and renders the Main component and Leva controls.
 *
 * @returns {JSX.Element} The rendered Canvas and Leva controls
 */
export default function WebGLScene(): JSX.Element {
  return (
    <>
      <Leva collapsed theme={levaTheme} />
      <Canvas
        gl={{
          antialias: true,
        }}
        shadows
        camera={{
          // position: [0, 55.8335377410494 + 20, 126.58513431363215],
          position: [100, 206, 127],
          // position: [0, 0, 9],
        }}
      >
        <Main />
      </Canvas>
    </>
  );
}
