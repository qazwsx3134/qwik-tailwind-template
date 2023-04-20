import {
  noSerialize,
  type NoSerialize,
  useVisibleTask$,
} from "@builder.io/qwik";

import {
  TorusGeometry,
  Mesh,
  MeshStandardMaterial,
} from "three";

import { useStore } from "@builder.io/qwik";
/**
 * Create a Reusable Object in three.js
 */

const useTorusMesh = () => {
  const torusStore = useStore<{
    geometry: NoSerialize<TorusGeometry>;
    material: NoSerialize<MeshStandardMaterial>;
    toruses: NoSerialize<Mesh>[];
  }>({
    geometry: undefined,
    material: undefined,
    toruses: [undefined],
  });

  useVisibleTask$(() => {
    // Torus
    const geometry = new TorusGeometry(10, 3, 16, 100);

    const material = new MeshStandardMaterial({
      color: 0xff6347,
    });
    torusStore.material = noSerialize(material);
    torusStore.geometry = noSerialize(geometry);

    const torus = new Mesh(geometry, material);

    torusStore.toruses = [noSerialize(torus)];
  });

  return {
    torusStore,
  };
};

export default useTorusMesh;
