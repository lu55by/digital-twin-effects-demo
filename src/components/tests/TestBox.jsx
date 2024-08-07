/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { useRef, useEffect } from "react";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec4 modelPos = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPos;
    
    // Varyings
    // vNormal = normalize(normalMatrix * normal);
    vNormal = (modelMatrix * vec4(normal, 0.)).xyz;
    vPos = modelPos.xyz;
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vec3 normal = normalize(vNormal);
    if (!gl_FrontFacing) normal *= -1.0;
    float stripes = pow(mod(vPos.y * 30., 1.), 2.0);
    float fresnel = max(pow(dot(normalize(vPos - cameraPosition), normal) + 1., 5.), 0.);
    float hologram = stripes * fresnel;
    hologram += fresnel * 2.;
    hologram *= smoothstep(.8, 0., fresnel);
    vec3 col = vec3(0., 1., 1.);
    gl_FragColor = vec4(col, hologram);
  }
`;

const ShaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
});

export default function TestBox(color) {
  const textBoxRef = useRef(null);
  useEffect(() => {
    textBoxRef.current.material = ShaderMaterial;
  }, [textBoxRef]);
  return (
    <mesh ref={textBoxRef}>
      <sphereGeometry />
      <meshBasicMaterial />
    </mesh>
  );
}
