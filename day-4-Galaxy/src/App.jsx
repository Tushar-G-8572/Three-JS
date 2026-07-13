import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Experience from "./components/Experience";

export default function App() {
  return (
    <>
    <div className="parent h-screen w-full ">

      <Leva collapsed={false} />

      <Canvas
        camera={{
          position: [0, 4, 12],
          fov: 45,
        }}
        >
        <Experience />
      </Canvas>
        </div>
    </>
  );
}