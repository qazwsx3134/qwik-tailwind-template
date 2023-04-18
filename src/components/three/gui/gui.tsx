import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import { useStore } from "@builder.io/qwik";
import { GUI } from "dat.gui";
/**
 * Create a Reusable Object in three.js
 */

const useGUI = () => {
  const guiStore = useStore<{
    gui: NoSerialize<GUI>;
  }>({
    gui: undefined,
  });

  useVisibleTask$(() => {
    const gui = new GUI({ name: "My GUI" });
    guiStore.gui = noSerialize(gui);
  });

  return {
    guiStore,
  };
};

export default useGUI;
