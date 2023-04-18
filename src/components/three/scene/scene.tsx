import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import { Scene } from "three";

import { useStore } from "@builder.io/qwik";
/**
 * Create a Reusable Object in three.js
 */

const useScene = () => {
  const sceneStore = useStore<{ instance: NoSerialize<Scene> }>({
    instance: undefined,
  });

  useVisibleTask$(() => {
    const scene = new Scene();
    sceneStore.instance = noSerialize(scene);
    console.log("scene");
    // log time
    console.log(performance.now());
  });

  return {
    sceneStore,
  };
};

export default useScene;
