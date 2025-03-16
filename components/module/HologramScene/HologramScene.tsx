"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import GUI from "lil-gui";
import hologramFragmentShader from "./shaders/holographic/fragment.glsl";

import vertexShaderSrc from "./shaders/holographic/vertex.glsl";
import random2DSrc from "./shaders/includes/random2D.glsl";

// GLSL 내 #include를 수동으로 대체
const hologramVertexShader = vertexShaderSrc.replace(
  "#include ../includes/random2D.glsl",
  random2DSrc
);

const CustomMaterial = () => {
  const [color, setColor] = useState("#ff794d");

  useEffect(() => {
    const gui = new GUI();
    gui.addColor({ color }, "color").onChange(setColor);
    // gui의 위치를 조정
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "87px";
    gui.domElement.style.right = "30px";
    gui.domElement.style.zIndex = "100";
    return () => gui.destroy();
  }, []);

  return new THREE.ShaderMaterial({
    vertexShader: hologramVertexShader,
    fragmentShader: hologramFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
};

const SceneObjects = () => {
  const material = CustomMaterial();
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/images/static/hologram/suzanne.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
  }, [scene, material]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = -elapsedTime * 0.1;
      torusRef.current.rotation.y = elapsedTime * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = -elapsedTime * 0.1;
      sphereRef.current.rotation.y = elapsedTime * 0.2;
    }
    scene.rotation.x = -elapsedTime * 0.1;
    scene.rotation.y = elapsedTime * 0.2;
  });

  return (
    <>
      <mesh ref={torusRef} position={[3, 0, 0]}>
        <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh ref={sphereRef} position={[-3, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={material} attach="material" />
      </mesh>
      <primitive object={scene} />
    </>
  );
};

const SceneSetup = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor("#1d1f2a");
  }, [gl]);
  return null;
};

const HologramScene = () => {
  return (
    <Canvas
      camera={{ position: [7, 7, 7], fov: 25 }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: true }}
    >
      <OrbitControls enableDamping enableZoom={false} />
      <SceneSetup />
      <SceneObjects />
    </Canvas>
  );
};

export default HologramScene;
