import { useCallback } from "react";
import useCamera from "../../hooks/useCamera";

const LogCameraButton = () => {
  const camera = useCamera();

  const handleButtonClick = useCallback(() => {
    console.log("Camera position:", camera.position);
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
