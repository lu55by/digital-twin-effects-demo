/* eslint-disable react/no-unknown-property */
export default function Lights() {
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
        // shadow-camera-left={-20}
        // shadow-camera-right={20}
        // shadow-camera-top={20}
        // shadow-camera-bottom={-20}
        // shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
    </>
  );
}
