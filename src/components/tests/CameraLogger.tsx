import { useCallback } from "react";
import useCamera from "../../hooks/useCamera";

/**
 * LogCameraButton Component
 *
 * A debug button that logs the current camera position to the console when clicked.
 * Helper utility for determining camera coordinates for scene setup.
 *
 * @returns {JSX.Element} The button element
 */
const LogCameraButton = (): JSX.Element => {
  const camera = useCamera();

  const handleButtonClick = useCallback(() => {
    if (camera) {
        console.log("Camera position:", camera.position);
    } else {
        console.warn("Camera not found in context");
    }
  }, [camera]);

  return (
    <button
      onClick={handleButtonClick}
      style={{ position: "absolute", top: 20, left: 20 }}
    >
      Log Camera Position
    </button>
  );
};

export default LogCameraButton;
