/**
 * Lights Component
 *
 * Configures the lighting for the 3D scene.
 * Includes ambient light and directional lights with shadow casting.
 *
 * @returns {JSX.Element} The lighting setup
 */
export default function Lights(): JSX.Element {
  return (
    <>
      <ambientLight color="#fff" intensity={0.3} />
      <directionalLight color="#fff" position={[1, 2, 0]} intensity={1} />
      {/* <directionalLight color="#f00" position={[1, -2, 0]} intensity={5} /> */}
      <directionalLight
        castShadow
        color="#fff"
        position={[1, 0, 1]}
        intensity={2}
        shadow-camera-far={100}
      />
    </>
  );
}
