/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { folder, useControls } from "leva";
import { HologramMaterial } from "../shaders/js/HologramMaterial";
import { COLOR_CYAN, DEFAULT_COLOR } from "../../constants/Colors";
import {
  DEFAULT_GRADIENT_COLOR_INTENSITY,
  DEFAULT_SCANNING_CIRCLE_INTENSITY,
  DEFAULT_SCANNING_CIRCLE_SPEED,
  DEFAULT_SCANNING_CIRCLE_WIDTH,
  DEFAULT_SCANNING_LINE_INTENSITY,
  DEFAULT_SCANNING_LINE_SPEED,
} from "../../constants/Effects";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import customModelVertex from "../shaders/importedModel/vertex.glsl";
import customModelFragment from "../shaders/importedModel/fragment.glsl";
import { useGLTF } from "@react-three/drei";

const hologramMaterial = HologramMaterial;

const uniforms = {
  uMinElevation: new THREE.Uniform(0),
  uMaxElevation: new THREE.Uniform(100),
  uTime: new THREE.Uniform(0),

  // Colors
  uGradientDistColor: new THREE.Uniform(new THREE.Color(DEFAULT_COLOR)),
  uScanningCircleColor: new THREE.Uniform(new THREE.Color(DEFAULT_COLOR)),
  uScanningLineColor: new THREE.Uniform(new THREE.Color(DEFAULT_COLOR)),

  // Intensities
  uGradientDistColorIntensity: new THREE.Uniform(
    DEFAULT_GRADIENT_COLOR_INTENSITY
  ),
  uScanningCircleColorIntensity: new THREE.Uniform(
    DEFAULT_SCANNING_CIRCLE_INTENSITY
  ),
  uScanningLineColorIntensity: new THREE.Uniform(
    DEFAULT_SCANNING_LINE_INTENSITY
  ),

  // Speeds
  uScanningCircleSpeed: new THREE.Uniform(DEFAULT_SCANNING_CIRCLE_SPEED),
  uScanningLineSpeed: new THREE.Uniform(DEFAULT_SCANNING_LINE_SPEED),

  // Width
  uScanningCircleWidth: new THREE.Uniform(DEFAULT_SCANNING_CIRCLE_WIDTH),
};

const customStandardMat = new CustomShaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  silent: true,
  vertexShader: customModelVertex,
  fragmentShader: customModelFragment,
  uniforms,
  color: COLOR_CYAN,
  metalness: 0.7,
  roughness: 0.5,
});

