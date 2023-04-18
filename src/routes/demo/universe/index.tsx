import {
  component$,
  noSerialize,
  type NoSerialize,
  useStylesScoped$,
  useVisibleTask$,
  useOnDocument,
  $,
  useSignal,
  useOnWindow,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./index.css?inline";

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
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useStore } from "@builder.io/qwik";

import { GUI } from "dat.gui";
import useGUI from "~/components/three/gui/gui";

export default component$(() => {
  useStylesScoped$(styles);
  /**
   * In threejs, we need to create a scene, a camera, and a renderer
   * so that we can render a 3D scene.
   * scene: the scene is the container for all the objects in the 3D world
   * camera: the camera is the view of the 3D world(POV)
   * const camera = new THREE.PerspectiveCamera(75 // fov 垂直視野角度, window.innerWidth / window.innerHeight // aspect 長寬比, 0.1 // near 近端面, 1000 // far 遠端面);
   */

  const gui = {
    cameraX: 1,
    cameraY: 1,
    cameraZ: 12,
  };

  const { guiStore } = useGUI();
  const loadDone = useSignal(false);

  const sceneStore = useStore<{ instance: NoSerialize<Scene> }>({
    instance: undefined,
  });

  const cameraStore = useStore<{ instance: NoSerialize<PerspectiveCamera> }>({
    instance: undefined,
  });

  const pointLightStore = useStore<{
    pointLight: NoSerialize<PointLight>;
  }>({
    pointLight: undefined,
  });
  const ambientLightStore = useStore<{
    ambientLight: NoSerialize<AmbientLight>;
  }>({
    ambientLight: undefined,
  });

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

  const torusStore = useStore<{
    toruses: NoSerialize<Mesh>[];
  }>({
    toruses: [undefined],
  });

  const meshStore = useStore<{
    star: NoSerialize<Mesh>;
  }>({
    star: undefined,
  });

  const renderStore = useStore<{ instance: NoSerialize<WebGLRenderer> }>({
    instance: undefined,
  });

  const moveCamera = $(() => {
    // 得到目前滾動的距離
    const top = document.body.getBoundingClientRect().top;

    if (cameraStore.instance) {
      cameraStore.instance.position.z = top * -0.01;
      cameraStore.instance.position.x = top * -0.0025;
      cameraStore.instance.position.y = top * -0.002;
    }
  });
  useOnDocument("scroll", moveCamera);

  const windowResize = $(() => {
    if (cameraStore.instance) {
      cameraStore.instance.aspect = window.innerWidth / window.innerHeight;
      cameraStore.instance.updateProjectionMatrix();
    }

    if (rendererStore.instance) {
      rendererStore.instance.setSize(window.innerWidth, window.innerHeight);
    }
  });

  useOnWindow("resize", windowResize);

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
    const scene = new Scene();
    sceneStore.instance = noSerialize(scene);

    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraStore.instance = noSerialize(camera);

    /**
     * Textures
     */
    const moonNormalTexture = new TextureLoader().load("../images/normal.jpg");
    const moonTexture = new TextureLoader().load("../images/moon.jpg");
    const spaceTexture = new TextureLoader().load("../images/space.jpg");

    textureStore.space = noSerialize(spaceTexture);
    moonTextureStore.moon = noSerialize(moonTexture);
    moonTextureStore.moonNormal = noSerialize(moonNormalTexture);

    /**
     * Geometry
     * geometry: the geometry is the shape of the object
     * Star
     */

    // Torus
    const geoTorus = new TorusGeometry(10, 3, 16, 100);

    const matTorus = new MeshStandardMaterial({
      color: 0xff6347,
    });

    const torus = new Mesh(geoTorus, matTorus);

    torusStore.toruses = [noSerialize(torus)];

    // Moon
    const geoMoon = new SphereGeometry(3, 32, 32);
    const matMoon = new MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonNormalTexture,
    });
    const moon = new Mesh(geoMoon, matMoon);

    moonStore.moons = [noSerialize(moon)];

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

    camera.position.setZ(gui.cameraZ);
    camera.position.setX(gui.cameraX);
    camera.position.setY(gui.cameraY);
    if (guiStore.gui) {
      guiStore.gui.add(gui, "cameraX").min(-100).max(100).step(0.05);
      guiStore.gui.add(gui, "cameraY").min(-100).max(100).step(0.05);
      guiStore.gui.add(gui, "cameraZ").min(-100).max(100).step(0.05);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controlStore.instance = noSerialize(controls);

    /**
     * Init Scene
     */
    scene.background = spaceTexture;
    scene.add(moon);
    scene.add(torus);
    scene.add(gridHelper, axeHelper);

    /**
     * Init Light
     */

    const pointLight = new PointLight(0xffffff);
    pointLightStore.pointLight = noSerialize(pointLight);

    pointLight.position.set(5, 5, 5);

    const ambientLight = new AmbientLight(0xffffff);
    ambientLightStore.ambientLight = noSerialize(ambientLight);

    const lightHelper = new PointLightHelper(pointLight);

    scene.add(pointLight, ambientLight, lightHelper);

    renderer.render(scene, camera);

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
      if (guiStore.gui) {
        camera.position.z = gui.cameraZ;
        camera.position.x = gui.cameraX;
        camera.position.y = gui.cameraY;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  });
  const addTorus = $(() => {
    const [w, x, y, z] = Array(3)
      .fill(null)
      .map(() => MathUtils.randFloatSpread(100));
    if (sceneStore.instance && torusStore.toruses.length > 0) {
      // Torus
      const geoTorus = new TorusGeometry(w, x, y, z);

      const matTorus = new MeshStandardMaterial({
        color: 0xff6347,
      });
      // Torus
      const torus = new Mesh(geoTorus, matTorus);

      torus.position.set(x, y, z);
      torusStore.toruses.push(noSerialize(torus));
      sceneStore.instance.add(torus);
    }
  });

  return (
    <div class="">
      <canvas id="bg" onClick$={addTorus} />
      {false && (
        <div class="main">
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
