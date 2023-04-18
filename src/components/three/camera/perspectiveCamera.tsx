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
 * Create a Reusable Object in three.js
 */

const usePerspectiveCamera = () => {
  const cameraStore = useStore<{ instance: NoSerialize<PerspectiveCamera> }>({
    instance: undefined,
  });

  useVisibleTask$(() => {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraStore.instance = noSerialize(camera);
    console.log("camera");
    // log time
    console.log(performance.now())
  });

  return {
    cameraStore,
  };
};

export default usePerspectiveCamera;
