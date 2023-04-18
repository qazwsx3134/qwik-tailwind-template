import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import { PointLight } from "three";

import { useStore } from "@builder.io/qwik";
/**
 * Create a Reusable Object in three.js
 */

const usePointLight = () => {
  const pointLightStore = useStore<{
    pointLight: NoSerialize<PointLight>;
  }>({
    pointLight: undefined,
  });

  useVisibleTask$(() => {
    const pointLight = new PointLight(0xffffff);
    pointLightStore.pointLight = noSerialize(pointLight);
    console.log("light");
    // log time
    console.log(performance.now());
  });

  return {
    pointLightStore,
  };
};

export default usePointLight;