export default function ImportedModel() {
  const materials = useLoader(MTLLoader, "models/sci-fi-city/sci-fi-city.mtl");
  const obj = useLoader(
    OBJLoader,
    "models/sci-fi-city/sci-fi-city.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
    // On Progress
    // (e) => {
    //   const progress = e.loaded / e.total;
    //   console.log(progress);
    // }
  );
  console.log(obj);

  // Debug
  const { isShaderActivated } = useControls(
    "model",
    {
      isShaderActivated: {
        value: false,
        label: "Activate Hologram Shader",
      },
      color: {
        value: "#009cff",
        label: "Base Color",
        onChange: (v) => {
          customStandardMat.color.set(v);
          hologramMaterial.uniforms.uColor.value.set(v);
        },
      },
      Effects: folder({
        Gradient: folder({
          gradientDistColor: {
            value: `#${uniforms.uGradientDistColor.value.getHexString(
              THREE.SRGBColorSpace
            )}`,
            label: "Color",
            onChange: (v) => {
              uniforms.uGradientDistColor.value.set(v);
            },
          },
          gradientDistColorIntensity: {
            value: uniforms.uGradientDistColorIntensity.value,
            min: 1,
            max: 20,
            step: 0.01,
            label: "Intensity",
            onChange: (v) => {
              uniforms.uGradientDistColorIntensity.value = v;
            },
          },
        }),
        "Scanning Circle": folder({
          scanningCircleColor: {
            value: `#${uniforms.uScanningCircleColor.value.getHexString(
              THREE.SRGBColorSpace
            )}`,
            label: "Color",
            onChange: (v) => {
              uniforms.uScanningCircleColor.value.set(v);
            },
          },
          uScanningCircleColorIntensity: {
            value: uniforms.uScanningCircleColorIntensity.value,
            min: 1,
            max: 20,
            step: 0.01,
            label: "Intensity",
            onChange: (v) => {
              uniforms.uScanningCircleColorIntensity.value = v;
            },
          },
          uScanningCircleSpeed: {
            value: uniforms.uScanningCircleSpeed.value,
            min: DEFAULT_SCANNING_CIRCLE_SPEED * 0.5,
            max: DEFAULT_SCANNING_CIRCLE_SPEED * 3,
            step: 10,
            label: "Speed",
            onChange: (v) => {
              uniforms.uScanningCircleSpeed.value = v;
            },
          },
          uScanningCircleWidth: {
            value: uniforms.uScanningCircleWidth.value,
            min: DEFAULT_SCANNING_CIRCLE_WIDTH,
            max: DEFAULT_SCANNING_CIRCLE_WIDTH * 5,
            step: 0.1,
            label: "Width",
            onChange: (v) => {
              uniforms.uScanningCircleWidth.value = v;
            },
          },
        }),
      }),
      "Scanning Line": folder({
        scanningLineColor: {
          value: `#${uniforms.uScanningLineColor.value.getHexString(
            THREE.SRGBColorSpace
          )}`,
          label: "Color",
          onChange: (v) => {
            uniforms.uScanningLineColor.value.set(v);
          },
        },
        uScanningLineColorIntensity: {
          value: uniforms.uScanningLineColorIntensity.value,
          min: 1,
          max: 20,
          step: 0.01,
          label: "Intensity",
          onChange: (v) => {
            uniforms.uScanningLineColorIntensity.value = v;
          },
        },
        uScanningLineSpeed: {
          value: uniforms.uScanningLineSpeed.value,
          min: DEFAULT_SCANNING_LINE_SPEED * 0.5,
          max: DEFAULT_SCANNING_LINE_SPEED * 3,
          step: 10,
          label: "Speed",
          onChange: (v) => {
            uniforms.uScanningLineSpeed.value = v;
          },
        },
      }),
    },
    { order: 1 }
  );

  const objRef = useRef(null);
  // Model Materials Setting Side Effect
  useEffect(() => {
    // const isGound = (child) =>
    //   child.name !== "mesh01" &&
    //   child.name !== "Downtown Center City" &&
    //   child.type !== "Group";
    const material = isShaderActivated ? hologramMaterial : customStandardMat;
    objRef.current.traverse((child) => {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = true;
    });
    return material.dispose();
  }, [obj, isShaderActivated]);

  // Min & Max Elevation Side Effect
  useEffect(() => {
    const minBoxesY = [];
    const maxBoxesY = [];
    objRef.current.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox();
        const box = child.geometry.boundingBox;
        // console.log(child.geometry.boundingBox);
        minBoxesY.push(box.min.y);
        maxBoxesY.push(box.max.y);
      }
    });
    let min = 0,
      max = 0;
    for (const m of minBoxesY) {
      min = Math.min(min, m);
    }
    for (const m of maxBoxesY) {
      max = Math.max(max, m);
    }
    // console.log("Min Y -> \n", min);
    // console.log("Max Y -> \n", max); // 351.8070068359375
    customStandardMat.uniforms.uMinElevation.value = min;
    customStandardMat.uniforms.uMaxElevation.value = max;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    hologramMaterial.uniforms.uTime.value = elapsed;
    customStandardMat.uniforms.uTime.value = elapsed;
  });

  return (
    <primitive object={obj} scale={0.4} position={[60, 0, 10]} ref={objRef} />
    // <primitive
    //   object={nodes.Scene}
    //   scale={5}
    //   position={[60, 0, 10]}
    //   ref={objRef}
    // />
  );
  // return <TestBox />;
}
