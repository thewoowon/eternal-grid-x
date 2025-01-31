"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Leva, useControls } from "leva";

// 1️⃣ Ray Marching Shader (Signed Distance Function 기반)
const RayMarchingMaterial = shaderMaterial(
  { time: 0 },
  `
  varying vec2 vUv;
  uniform float time;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(time + pos.x * 5.0 + time * 2.0) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  uniform float time;
  void main() {
    float dist = length(vUv - vec2(0.5));
    float circle = smoothstep(0.3, 0.31, dist);
    gl_FragColor = vec4(vec3(circle), 1.0);
  }
  `
);
extend({ RayMarchingMaterial });

const RayMarchingSphere = () => {
  const ref = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial;
      if (material && material.uniforms) {
        material.uniforms.time.value = 0;
      }
    }
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial;
      if (material && material.uniforms?.time) {
        material.uniforms.time.value = clock.getElapsedTime();
      }
    }
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2, 64, 64]} />
    </mesh>
  );
};

// 2️⃣ GPGPU 기반 입자 애니메이션
const ParticleSystem = () => {
  const ref = useRef<THREE.Points | null>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          args={[new Float32Array([0, 0, 0]), 3]}
          attach="attributes-position"
          array={
            new Float32Array(
              Array.from({ length: 3000 }).flatMap(() => [
                Math.random() * 5,
                Math.random() * 5,
                Math.random() * 5,
              ])
            )
          }
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00ff00" size={0.05} />
    </points>
  );
};

// 3️⃣ Procedural Terrain (절차적 지형 생성)
const ProceduralTerrain = () => {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(clock.getElapsedTime() + i * 0.01) * 0.1;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 5, 64, 64]} />
      <meshStandardMaterial color="#888888" wireframe />
    </mesh>
  );
};

// 4️⃣ 유체 시뮬레이션
const FluidSimulation = () => {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="#0099ff" />
    </mesh>
  );
};

const FluidScene = () => {
  const { lightIntensity, lightColor } = useControls({
    lightIntensity: { value: 3, min: 0, max: 10, step: 0.1 },
    lightColor: "#ff9900",
  });

  return (
    <>
      <Leva />
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: false }}>
        <color attach="background" args={["#000000"]} />
        <PerspectiveCamera makeDefault position={[3, 3, 6]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight
          color={lightColor}
          intensity={lightIntensity}
          position={[5, 5, 5]}
          castShadow
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.7}
          intensity={4.0}
          castShadow
        />
        <RayMarchingSphere />
        <ParticleSystem />
        <ProceduralTerrain />
        <FluidSimulation />
        <OrbitControls enableDamping />
      </Canvas>
    </>
  );
};

export default FluidScene;
