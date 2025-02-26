import React from 'react'
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

import earthVertexShader from './shaders/earth/vertex.glsl'
import earthFragmentShader from './shaders/earth/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl'

const EarthMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  earthVertexShader, // vertex shader
  earthFragmentShader, // fragment shader
)

const AtmosphereMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  atmosphereVertexShader, // vertex shader
  atmosphereFragmentShader, // fragment shader
)

// declaratively
extend({ EarthMaterial, AtmosphereMaterial })

const App = () => (
  <Canvas>
    <pointLight position={[10, 10, 10]} />
    <mesh>
      <sphereGeometry />
      <earthMaterial color="hotpink" time={1} />
    </mesh>
    <mesh>
      <sphereGeometry />
      <atmosphereMaterial color="hotpink" time={1} />
    </mesh>
  </Canvas>
)
