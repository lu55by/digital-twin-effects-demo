/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Float, OrbitControls } from "@react-three/drei";
import CityModel from "./models/ImportedModel";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import Hand from "./models/hand/Hand";
import MyPerf from "../hooks/MyPerf";
import Lights from "./Lights";
import CustomShaderMaterialTst from "./tests/CustomShaderMaterialTst";
import Wobbly from "./models/built-in/Wobbly";

export default function Main() {
  const { isHandVisible, isCityModelVisible } = useControls(
    "Main",
    {
      isHandVisible: {
        value: false,
        label: "Show Hand",
      },
      isCityModelVisible: {
        value: true,
        label: "Show City Model",
      },
    },
    { order: 0 }
  );

  // useFrame((state) => {
  //   // const { x, y, z } = state.camera.position;
  //   // console.log(x, y, z);
  // });

  return (
    <>
      <MyPerf />
      <OrbitControls makeDefault />
      <color attach="background" args={[0, 0, 0]} />
      {/* <CustomShaderMaterialTst /> */}
      {/* <Wobbly /> */}
      {isCityModelVisible && <CityModel />}
      {isHandVisible && (
        <Float speed={0.5} rotationIntensity={1} floatIntensity={0.5}>
          <Hand scale={3} position={[0, 0, 0]} />
        </Float>
      )}
      <Lights />
    </>
  );
}
