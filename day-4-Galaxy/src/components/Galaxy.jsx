import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";

const Galaxy = () => {
  const pointsRef = useRef();

  const particleTexture = useTexture("/matCap.jpg");

  const {
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
    particleSize,
    rotationSpeed,
  } = useControls("Galaxy", {
    count: {
      value: 120000,
      min: 1000,
      max: 300000,
      step: 1000,
    },

    radius: {
      value: 6,
      min: 1,
      max: 15,
      step: 0.1,
    },

    branches: {
      value: 4,
      min: 2,
      max: 10,
      step: 1,
    },

    spin: {
      value: 1,
      min: -5,
      max: 5,
      step: 0.01,
    },

    randomness: {
      value: 0.35,
      min: 0,
      max: 2,
      step: 0.001,
    },

    randomnessPower: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.1,
    },

    particleSize: {
      value: 0.04,
      min: 0.005,
      max: 0.2,
      step: 0.001,
    },

    rotationSpeed: {
      value: 0.03,
      min: -1,
      max: 1,
      step: 0.001,
    },

    insideColor: "#ffffff",

    outsideColor: "#38bdf8",
  });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // More particles near center
      const currentRadius = Math.pow(Math.random(), 2) * radius;

      const spinAngle = currentRadius * spin;

      const branchAngle =
        ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? -1 : 1) *
        randomness *
        currentRadius;

      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? -1 : 1) *
        randomness *
        currentRadius *
        0.3;

      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? -1 : 1) *
        randomness *
        currentRadius;

      positions[i3] =
        Math.cos(branchAngle + spinAngle) * currentRadius + randomX;

      positions[i3 + 1] = randomY;

      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * currentRadius + randomZ;

      const mixedColor = colorInside.clone();

      mixedColor.lerp(colorOutside, currentRadius / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  ]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        map={particleTexture}
        transparent
        alphaMap={particleTexture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        size={particleSize}
        sizeAttenuation
      />
    </points>
  );
};

export default Galaxy;