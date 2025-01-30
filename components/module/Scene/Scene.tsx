"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const TorusKnot = () => {
  const ref = useRef<THREE.Mesh>(null);
  const [color, setColor] = useState(new THREE.Color("#ff0077"));

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.3;
      ref.current.rotation.y = clock.getElapsedTime() * 0.5;
      ref.current.material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.8,
        roughness: 0.3,
      });
    }
  });

  return (
    <mesh ref={ref} onPointerOver={() => setColor(new THREE.Color("#00ffaa"))}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
    </mesh>
  );
};

const Scene = () => {
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
      <OrbitControls enableDamping />
    </Canvas>
  );
};

export default Scene;
