import { OrbitControls } from "@react-three/drei";
import Galaxy from "./Galaxy";

export default function Experience() {
  return (
    <>
      <color attach="background" args={["#000000"]} />

      <OrbitControls />

      <Galaxy />
    </>
  );
}