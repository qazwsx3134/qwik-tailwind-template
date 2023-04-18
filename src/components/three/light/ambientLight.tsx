import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import { AmbientLight } from "three";

import { useStore } from "@builder.io/qwik";
/**
 * Create a Reusable Object in three.js
 */

const useAmbientLight = () => {
  const ambientLightStore = useStore<{
    ambientLight: NoSerialize<AmbientLight>;
  }>({
    ambientLight: undefined,
  });

  useVisibleTask$(() => {
    const ambientLight = new AmbientLight(0xffffff);
    ambientLightStore.ambientLight = noSerialize(ambientLight);
  });

  return {
    ambientLightStore,
  };
};

export default useAmbientLight;
