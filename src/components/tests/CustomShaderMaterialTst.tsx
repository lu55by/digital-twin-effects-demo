/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import hologramVertex from "../shaders/hologram/csm/vertex.glsl";
import hologramFragment from "../shaders/hologram/csm/fragment.glsl";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { COLOR_CYAN, COLOR_HOLOGRAM } from "../../constants/Colors";
import { folder, useControls } from "leva";

const uniforms = {
    uTime: new THREE.Uniform(0),
    uColor: new THREE.Uniform(COLOR_HOLOGRAM),
};

/**
 * CustomShaderMaterialTst Component
 * 
 * Test component for Custom Shader Material with hologram effects.
 * Includes Leva controls for position and color tweaking.
 * 
 * @returns {JSX.Element}
 */
export default function CustomShaderMaterialTst(): JSX.Element {
    const { position } = useControls("CustomShaderMaterialTst", {
        position: {
            value: { x: 0, y: 0, z: 0 },
            min: -100,
            max: 100,
            step: 0.01,
        },
        material: folder({
            color: folder(
                {
                    uColorTweak: {
                        label: "Base Color",
                        value: '#' + COLOR_HOLOGRAM.getHexString(THREE.SRGBColorSpace),
                        // value: '#ffffff',
                        onChange: (v: string) => {
                            uniforms.uColor.value.set(v)
                        }
                    }
                }
            )
        })
    });

    const ref = useRef<THREE.Mesh>(null);
    //   useEffect(() => {
    //     ref.current.position.set(position);
    //   }, [position]);

    const matRef = useRef(null);
    // useEffect(() => {
    //     if (matRef.current) {
    //         matRef.current.uniforms.uColor.value.set(uColorTweak);
    //     }
    // }, [matRef, uColorTweak])

    useFrame(
        (state) => {
            // Note: matRef.current might be the shader material instance
            if (uniforms)
                uniforms.uTime.value = state.clock.elapsedTime;
        }
    );

    return (
        // <mesh>
        <mesh ref={ref} position={[position.x, position.y, position.z]}>
            <sphereGeometry args={[1, 124, 124]}/>
            <CustomShaderMaterial
                ref={matRef}
                baseMaterial={THREE.MeshBasicMaterial}
                vertexShader={String(hologramVertex)}
                fragmentShader={String(hologramFragment)}
                silent
                uniforms={uniforms}
                // flatShading
                color={COLOR_CYAN}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
