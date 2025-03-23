// components/TerrainMaterial.tsx
import * as THREE from "three";
import { useMemo, useEffect } from "react";
import GUI from "lil-gui";
import terrainVertexSrc from "./shaders/terrain/vertex.glsl";
import terrainFragmentSrc from "./shaders/terrain/fragment.glsl";
import simplexNoise2dSrc from "./shaders/includes/simplexNoise2d.glsl";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

const terrainVertexShader = terrainVertexSrc.replace(
  "#include ../includes/simplexNoise2d.glsl",
  simplexNoise2dSrc
);

const terrainFragmentShader = terrainFragmentSrc.replace(
  "#include ../includes/simplexNoise2d.glsl",
  simplexNoise2dSrc
);

export const useTerrainMaterial = () => {
  const debugObject = useMemo(
    () => ({
      colorWaterDeep: "#002b3d",
      colorWaterSurface: "#66a8ff",
      colorSand: "#ffe894",
      colorGrass: "#85d534",
      colorSnow: "#ffffff",
      colorRock: "#bfbd8d",
    }),
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uPositionFrequency: new THREE.Uniform(0.2),
      uStrength: new THREE.Uniform(2.0),
      uWarpFrequency: new THREE.Uniform(5),
      uWarpStrength: new THREE.Uniform(0.5),
      uColorWaterDeep: new THREE.Uniform(
        new THREE.Color(debugObject.colorWaterDeep)
      ),
      uColorWaterSurface: new THREE.Uniform(
        new THREE.Color(debugObject.colorWaterSurface)
      ),
      uColorSand: new THREE.Uniform(new THREE.Color(debugObject.colorSand)),
      uColorGrass: new THREE.Uniform(new THREE.Color(debugObject.colorGrass)),
      uColorSnow: new THREE.Uniform(new THREE.Color(debugObject.colorSnow)),
      uColorRock: new THREE.Uniform(new THREE.Color(debugObject.colorRock)),
    }),
    [debugObject]
  );

  useEffect(() => {
    const gui = new GUI();
    gui
      .add(uniforms.uPositionFrequency, "value", 0, 1, 0.001)
      .name("uPositionFrequency");
    gui.add(uniforms.uStrength, "value", 0, 10, 0.001).name("uStrength");
    gui
      .add(uniforms.uWarpFrequency, "value", 0, 10, 0.001)
      .name("uWarpFrequency");
    gui.add(uniforms.uWarpStrength, "value", 0, 1, 0.001).name("uWarpStrength");
    gui
      .addColor(debugObject, "colorWaterDeep")
      .onChange(() =>
        uniforms.uColorWaterDeep.value.set(debugObject.colorWaterDeep)
      );
    gui
      .addColor(debugObject, "colorWaterSurface")
      .onChange(() =>
        uniforms.uColorWaterSurface.value.set(debugObject.colorWaterSurface)
      );
    gui
      .addColor(debugObject, "colorSand")
      .onChange(() => uniforms.uColorSand.value.set(debugObject.colorSand));
    gui
      .addColor(debugObject, "colorGrass")
      .onChange(() => uniforms.uColorGrass.value.set(debugObject.colorGrass));
    gui
      .addColor(debugObject, "colorSnow")
      .onChange(() => uniforms.uColorSnow.value.set(debugObject.colorSnow));
    gui
      .addColor(debugObject, "colorRock")
      .onChange(() => uniforms.uColorRock.value.set(debugObject.colorRock));

    // gui의 위치를 조정
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "87px";
    gui.domElement.style.right = "30px";
    gui.domElement.style.zIndex = "100";
    return () => gui.destroy();
  }, [uniforms, debugObject]);

  const material = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader: terrainVertexShader,
      fragmentShader: terrainFragmentShader,
      uniforms,
      metalness: 0,
      roughness: 0.5,
      color: debugObject.colorGrass,
    });
  }, [uniforms]);

  const depthMaterial = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshDepthMaterial,
      vertexShader: terrainVertexShader,
      uniforms,
      depthPacking: THREE.RGBADepthPacking,
    });
  }, [uniforms]);

  return { material, depthMaterial, uniforms };
};
