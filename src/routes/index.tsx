import {
  component$,
  noSerialize,
  type NoSerialize,
  useStylesScoped$,
  useVisibleTask$,
  useOnDocument,
  $,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./index.css?inline";

import {
  WebGLRenderer,
  SphereGeometry,
  Mesh,
  MeshStandardMaterial,
  PointLightHelper,
  GridHelper,
  MathUtils,
  TextureLoader,
  AxesHelper,
  type Texture,
} from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useStore } from "@builder.io/qwik";

import useTorusMesh from "~/components/three/mesh/torus";
import useMoonMesh from "~/components/three/mesh/moon";
import useScene from "~/components/three/scene/scene";
import usePerspectiveCamera from "~/components/three/camera/perspectiveCamera";
import usePointLight from "~/components/three/light/pointLight";

export default component$(() => {
  useStylesScoped$(styles);
  /**
   * In threejs, we need to create a scene, a camera, and a renderer
   * so that we can render a 3D scene.
   * scene: the scene is the container for all the objects in the 3D world
   * camera: the camera is the view of the 3D world(POV)
   * const camera = new THREE.PerspectiveCamera(75 // fov 垂直視野角度, window.innerWidth / window.innerHeight // aspect 長寬比, 0.1 // near 近端面, 1000 // far 遠端面);
   */

  const { pointLightStore } = usePointLight();
  const { sceneStore } = useScene();
  const { cameraStore } = usePerspectiveCamera();
  const { moonStore } = useMoonMesh();
  const { torusStore } = useTorusMesh();

  const geoTorus = torusStore.geometry;
  const matTorus = torusStore.material;

  const controlStore = useStore<{
    instance: NoSerialize<OrbitControls>;
  }>({
    instance: undefined,
  });

  const rendererStore = useStore<{
    instance: NoSerialize<WebGLRenderer>;
  }>({
    instance: undefined,
  });

  const textureStore = useStore<{
    space: NoSerialize<Texture>;
  }>({
    space: undefined,
  });

  const moveCamera = $(() => {
    // 得到目前滾動的距離
    const top = document.body.getBoundingClientRect().top;

    if (cameraStore.instance) {
      cameraStore.instance.position.z += top * -0.01;
      cameraStore.instance.position.x = top * -0.002;
      cameraStore.instance.position.y = top * -0.002;
    }
  });
  useOnDocument("scroll", moveCamera);

  const addStar = $(() => {
    const geometry = new SphereGeometry(0.25, 24, 24);
    const material = new MeshStandardMaterial({ color: 0xffffff });
    const star = new Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill(null)
      .map(() => MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    if (sceneStore.instance) {
      sceneStore.instance.add(star);
    }
  });

  useVisibleTask$(() => {
    /**
     * Textures
     */

    const spaceTexture = new TextureLoader().load("images/space.jpg");
    textureStore.space = noSerialize(spaceTexture);

    /**
     * Geometry
     * geometry: the geometry is the shape of the object
     * Star
     */

    const renderer = new WebGLRenderer({
      canvas: document.querySelector("#bg") as HTMLCanvasElement,
    });
    rendererStore.instance = noSerialize(renderer);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const axeHelper = new AxesHelper(100);
    const gridHelper = new GridHelper(200, 50);

    /**
     * Init Camera
     */
    if (cameraStore.instance) {
      cameraStore.instance.position.setZ(-10);
      cameraStore.instance.position.setX(10);
      cameraStore.instance.position.setY(0);

      const controls = new OrbitControls(
        cameraStore.instance,
        renderer.domElement
      );
      controlStore.instance = noSerialize(controls);
    }

    /**
     * Init Scene
     */
    if (sceneStore.instance) {
      sceneStore.instance.background = spaceTexture;
      if (moonStore.moons[0]) {
        sceneStore.instance.add(moonStore.moons[0]);
      }

      if (torusStore.toruses[0]) {
        sceneStore.instance.add(torusStore.toruses[0]);
      }
      sceneStore.instance.add(gridHelper, axeHelper);
    }

    /**
     * Init Light
     */
    if (pointLightStore.pointLight) {
      pointLightStore.pointLight.position.set(5, 5, 5);

      const lightHelper = new PointLightHelper(pointLightStore.pointLight);

      if (sceneStore.instance) {
        sceneStore.instance.add(pointLightStore.pointLight);
        sceneStore.instance.add(lightHelper);
      }
    }

    // if (ambientLightStore.ambientLight) {
    //   if (sceneStore.instance) {
    //     sceneStore.instance.add(ambientLightStore.ambientLight);
    //   }
    // }

    if (sceneStore.instance && cameraStore.instance) {
      renderer.render(sceneStore.instance, cameraStore.instance);
    }

    Array(200).fill(null).forEach(addStar);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      torusStore.toruses.forEach((torus) => {
        if (torus) {
          torus.rotation.x += 0.01;
          torus.rotation.y += 0.005;
          torus.rotation.z += 0.01;
        }
      });

      if (controlStore.instance) {
        controlStore.instance.update();
      }

      if (
        rendererStore.instance &&
        cameraStore.instance &&
        sceneStore.instance
      ) {
        rendererStore.instance.render(
          sceneStore.instance,
          cameraStore.instance
        );
      }
    };
    animate();
  });
  const addTorus = $(() => {
    const [x, y, z] = Array(3)
      .fill(null)
      .map(() => MathUtils.randFloatSpread(10));
    if (sceneStore.instance && torusStore.toruses.length > 0) {
      // Torus
      const torus = new Mesh(geoTorus, matTorus);

      torus.position.set(x, y, z);
      torusStore.toruses.push(noSerialize(torus));
      sceneStore.instance.add(torus);
    }
  });

  return (
    <div class="">
      <canvas id="bg" />
      {true && (
        <div class="main" onClick$={addTorus}>
          <blockquote>
            <p>I like making stuff and putting it on the internet</p>
          </blockquote>
          <section>
            <h2>📜 Manifesto</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>
          <section class="light">
            <h2>👩🏽‍🚀 Projects</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h2>🏆 Accomplishments</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>
          <blockquote>
            <p>
              The best way out is always through <br />
              -Robert Frost
            </p>
          </blockquote>

          <section class="left">
            <h2>🌮 Work History</h2>

            <h3>McDonalds</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3>Burger King</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h3>Taco Bell</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>
          <blockquote>
            <p>Thanks for watching!</p>
          </blockquote>
        </div>
      )}
    </div>
  );
});

// Need to use i18n
export const head: DocumentHead = {
  title: "奧客資料庫",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
