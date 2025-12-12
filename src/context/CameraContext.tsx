import { createContext } from "react";
import * as THREE from "three";

// Create a context to hold the camera
// Explicitly typing the context to hold a Camera or be undefined/null initially
export const CameraContext = createContext<THREE.Camera | null | undefined>(undefined);
