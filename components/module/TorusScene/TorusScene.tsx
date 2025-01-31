"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import React from "react";

const TorusKnot = React.memo(() => {
  const ref = useRef<THREE.Mesh>(null);
  const colorRef = useRef(new THREE.Color("#ff0077"));

  // ✅ material을 useMemo로 캐싱하여 성능 최적화
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: colorRef.current,
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.3;
      ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <primitive attach="material" object={material} />
    </mesh>
  );
});

TorusKnot.displayName = "TorusKnot";

const TorusScene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // ✅ 고해상도 지원
      gl={{ alpha: false }}
    >
      <color attach="background" args={["#000000"]} /> {/* 배경색 */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      {/* ✅ 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <TorusKnot />
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
};

export default TorusScene;
