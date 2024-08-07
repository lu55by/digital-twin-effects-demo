import * as THREE from "three";
export function getUniformsColorStr(uniform) {
  return `#${uniform.value.getHexString(THREE.SRGBColorSpace)}`;
}
