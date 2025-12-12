import { Float, OrbitControls } from "@react-three/drei";
import CityModel from "./models/ImportedModel";
// import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import Hand from "./models/hand/Hand";
import MyPerf from "../hooks/MyPerf";
import Lights from "./Lights";
// import CustomShaderMaterialTst from "./tests/CustomShaderMaterialTst";
// import Wobbly from "./models/built-in/Wobbly";

/**
 * Main Component
 *
 * The primary scene container that orchestrates the 3D models and controls.
 * Uses Leva for debug controls to toggle visibility of models.
 *
 * @returns {JSX.Element} The main scene content
 */
export default function Main(): JSX.Element {
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
            {/*<CustomShaderMaterialTst/>*/}
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
