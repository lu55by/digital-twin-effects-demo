import hologramVertex from "../hologram/vertex.glsl";
import hologramFragment from "../hologram/fragment.glsl";
import * as THREE from "three";

export const HologramMaterial = new THREE.ShaderMaterial({
  vertexShader: hologramVertex,
  fragmentShader: hologramFragment,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uColor: new THREE.Uniform(new THREE.Color("#009cff")),
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});
