// components/TerrainScene.tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useTerrainMaterial } from "./TerrainMaterial";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";

const TerrainObjects = () => {
  const { material, depthMaterial, uniforms } = useTerrainMaterial();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 500, 500);
    geo.deleteAttribute("uv");
    geo.deleteAttribute("normal");
    geo.rotateX(-Math.PI * 0.5);
    return geo;
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      receiveShadow
      castShadow
    >
      <primitive object={depthMaterial} attach="customDepthMaterial" />
    </mesh>
  );
};

const Board = () => {
  const evaluator = useMemo(() => new Evaluator(), []);
  const board = useMemo(() => {
    const fill = new Brush(new THREE.BoxGeometry(11, 2, 11));
    const hole = new Brush(new THREE.BoxGeometry(10, 2.1, 10));
    return evaluator.evaluate(fill, hole, SUBTRACTION);
  }, [evaluator]);

  return <primitive object={board} castShadow receiveShadow dispose={null} />;
};

const Water = () => (
  <mesh rotation-x={-Math.PI * 0.5} position={[0, -0.1, 0]} receiveShadow>
    <planeGeometry args={[10, 10]} />
    <meshPhysicalMaterial transmission={1} roughness={0.3} />
  </mesh>
);

const Environment = () => {
  const { scene } = useThree();
  useEffect(() => {
    new RGBELoader().load("/images/static/terrain/spruit_sunrise.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
      scene.backgroundBlurriness = 0.5;
    });
  }, [scene]);
  return null;
};

const Lights = () => (
  <directionalLight
    position={[6.25, 3, 4]}
    intensity={2}
    castShadow
    shadow-mapSize={[1024, 1024]}
    shadow-camera-near={0.1}
    shadow-camera-far={30}
    shadow-camera-top={8}
    shadow-camera-right={8}
    shadow-camera-bottom={-8}
    shadow-camera-left={-8}
  />
);

export const TerrainScene = () => (
  <Canvas
    camera={{ position: [-10, 6, -2], fov: 35 }}
    shadows
    dpr={Math.min(window.devicePixelRatio, 2)}
  >
    <color attach="background" args={["#000"]} />
    <OrbitControls enableDamping />
    <ambientLight intensity={0.5} />
    <Lights />
    <Environment />
    <TerrainObjects />
    <Board />
    <Water />
  </Canvas>
);

export default TerrainScene;
