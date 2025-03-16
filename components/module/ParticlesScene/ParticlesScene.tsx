"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import particlesVertexShader from "./shaders/particles/vertex.glsl";
import particlesFragmentShader from "./shaders/particles/fragment.glsl";

const DisplacementCanvas = () => {
  const canvasRef = useRef(null);
  const textureRef = useRef(
    new THREE.CanvasTexture(document.createElement("canvas"))
  );
  const [canvasCursor, setCanvasCursor] = useState(
    new THREE.Vector2(9999, 9999)
  );
  const glowImage = new Image();
  glowImage.src = "/images/static/particles/glow.png";

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    canvas.width = 128;
    canvas.height = 128;
    if (context) {
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      setCanvasCursor(
        new THREE.Vector2(event.clientX - rect.left, event.clientY - rect.top)
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (context) {
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 0.02;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const glowSize = canvas.width * 0.25;
      context.globalCompositeOperation = "lighten";
      context.globalAlpha = 0.5;
      context.drawImage(
        glowImage,
        canvasCursor.x - glowSize * 0.5,
        canvasCursor.y - glowSize * 0.5,
        glowSize,
        glowSize
      );
    }

    textureRef.current.needsUpdate = true;
  });

  return textureRef.current;
};

const Particles = () => {
  const { size } = useThree();
  const pictureTexture = useTexture("/images/static/particles/picture-1.png");
  const displacementTexture = DisplacementCanvas();

  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128);
    const intensitiesArray = new Float32Array(
      geometry.attributes.position.count
    );
    const anglesArray = new Float32Array(geometry.attributes.position.count);

    for (let i = 0; i < geometry.attributes.position.count; i++) {
      intensitiesArray[i] = Math.random();
      anglesArray[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute(
      "aIntensity",
      new THREE.BufferAttribute(intensitiesArray, 1)
    );
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(anglesArray, 1));
    geometryRef.current = geometry;
  }, []);

  if (!geometryRef.current || !materialRef.current) return null;

  return (
    <points>
      <primitive object={geometryRef.current} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={{
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uPictureTexture: { value: pictureTexture },
          uDisplacementTexture: { value: displacementTexture },
        }}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const SceneSetup = () => {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor("#181818");
  }, [gl]);
  return null;
};

const ParticlesScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableDamping enableZoom={false} />
      <SceneSetup />
      <Particles />
    </Canvas>
  );
};

export default ParticlesScene;
