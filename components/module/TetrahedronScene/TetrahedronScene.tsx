"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import React from "react";

const Tetrahedron = () => {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff007f",
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        Math.cos(clock.getElapsedTime() * 1.5) * 0.5 + 1.5;
      ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ref} material={material}>
      <tetrahedronGeometry args={[1, 0]} />
    </mesh>
  );
};

const TetrahedronScene = () => {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }}>
      <color attach="background" args={["#1f1f1f"]} />
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Tetrahedron />
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
};

export default TetrahedronScene;
