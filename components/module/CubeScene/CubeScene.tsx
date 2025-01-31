"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import React from "react";

/** 🎲 회전하는 정육면체 */
const SpinningCube = () => {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ffcc00" }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime();
      ref.current.rotation.y = clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const CubeScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }}>
      <color attach="background" args={["#bea942"]} />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <SpinningCube />
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
};

export default CubeScene;
