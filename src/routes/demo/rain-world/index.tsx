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
  DirectionalLight,
  DirectionalLightHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  LatheGeometry,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  BufferAttribute,
  PointsMaterial,
  Points,
  FogExp2,
} from "three";
// @ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useStore } from "@builder.io/qwik";

import { GUI } from "dat.gui";
import useGUI from "~/components/three/gui/gui";

/**
 * Refer https://www.youtube.com/watch?v=1bkibGIG8i0&ab_channel=RedStapler
 */
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
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
    cloudQuantity: 20,
    rainCount: 15000,
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

  const cloudStore = useStore<{
    clouds: NoSerialize<Mesh>[];
  }>({
    clouds: [undefined],
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
    const moonNormalTexture = new TextureLoader().load(
      "../../images/normal.jpg"
    );
    const moonTexture = new TextureLoader().load("../../images/moon.jpg");
    const spaceTexture = new TextureLoader().load("../../images/space.jpg");
    const cloudTexture = new TextureLoader().load("../../images/smoke.png");

    textureStore.space = noSerialize(spaceTexture);
    moonTextureStore.moon = noSerialize(moonTexture);
    moonTextureStore.moonNormal = noSerialize(moonNormalTexture);

    /**
     * Geometry
     * geometry: the geometry is the shape of the object
     * Star
     */

    // Rain drop
    const rainDropVelocity = [];
    const rainDropArray = [];
    const geoRain = new BufferGeometry();
    for (let index = 0; index < gui.rainCount; index++) {
      rainDropArray.push(
        MathUtils.randFloatSpread(500),
        MathUtils.randFloatSpread(500),
        MathUtils.randFloatSpread(500)
      );
      rainDropVelocity.push(0);
    }
    geoRain.setAttribute(
      "position",
      new Float32BufferAttribute(rainDropArray, 3)
    );
    geoRain.setAttribute(
      "velocity",
      new Float32BufferAttribute(rainDropVelocity, 1)
    );

    const matRain = new PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
    });

    const rain = new Points(geoRain, matRain);
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

    // Cloud
    const geoCloud = new PlaneGeometry(500, 500);
    const matCloud = new MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
    });

    // Renderer

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
    camera.rotation.x = gui.cameraRotationX;
    camera.rotation.y = gui.cameraRotationY;
    camera.rotation.z = gui.cameraRotationZ;
    if (guiStore.gui) {
      guiStore.gui.add(gui, "cameraX").min(-100).max(100).step(0.05);
      guiStore.gui.add(gui, "cameraY").min(-100).max(100).step(0.05);
      guiStore.gui.add(gui, "cameraZ").min(-100).max(100).step(0.05);
      guiStore.gui
        .add(gui, "cameraRotationX")
        .min(Math.PI * -2)
        .max(Math.PI * 2)
        .step(Math.PI / 36);
      guiStore.gui
        .add(gui, "cameraRotationY")
        .min(Math.PI * -2)
        .max(Math.PI * 2)
        .step(Math.PI / 36);
      guiStore.gui
        .add(gui, "cameraRotationZ")
        .min(Math.PI * -2)
        .max(Math.PI * 2)
        .step(Math.PI / 36);
      guiStore.gui.add(gui, "cloudQuantity").min(0).max(100).step(1);
    }

    /**
     * Init Scene
     */
    // scene.background = spaceTexture;
    scene.fog = new FogExp2(0x1c1c2a, 0.002);
    scene.add(rain);
    scene.add(moon);
    scene.add(torus);
    for (let index = 0; index < gui.cloudQuantity; index++) {
      const cloud = new Mesh(geoCloud, matCloud);
      cloud.position.set(Math.random() * 100, 100, Math.random() * 100);
      cloud.rotation.x = 3.14 / 2;
      cloud.rotation.z = Math.random() * 360;
      cloud.rotation.y = -0.12;
      cloud.material.opacity = 0.8;
      cloudStore.clouds.push(noSerialize(cloud));
      scene.add(cloud);
    }

    scene.add(gridHelper, axeHelper);

    /**
     * Init Light
     */

    const flash = new PointLight(0x062d89, 30, 100, 1.7);
    flash.position.set(20, 90, 10);

    const flashHelper = new PointLightHelper(flash, 5);

    // Ambient light illuminates all objects in the scene equally.
    const ambientLight = new AmbientLight(0x555555);
    ambientLightStore.ambientLight = noSerialize(ambientLight);

    // Directional light is a light source that acts like the sun, that is, it is infinitely far away and the rays produced are all parallel.
    const directionalLight = new DirectionalLight(0xffeedd, 1);
    directionalLight.position.set(0, 300, 0);

    const directionalLightHelper = new DirectionalLightHelper(
      directionalLight,
      5
    );

    scene.add(
      ambientLight,
      directionalLight,
      directionalLightHelper,
      flash,
      flashHelper
    );

    renderer.render(scene, camera);

    Array(200).fill(null).forEach(addStar);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlStore.instance = noSerialize(controls);

    const rainVelocity = () => {
      let x, y, z, index;
      x = y = z = index = 0;
      //@ts-ignore
      const positions = rain.geometry.attributes.position.array;
      //@ts-ignore
      const velocity = rain.geometry.attributes.velocity.array;
      for (let i = 0; i < positions.length; i = i + 3) {
        // positions[i] = x;
        // positions[i++] = y;
        // positions[i + 2] = z;
        velocity[i] -= 0.1 + Math.random() * 0.1;
        positions[i + 1] += velocity[i];
        if (positions[i + 1] < -200) {
          positions[i + 1] = 200;
          velocity[i] = 0;
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100) {
          flash.position.set(
            MathUtils.randInt(0, 100),
            70 + MathUtils.randInt(0, 30),
            MathUtils.randInt(0, 100)
          );
        }
        flash.power = 50 + Math.random() * 500;
      }
      rain.rotation.y += 0.002;
      rainVelocity();

      torusStore.toruses.forEach((torus) => {
        if (torus) {
          torus.rotation.x += 0.01;
          torus.rotation.y += 0.005;
          torus.rotation.z += 0.01;
        }
      });
      cloudStore.clouds.forEach((cloud) => {
        if (cloud) {
          cloud.rotation.z -= 0.001;
        }
      });
      // if (guiStore.gui) {
      //   camera.position.z = gui.cameraZ;
      //   camera.position.x = gui.cameraX;
      //   camera.position.y = gui.cameraY;
      //   camera.rotation.x = gui.cameraRotationX;
      //   camera.rotation.y = gui.cameraRotationY;
      //   camera.rotation.z = gui.cameraRotationZ;
      // }

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
      <canvas id="bg" />
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
