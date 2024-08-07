/* eslint-disable react/no-unknown-property */
import {
  Decal,
  RenderTexture,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

export default function HandDecal() {
  // Decal debug
  // const decalProp = useControls('P2decalProp', {
  const decalProp = useControls(
    "Decal",
    {
      position: {
        value: { x: -2.52, y: -4.16, z: 5.65 },
        min: -10,
        max: 10,
        step: 0.01,
      },

      rotation: {
        value: { x: -0.59, y: 2.02, z: 1.98 },
        min: -Math.PI,
        max: Math.PI,
        step: 0.01,
      },

      scale: {
        value: { x: 11.5, y: 2.6, z: 3.6 },
        min: 0,
        max: 25,
        step: 0.1,
      },

      color: "#009cff",

      // anisotropy: {
      //     value: 16,
      //     min: 2,
      //     max: 32,
      //     step: 2
      // }
    },
    { order: 3 }
  );

  // const decalRef = useRef()
  const textRef = useRef();
  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    textRef.current.position.x = -Math.tan(elapsed);
  });

  return (
    <Decal
      // debug
      // position={[decalProp.position.x, decalProp.position.y, decalProp.position.z]}
      // rotation={[decalProp.rotation.x, decalProp.rotation.y, decalProp.rotation.z]}
      // scale={[decalProp.scale.x, decalProp.scale.y, decalProp.scale.z]}
      position={[
        decalProp.position.x,
        decalProp.position.y,
        decalProp.position.z,
      ]}
      rotation={[
        decalProp.rotation.x,
        decalProp.rotation.y,
        decalProp.rotation.z,
      ]}
      scale={[decalProp.scale.x, decalProp.scale.y, decalProp.scale.z]}
      // scale={[.9, .25, 1]}
      // ref={decalRef}
    >
      <meshBasicMaterial transparent polygonOffset opacity={5}>
        {/* <meshStandardMaterial roughness={0.6} transparent polygonOffset polygonOffsetFactor={-10}> */}
        {/* <pointLight /> */}
        <RenderTexture
          attach="map"
          // anisotropy={renderTexProp.anisotropy}
        >
          {/* <PerspectiveCamera makeDefault manual aspect={decalProp.scale.x / decalProp.scale.y} position={[0, 0, 2]} /> */}
          <PerspectiveCamera
            makeDefault
            manual
            aspect={decalProp.scale.x / decalProp.scale.y}
            position={[0, 0, 2]}
          />
          {/* <color attach="background" args={['transparent']} /> */}
          {/* <Text ref={textRef} rotation={[Math.PI, 0, 0]} font="./fonts/Astrolab.woff" fontSize={.7} color={decalProp.color} > */}
          <Text
            ref={textRef}
            rotation={[Math.PI, 0, 0]}
            font="./fonts/Astrolab.woff"
            fontSize={0.7}
            color={decalProp.color}
          >
            Dightal Twin
          </Text>
        </RenderTexture>
        {/* </meshStandardMaterial> */}
      </meshBasicMaterial>
    </Decal>
  );
}
