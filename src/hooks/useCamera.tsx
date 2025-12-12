import { useContext } from "react";
import { CameraContext } from "../context/CameraContext";
import * as THREE from "three";

/**
 * Custom hook to access the CameraContext.
 * 
 * @returns {THREE.Camera | null | undefined} The camera instance from context
 */
const useCamera = (): THREE.Camera | null | undefined => {
  return useContext(CameraContext);
};
export default useCamera;
