import { useContext } from "react";
import { CameraContext } from "../context/CameraContext";

const useCamera = () => {
  return useContext(CameraContext);
};
export default useCamera;
