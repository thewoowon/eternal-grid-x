import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import earthVertexShader from "./shaders/earth/vertex.glsl";
import earthFragmentShader from "./shaders/earth/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphere/fragment.glsl";

/**
 * 🌍 Earth Material (ShaderMaterial)
 */
const EarthMaterial = shaderMaterial(
  {
    uDayTexture: null,
    uNightTexture: null,
    uSpecularCloudsTexture: null,
    uSunDirection: new THREE.Vector3(0, 0, 1),
    uAtmosphereDayColor: new THREE.Color("#00aaff"),
    uAtmosphereTwilightColor: new THREE.Color("#ff6600"),
  },
  earthVertexShader,
  earthFragmentShader
);

/**
 * 🌌 Atmosphere Material
 */
const AtmosphereMaterial = shaderMaterial(
  {
    uSunDirection: new THREE.Vector3(0, 0, 1),
    uAtmosphereDayColor: new THREE.Color("#00aaff"),
    uAtmosphereTwilightColor: new THREE.Color("#ff6600"),
  },
  atmosphereVertexShader,
  atmosphereFragmentShader
);

/**
 * 🌍 Earth Component
 */
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  // Load Textures
  const dayTexture = useLoader(THREE.TextureLoader, "./earth/day.jpg");
  const nightTexture = useLoader(THREE.TextureLoader, "./earth/night.jpg");
  const specularCloudsTexture = useLoader(
    THREE.TextureLoader,
    "./earth/specularClouds.jpg"
  );

  // Controls (UI 조절)
  const { atmosphereDayColor, atmosphereTwilightColor, phi, theta } =
    useControls("Earth Settings", {
      atmosphereDayColor: "#00aaff",
      atmosphereTwilightColor: "#ff6600",
      phi: { value: Math.PI * 0.5, min: 0, max: Math.PI },
      theta: { value: 0.5, min: -Math.PI, max: Math.PI },
    });

  const sunDirection = new THREE.Vector3();
  const sunSpherical = new THREE.Spherical(1, phi, theta);
  sunDirection.setFromSpherical(sunSpherical);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }

    if (earthRef.current?.material) {
      const material = earthRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uSunDirection.value.copy(sunDirection);
      material.uniforms.uAtmosphereDayColor.value.set(atmosphereDayColor);
      material.uniforms.uAtmosphereTwilightColor.value.set(atmosphereTwilightColor);
    }

    if (atmosphereRef.current?.material) {
      const material = atmosphereRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uSunDirection.value.copy(sunDirection);
      material.uniforms.uAtmosphereDayColor.value.set(atmosphereDayColor);
      material.uniforms.uAtmosphereTwilightColor.value.set(atmosphereTwilightColor);
    }
  });

  return (
    <>
      {/* 🌍 Earth Mesh */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <EarthMaterial
          uDayTexture={dayTexture}
          uNightTexture={nightTexture}
          uSpecularCloudsTexture={specularCloudsTexture}
        />
      </mesh>

      {/* 🌌 Atmosphere Mesh */}
      <mesh ref={atmosphereRef} scale={1.04}>
        <sphereGeometry args={[2, 64, 64]} />
        <AtmosphereMaterial />
      </mesh>
    </>
  );
};

/**
 * 🌞 Sun Debug Sphere
 */
const SunDebug = () => {
  const { phi, theta } = useControls("Earth Settings", {
    phi: { value: Math.PI * 0.5, min: 0, max: Math.PI },
    theta: { value: 0.5, min: -Math.PI, max: Math.PI },
  });

  const sunDirection = new THREE.Vector3();
  const sunSpherical = new THREE.Spherical(1, phi, theta);
  sunDirection.setFromSpherical(sunSpherical);

  return (
    <mesh position={sunDirection.clone().multiplyScalar(5)}>
      <icosahedronGeometry args={[0.1, 2]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
};

/**
 * 🎥 Scene & Renderer
 */
const Scene = () => {
  return (
    <Canvas
      camera={{ position: [12, 5, 4], fov: 25 }}
      gl={{ antialias: true }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Earth */}
      <Earth />

      {/* Sun Debug */}
      <SunDebug />

      {/* Controls */}
      <OrbitControls enableDamping />
    </Canvas>
  );
};

export default Scene;
