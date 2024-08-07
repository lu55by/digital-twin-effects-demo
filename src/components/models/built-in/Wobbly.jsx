/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import VanillaCustomShaderMaterial from "three-custom-shader-material/vanilla";
import * as THREE from "three";
import {
  COLOR_CYAN_GREY,
  COLOR_RED,
  DEFAULT_COLOR,
} from "../../../constants/Colors";
import wobblyVertex from "../../shaders/wobbly/vertex.glsl";
import wobblyFragment from "../../shaders/wobbly/fragment.glsl";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { folder, useControls } from "leva";
import { getUniformsColorStr } from "../../../utils/getUniformsColorStr";
import { useGLTF } from "@react-three/drei";

export default function Wobbly() {
  const meshRef = useRef(null);

  const uniforms = useMemo(() => {
    return {
      uTime: new THREE.Uniform(0),

      // Colors
      uInnerCol: new THREE.Uniform(new THREE.Color(COLOR_CYAN_GREY)),
      uOuterCol: new THREE.Uniform(new THREE.Color(COLOR_RED)),
    };
  }, []);

  //   const { nodes } = useGLTF("models/Hand/mergedHand.glb");
  //   console.log(nodes);

  useControls("WobbleSphere", {
    Color: folder({
      inner: {
        value: getUniformsColorStr(uniforms.uInnerCol),
        label: "Inner",
        onChange: (v) => {
          uniforms.uInnerCol.value.set(v);
        },
      },
      outer: {
        value: getUniformsColorStr(uniforms.uOuterCol),
        label: "Outer",
        onChange: (v) => {
          uniforms.uOuterCol.value.set(v);
        },
      },
    }),
  });

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      geometry.center(); // Ensure geometry is centered
      // Merge vertices before computing tangents
      const mergedGeometry = mergeVertices(geometry);
      mergedGeometry.computeTangents();
      // Assign the updated geometry back to the mesh
      meshRef.current.geometry = mergedGeometry;
      //   nodes.Scene.traverse((child) => {
      //     if (child.isMesh) meshRef.current.geometry = child.geometry;
      //   });
    }
  }, []);

  useEffect(() => {
    meshRef.current.customDepthMaterial = new VanillaCustomShaderMaterial({
      silent: true,
      baseMaterial: THREE.MeshDepthMaterial,
      vertexShader: wobblyVertex,
      uniforms,
      depthPacking: THREE.RGBADepthPacking,
    });
  }, [uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <mesh
        castShadow
        receiveShadow
        ref={meshRef}
        // geometry={nodes.hand.geometry}
        // scale={0.5}
      >
        <icosahedronGeometry args={[2.5, 50]} />
        {/* <torusKnotGeometry args={[2.5, 1, 50, 16]} /> */}
        <ThreeCustomShaderMaterial
          silent
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={wobblyVertex}
          fragmentShader={wobblyFragment}
          uniforms={uniforms}
          color={DEFAULT_COLOR}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI, -Math.PI * 1.2, 0]}
        position={[-6, -1, -5]}
        receiveShadow
        scale={3}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={DEFAULT_COLOR} />
      </mesh>
    </>
  );
}
