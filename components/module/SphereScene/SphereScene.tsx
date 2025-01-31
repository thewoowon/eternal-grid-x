"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import React from "react";

/** 🌍 흔들리는 구체 */
const WobblingSphere = () => {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0077ff",
        metalness: 0.6,
        roughness: 0.4,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 1;
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <sphereGeometry args={[0.8, 32, 32]} />
    </mesh>
  );
};

const SphereScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }}>
      <color attach="background" args={["#111133"]} />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <WobblingSphere />
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
};

export default SphereScene;
