"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import GUI from "lil-gui";
import halftoneVertexShader from "./shaders/halftone/vertex.glsl";

import fragmentShaderSrc from "./shaders/halftone/fragment.glsl";
import ambientLightSrc from "./shaders/includes/ambientLight.glsl";
import directionalLightSrc from "./shaders/includes/directionalLight.glsl";

// GLSL 내 #include를 수동으로 대체
const halftoneFragmentShader = fragmentShaderSrc
  .replace("#include ../includes/ambientLight.glsl", ambientLightSrc)
  .replace("#include ../includes/directionalLight.glsl", directionalLightSrc);

const CustomMaterial = () => {
  const { size } = useThree();
  const [color, setColor] = useState("#ff794d");
  const [shadowColor, setShadowColor] = useState("#8e19b8");
  const [lightColor, setLightColor] = useState("#e5ffe0");
  const [shadowRepetitions, setShadowRepetitions] = useState(100);
  const [lightRepetitions, setLightRepetitions] = useState(130);

  useEffect(() => {
    const gui = new GUI();
    gui.addColor({ color }, "color").onChange(setColor);
    gui.addColor({ shadowColor }, "shadowColor").onChange(setShadowColor);
    gui.addColor({ lightColor }, "lightColor").onChange(setLightColor);
    gui
      .add({ shadowRepetitions }, "shadowRepetitions", 1, 300, 1)
      .onChange(setShadowRepetitions);
    gui
      .add({ lightRepetitions }, "lightRepetitions", 1, 300, 1)
      .onChange(setLightRepetitions);
    return () => gui.destroy();
  }, []);

  return new THREE.ShaderMaterial({
    vertexShader: halftoneVertexShader,
    fragmentShader: halftoneFragmentShader,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uShadowColor: { value: new THREE.Color(shadowColor) },
      uLightColor: { value: new THREE.Color(lightColor) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uShadowRepetitions: { value: shadowRepetitions },
      uLightRepetitions: { value: lightRepetitions },
    },
  });
};

const SceneObjects = () => {
  const material = CustomMaterial();
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/images/static/halftone/suzanne.glb");

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
    gl.setClearColor("#26132f");
  }, [gl]);
  return null;
};

const HalftoneScene = () => {
  return (
    <Canvas
      camera={{ position: [7, 7, 7], fov: 25 }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableDamping enableZoom={false} />
      <SceneSetup />
      <SceneObjects />
    </Canvas>
  );
};

export default HalftoneScene;
