import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import { images } from "../data/image";
import ImagePlane from "./ImagePlane";
import { useFrame } from "@react-three/fiber";

const FanGallery = () => {
  const { planeHeight, planeWidth, numPlanes, spreadAngle, positionY,rotationY } =
    useControls("book fan", {
      planeWidth: {
        value: 2.5,
        min: 0.4,
        max: 6,
        step: 0.05,
        label: "plane width",
      },
      planeHeight: {
        value: 2.5,
        min: 0.4,
        max: 8,
        step: 0.05,
        label: "plane height",
      },
      numPlanes: {
        value: 7,
        min: 2,
        max: 40,
        step: 1,
        label: "No of blades",
      },
      positionY: {
        value: -1.5,
        min: -6,
        max: 6,
        step: 0.05,
        label: "Y Position",
      },
      spreadAngle: {
        value: 360,
        min: 20,
        max: 360,
        step: 1,
        label: "Spread Angle",
      },
      rotationY:{
        value:0.5,
        min:-0.8,
        max:0.8,
        step:0.01,
        label:'rotation Speed'
      }
    });

  const planes = useMemo(() => {
    const count = numPlanes;
    const totalArcRad = (spreadAngle * Math.PI) / 180;
    const step = totalArcRad / (count - 1);
    const startingAngle = - totalArcRad / 2;

    return Array.from({ length: 20 }, (_, i) => {
      const angle = startingAngle + i * step;
      return {
        key: i,
        url: images[i % images.length],
        position: [0, 0, 0],
        rotation: [0, angle, 0],
      };
    });
  }, [numPlanes, spreadAngle,rotationY]);

  const groupRef = useRef(null);

  useFrame((state,delta)=>{
    groupRef.current.rotation.y += delta * rotationY
  })

  return (
    <group ref={groupRef} position={[0,positionY,0]}>
      {planes.map((plane) => (
        <ImagePlane
          key={plane.key}
          url={plane.url}
          rotation={plane.rotation}
          position={plane.position}
          planeHeight={planeHeight}
          planeWidth={planeWidth}
        />
      ))}
    </group>
  );
};

export default FanGallery;
