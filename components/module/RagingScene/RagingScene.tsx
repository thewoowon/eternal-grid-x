"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import GUI from "lil-gui";
import waterVertexSrc from "./shaders/water/vertex.glsl";
import waterFragmentSrc from "./shaders/water/fragment.glsl";

import ambientLightSrc from "./shaders/includes/ambientLight.glsl";
import directionalLightSrc from "./shaders/includes/directionalLight.glsl";
import perlinClassic3DSrc from "./shaders/includes/perlinClassic3D.glsl";
import pointLightSrc from "./shaders/includes/pointLight.glsl";

const waterVertexShader = waterVertexSrc.replace(
  "#include ../includes/perlinClassic3D.glsl",
  perlinClassic3DSrc
);

const waterFragmentShader = waterFragmentSrc
  .replace("#include ../includes/ambientLight.glsl", ambientLightSrc)
  .replace("#include ../includes/directionalLight.glsl", directionalLightSrc)
  .replace("#include ../includes/pointLight.glsl", pointLightSrc);

const Water = () => {
  const waterRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [debugObject] = useState({
    depthColor: "#ff4000",
    surfaceColor: "#151c37",
  });

  useEffect(() => {
    const gui = new GUI({ width: 340 });

    if (!materialRef.current) return;

    gui.addColor(debugObject, "depthColor").onChange(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.uDepthColor.value.set(
          debugObject.depthColor
        );
      }
    });
    gui.addColor(debugObject, "surfaceColor").onChange(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.uSurfaceColor.value.set(
          debugObject.surfaceColor
        );
      }
    });
    gui
      .add(
        materialRef.current.uniforms.uBigWavesElevation,
        "value",
        0,
        1,
        0.001
      )
      .name("uBigWavesElevation");
    gui
      .add(
        materialRef.current.uniforms.uBigWavesFrequency.value,
        "x",
        0,
        10,
        0.001
      )
      .name("uBigWavesFrequencyX");
    gui
      .add(
        materialRef.current.uniforms.uBigWavesFrequency.value,
        "y",
        0,
        10,
        0.001
      )
      .name("uBigWavesFrequencyY");
    gui
      .add(materialRef.current.uniforms.uBigWavesSpeed, "value", 0, 4, 0.001)
      .name("uBigWavesSpeed");
    gui
      .add(
        materialRef.current.uniforms.uSmallWavesElevation,
        "value",
        0,
        1,
        0.001
      )
      .name("uSmallWavesElevation");
    gui
      .add(
        materialRef.current.uniforms.uSmallWavesFrequency,
        "value",
        0,
        30,
        0.001
      )
      .name("uSmallWavesFrequency");
    gui
      .add(materialRef.current.uniforms.uSmallWavesSpeed, "value", 0, 4, 0.001)
      .name("uSmallWavesSpeed");
    gui
      .add(materialRef.current.uniforms.uSmallIterations, "value", 0, 5, 1)
      .name("uSmallIterations");
    gui
      .add(materialRef.current.uniforms.uColorOffset, "value", 0, 1, 0.001)
      .name("uColorOffset");
    gui
      .add(materialRef.current.uniforms.uColorMultiplier, "value", 0, 10, 0.001)
      .name("uColorMultiplier");

    // gui의 위치를 조정
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "87px";
    gui.domElement.style.right = "30px";
    gui.domElement.style.zIndex = "100";
    return () => gui.destroy();
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={waterRef} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[2, 2, 512, 512]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uBigWavesElevation: { value: 0.2 },
          uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
          uBigWavesSpeed: { value: 0.75 },
          uSmallWavesElevation: { value: 0.15 },
          uSmallWavesFrequency: { value: 3 },
          uSmallWavesSpeed: { value: 0.2 },
          uSmallIterations: { value: 4 },
          uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
          uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
          uColorOffset: { value: 0.925 },
          uColorMultiplier: { value: 1 },
        }}
      />
    </mesh>
  );
};

const SceneSetup = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor("#181818");
  }, [gl]);
  return null;
};

const RagingScene = () => {
  return (
    <Canvas camera={{ position: [1, 1, 1], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableDamping enableZoom={false} />
      <SceneSetup />
      <Water />
    </Canvas>
  );
};

export default RagingScene;
