/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { HologramMaterial } from "../shaders/js/HologramMaterial";
import { COLOR_CYAN, DEFAULT_COLOR } from "../../constants/Colors";
import { DEFAULT_GRADIENT_COLOR_INTENSITY } from "../../constants/Effects";

const hologramMaterial = HologramMaterial;

const shaderReplacer = (shader, type, target, replacement) => {
  const rs = `${target}\n${replacement}`;
  if (type === "v")
    shader.vertexShader = shader.vertexShader.replace(target, rs);
  else shader.fragmentShader = shader.fragmentShader.replace(target, rs);
};

const shaderLogger = (shader, type, period) => {
  console.log(
    `Model Standard Material ${period} Injected Vertex Shader -> \n`,
    type === "v" ? shader.vertexShader : shader.fragmentShader,
    "\n--------------\n"
  );
};

export default function ImportedModel() {
  const [standardMatColor, setStandardMatColor] = useState(COLOR_CYAN);
  const [uniforms, setUniforms] = useState({
    uMinElevation: new THREE.Uniform(0),
    uMaxElevation: new THREE.Uniform(100),
    uTime: new THREE.Uniform(0),

    // Colors
    uGradientDistColor: new THREE.Uniform(DEFAULT_COLOR),
    uScanningCircleColor: new THREE.Uniform(DEFAULT_COLOR),
    uScanningLineColor: new THREE.Uniform(DEFAULT_COLOR),

    // Intensities
    uGradientDistColorIntensity: new THREE.Uniform(
      DEFAULT_GRADIENT_COLOR_INTENSITY
    ),
  });
  const StandardMaterial = useMemo(() => {
    console.log(standardMatColor);
    const material = new THREE.MeshStandardMaterial({
      color: standardMatColor,
      metalness: 0.7,
      roughness: 0.5,
    });
    material.onBeforeCompile = (shader) => {
      // console.log("Changed111111-----");

      // shaderLogger(shader, "v", "Before");
      shaderReplacer(
        shader,
        "v",
        "#include <common>",
        /* glsl */ `
              // Varyings
              varying vec3 vPos;
              varying vec2 vUv;
            `
      );
      shaderReplacer(
        shader,
        "v",
        "void main() {",
        /* glsl */ `
                vPos = position;
                vUv = uv;
              `
      );
      // shaderLogger(shader, "v", "After");

      // shaderLogger(shader, "s", "Before");
      // Uniforms Assignments
      shader.uniforms.uMinElevation = uniforms.uMinElevation;
      shader.uniforms.uMaxElevation = uniforms.uMaxElevation;
      shader.uniforms.uTime = uniforms.uTime;
      // Uniforms Assignments - Colors
      shader.uniforms.uGradientDistColor = uniforms.uGradientDistColor;
      shader.uniforms.uScanningCircleColor = uniforms.uScanningCircleColor;
      shader.uniforms.uScanningLineColor = uniforms.uScanningLineColor;
      // Uniforms Assignments - Color Intensities
      shader.uniforms.uGradientDistColorIntensity =
        uniforms.uGradientDistColorIntensity;
      // Shader Properties Replacer
      shaderReplacer(
        shader,
        "s",
        "#include <common>",
        /* glsl */ `
              // Uniforms
              uniform float uMinElevation;
              uniform float uMaxElevation;
              uniform float uTime;
              // Uniforms - Colors
              uniform vec3 uGradientDistColor;
              uniform vec3 uScanningCircleColor;
              uniform vec3 uScanningLineColor;
              // Uniforms - Colors - Intensities
              uniform float uGradientDistColorIntensity;
              // Varyings
              varying vec3 vPos;
              varying vec2 vUv;
          
              // Custom Effect Functions
              vec3 gradient(vec3 baseCol, vec3 gradientCol, float intensity, float maxHeight, float direction) {
                return mix(baseCol, gradientCol * intensity, max(0., direction / maxHeight));
              }
              vec3 scanningCircle(vec3 baseCol, vec3 circleCol, float intensity, vec2 origin, vec2 basedVec2, float width, float blur, float maxRadius, float time, float speed) {
                float d = distance(origin, basedVec2);
                float r = mod(.1 + time * speed, maxRadius);
                return mix(baseCol, circleCol * intensity, smoothstep(r + width, r + width - blur, d) - smoothstep(r, r - blur, d));
              }
              vec3 scanning2TopLine(vec3 baseCol, vec3 lineCol, float intensity, float offset, float width, float blur, float time, float speed, float maxHeight, float direction) {
                float s = mod((offset - width) + time * speed, maxHeight);
                return mix(baseCol, lineCol * intensity, smoothstep(s, s + blur, direction) * smoothstep(s + width, s + width - blur, direction));
              }
              `
      );
      // Shader Main Function Replacer
      shaderReplacer(
        shader,
        "s",
        "#include <color_fragment>",
        /* glsl */ `
                // Gradient Effect
                diffuseColor.rgb = gradient(diffuseColor.rgb, uGradientDistColor, uGradientDistColorIntensity, uMaxElevation, vPos.y);
                // Scanning Circle Effect
                diffuseColor.rgb = scanningCircle(diffuseColor.rgb, uScanningCircleColor, 5., vec2(-160., -200), vPos.xz, 30., .001, 600., uTime, 200.);
                // Scanning Line Effect
                diffuseColor.rgb = scanning2TopLine(diffuseColor.rgb, uScanningLineColor, 10., uMinElevation, 5., .1, uTime, 50., uMaxElevation, vPos.y);
                //#end0
              `
      );
      // shaderLogger(shader, "s", "After");
    };
    return material;
  }, [standardMatColor, uniforms]);

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
  // console.log(obj);

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
          setStandardMatColor(v);
          hologramMaterial.uniforms.uColor.value.set(v);
        },
      },
      gradientDistColor: {
        value: `#${uniforms.uGradientDistColor.value.getHexString(
          THREE.SRGBColorSpace
        )}`,
        label: "Gradient Dist Color",
        onChange: (v) => {
          setUniforms((u) => ({
            ...u,
            uGradientDistColor: new THREE.Uniform(new THREE.Color(v)),
          }));
        },
      },
      scanningCircleColor: {
        value: `#${uniforms.uScanningCircleColor.value.getHexString(
          THREE.SRGBColorSpace
        )}`,
        label: "Scanning Circle Color",
        onChange: (v) => {
          setUniforms((u) => ({
            ...u,
            uScanningCircleColor: new THREE.Uniform(new THREE.Color(v)),
          }));
        },
      },
      scanningLineColor: {
        value: `#${uniforms.uScanningLineColor.value.getHexString(
          THREE.SRGBColorSpace
        )}`,
        label: "Scanning Line Color",
        onChange: (v) => {
          console.log("changed color", v);
          setUniforms((u) => ({
            ...u,
            uScanningLineColor: new THREE.Uniform(new THREE.Color(v)),
          }));
        },
      },
      // Uniforms Colors Intensities
      gradientDistColorIntensity: {
        value: uniforms.uGradientDistColorIntensity.value,
        min: 1,
        max: 20,
        step: 0.01,
        label: "Gradient Dist Color Intensity",
        onChange: (v) => {
          setUniforms((u) => ({
            ...u,
            uGradientDistColorIntensity: new THREE.Uniform(v),
          }));
        },
      },
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
    objRef.current.traverse((child) => {
      if (isShaderActivated) {
        child.material = hologramMaterial;
      } else {
        child.material = StandardMaterial;
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
    });
  }, [obj, isShaderActivated, StandardMaterial]);

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
    var min = 0,
      max = 0;
    for (const m of minBoxesY) {
      min = Math.min(min, m);
    }
    for (const m of maxBoxesY) {
      max = Math.max(max, m);
    }
    // console.log("Min Y -> \n", min);
    // console.log("Max Y -> \n", max); // 351.8070068359375
    // uniforms.uMinElevation.value = min;
    // uniforms.uMaxElevation.value = max;
    setUniforms((u) => ({
      ...u,
      uMinElevation: new THREE.Uniform(min),
      uMaxElevation: new THREE.Uniform(max),
    }));
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    hologramMaterial.uniforms.uTime.value = elapsed;
    uniforms.uTime.value = elapsed;
  });

  return (
    <primitive object={obj} scale={0.4} position={[60, 0, 10]} ref={objRef} />
  );
  // return <TestBox />;
}
