/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import hologramVertex from "../shaders/hologram/csm/vertex.glsl";
import hologramFragment from "../shaders/hologram/csm/fragment.glsl";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { COLOR_CYAN, COLOR_HOLOGRAM } from "../../constants/Colors";
import { useControls } from "leva";

const uniforms = {
  uTime: new THREE.Uniform(0),
  uColor: new THREE.Uniform(COLOR_HOLOGRAM),
};

export default function CustomShaderMaterialTst() {
  const { position } = useControls("CustomShaderMaterialTst", {
    position: {
      value: { x: 0, y: 0, z: 0 },
      min: -100,
      max: 100,
      step: 0.01,
    },
  });

  const ref = useRef(null);
  //   useEffect(() => {
  //     ref.current.position.set(position);
  //   }, [position]);

  const matRef = useRef(null);
  useFrame(
    (state) => {
      if (matRef.current)
        matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    },
    [matRef]
  );

  return (
    // <mesh>
    <mesh ref={ref} position={[position.x, position.y, position.z]}>
      <sphereGeometry args={[1, 124, 124]} />
      <CustomShaderMaterial
        ref={matRef}
        baseMaterial={THREE.MeshPhysicalMaterial}
        vertexShader={hologramVertex}
        fragmentShader={hologramFragment}
        silent
        uniforms={uniforms}
        flatShading
        color={COLOR_CYAN}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
