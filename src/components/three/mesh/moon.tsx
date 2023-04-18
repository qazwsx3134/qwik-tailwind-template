import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  AmbientLight,
  PointLightHelper,
  GridHelper,
  MathUtils,
  TextureLoader,
  AxesHelper,
  Texture,
} from "three";

import { useStore } from "@builder.io/qwik";
/**
 * Create a Reusable Moon in three.js
 */

const useMoonMesh = () => {
  const moonTextureStore = useStore<{
    moon: NoSerialize<Texture>;
    moonNormal: NoSerialize<Texture>;
  }>({
    moon: undefined,
    moonNormal: undefined,
  });

  const moonStore = useStore<{
    geometry: NoSerialize<SphereGeometry>;
    material: NoSerialize<MeshStandardMaterial>;
    moons: NoSerialize<Mesh>[];
  }>({
    geometry: undefined,
    material: undefined,
    moons: [undefined],
  });

  useVisibleTask$(() => {
    /**
     * Textures
     */
    const moonNormalTexture = new TextureLoader().load("images/normal.jpg");
    const moonTexture = new TextureLoader().load("images/moon.jpg");

    moonTextureStore.moon = noSerialize(moonTexture);
    moonTextureStore.moonNormal = noSerialize(moonNormalTexture);

    // Moon
    const geoMoon = new SphereGeometry(3, 32, 32);
    const matMoon = new MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonNormalTexture,
    });
    const moon = new Mesh(geoMoon, matMoon);

    moonStore.moons = [noSerialize(moon)];
    console.log("moon");
    // log time
    console.log(performance.now());
  });

  return {
    moonStore,
  };
};

export default useMoonMesh;
