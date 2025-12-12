import * as THREE from "three";

/**
 * Extracts the hex string from a THREE.Uniform containing a Color.
 * 
 * @param uniform - The uniform containing a THREE.Color
 * @returns The hex string of the color
 */
export function getUniformsColorStr(uniform: THREE.Uniform<THREE.Color>): string {
  return `#${uniform.value.getHexString(THREE.SRGBColorSpace)}`;
}
