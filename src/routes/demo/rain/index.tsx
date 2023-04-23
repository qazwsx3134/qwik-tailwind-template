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
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";
import styles from "./index.css?inline";

import {
  Scene,
  WebGLRenderer,
  Mesh,
  TextureLoader,
  type Texture,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Cache,
  Clock,
  OrthographicCamera,
  FogExp2,
} from "three";

import rainVertShader from "~/shaders/betterRain/rain.vert.glsl?raw";
import rainFragShader from "~/shaders/betterRain/rain.frag.glsl?raw";
// @ts-ignore
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useStore } from "@builder.io/qwik";

import useGUI from "~/components/three/gui/gui";

// import fujiImage from "~/assets/background/fujisan-tommy-silver-unsplash.webp";
// import fujiImage from '../../../../public/images/fujisan-tommy-silver-unsplash.webp';


// 參考 https://www.rocksdanister.com/lively-webpage/
// 看他的 script.js
// 還有相對應的frag
export default component$(() => {
  const loc = useLocation();
  const containerRef = useSignal<HTMLDivElement>();
  const isDebug = useSignal(loc.query.get("debug") === "true");
  useStylesScoped$(styles);
  /**
   * In threejs, we need to create a scene, a camera, and a renderer
   * so that we can render a 3D scene.
   * scene: the scene is the container for all the objects in the 3D world
   * camera: the camera is the view of the 3D world(POV)
   * const camera = new THREE.PerspectiveCamera(75 // fov 垂直視野角度, window.innerWidth / window.innerHeight // aspect 長寬比, 0.1 // near 近端面, 1000 // far 遠端面);
   */

  /**
   * u_time: { value: 0, type: "f" }, fps
   * u_blur: { value: false, type: "b" }, blur
   * u_intensity: { value: 0.4, type: "f" },
   * u_speed: { value: 0.25, type: "f" },
   * u_brightness: { value: 0.75, type: "f" },
   * u_normal: { value: 0.5, type: "f" },
   * u_zoom: { value: 2.61, type: "f" },
   * u_panning: { value: false, type: "b" },
   * u_post_processing: { value: true, type: "b" },
   * u_lightning: { value: false, type: "b" },
   * u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight), type: "v2" },
   * u_tex0_resolution: { value: new Vector2(window.innerWidth, window.innerHeight), type: "v2" },
   */
  
  const defaultSetting = {
    parallaxVal: 1,
    scale: 1,
  }

  const gui = {
    fps: 60,
    blur: true,
    intensity: 0.45,
    speed: 0.3,
    brightness: 0.75,
    normal: 0.85,
    zoom: 1.5,
    panning: false,
    lighting: false
  };

  const { guiStore } = useGUI();

  const prevScrollPos = useSignal(0);
  const audioStore = useStore<{ instance: NoSerialize<HTMLAudioElement> }>({
    instance: undefined,
  });
  const sceneStore = useStore<{ instance: NoSerialize<Scene> }>({
    instance: undefined,
  });
  const backgroundStore = useStore<{ instance: NoSerialize<Texture> }>({
    instance: undefined,
  });

  const cameraStore = useStore<{ instance: NoSerialize<OrthographicCamera> }>({
    instance: undefined,
  });

  const rendererStore = useStore<{
    instance: NoSerialize<WebGLRenderer>;
  }>({
    instance: undefined,
  });

  const scrollToMoveCamera = $(() => {
    // 得到目前offset
    const currentScrollPos = window.pageYOffset;
    
    guiStore.gui?.updateDisplay();
    prevScrollPos.value = currentScrollPos;
  });
  useOnDocument("scroll", scrollToMoveCamera);

  const moveMouseParallax = $((event:any) => {
    const x = (window.innerWidth - event.pageX * defaultSetting.parallaxVal) / 90;
    const y = (window.innerHeight - event.pageY * defaultSetting.parallaxVal) / 90;

    if (containerRef.value) {
      containerRef.value.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.2)`;
    } 
  })
  useOnDocument("mousemove", moveMouseParallax);

  const windowResize = $(() => {

    if (rendererStore.instance) {
      rendererStore.instance.setSize(window.innerWidth, window.innerHeight);
    }
  });

  useOnWindow("resize", windowResize);

  const clickEvent = $(() => {
    if (audioStore.instance) {
      audioStore.instance.play();
    }
  });
  useOnDocument("click", clickEvent);

  const touchStartEvent = $(() => {
    if (audioStore.instance) {
      audioStore.instance.play();
    }
  });
  useOnDocument("touchstart", touchStartEvent);

  useVisibleTask$(async() => {
    const clock = new Clock();
    Cache.enabled = true;

    const rainShaderUniform ={
      //rain
      u_tex0: { value: undefined, type: "t" },
      u_time: { value: 0, type: "f" },
      u_blur: { value: false, type: "b" },
      u_intensity: { value: 0.4, type: "f" },
      u_speed: { value: 0.25, type: "f" },
      u_brightness: { value: 0.75, type: "f" },
      u_normal: { value: 0.8, type: "f" },
      u_zoom: { value: 1.4, type: "f" },
      u_panning: { value: false, type: "b" },
      u_post_processing: { value: false, type: "b" },
      u_lightning: { value: false, type: "b" },
      u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight), type: "v2" },
      u_tex0_resolution: { value: new Vector2(window.innerWidth, window.innerHeight), type: "v2" },
    }

    const scene = new Scene();
    sceneStore.instance = noSerialize(scene);

    const camera = new OrthographicCamera(
      -1,1,1,-1,0,1
    );
    cameraStore.instance = noSerialize(camera);

    /**
     * Textures
     */
    const background = await new TextureLoader().loadAsync("../../images/fujisan-tommy-silver-unsplash.webp");
    backgroundStore.instance = noSerialize(background);

    /**
     * Object
     */

    const transparentWindowGeo = new PlaneGeometry(50,50,1,1)
    const material = new ShaderMaterial({
      vertexShader: rainVertShader,
      fragmentShader: rainFragShader,
      uniforms: rainShaderUniform,
    })
    material.uniforms.u_tex0.value = background;
    material.uniforms.u_tex0_resolution.value = new Vector2(background.image.width, background.image.height)
    const transparentWindow = new Mesh(transparentWindowGeo,material)

    
    // Renderer

    const renderer = new WebGLRenderer({
      canvas: document.querySelector("#bg") as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });
    rendererStore.instance = noSerialize(renderer);

    // Set to one for preventing mobile device to use high dpi
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    /**
     * Init Camera
     */

    if (guiStore.gui) {
      guiStore.gui.add(gui, "fps").min(1).max(120).step(1);
      guiStore.gui.add(gui, "blur").name("Blur");
      guiStore.gui.add(gui, "intensity").min(0.1).max(1).step(0.05);
      guiStore.gui.add(gui, "speed").min(0.1).max(1).step(0.05);
      guiStore.gui.add(gui, "brightness").min(0.1).max(1).step(0.05);
      guiStore.gui.add(gui, "normal").min(0.1).max(1).step(0.05);
      guiStore.gui.add(gui, "zoom").min(0).max(10).step(0.05);
      guiStore.gui.add(gui, "panning");
      guiStore.gui.add(gui, "lighting");
    }

    /**
     * Init Scene
     */
    // scene.background = spaceTexture;
    scene.fog = new FogExp2(0x1c1c2a, 0.002);

    scene.add(transparentWindow)
    // const axeHelper = new AxesHelper(100);
    // const gridHelper = new GridHelper(200, 50);
    // scene.add(gridHelper, axeHelper);
    /**
     * Init Light
     */
    
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controlStore.instance = noSerialize(controls);

    if (isDebug.value && guiStore.gui) {
      guiStore.gui.show();
    } else {
      guiStore.gui?.hide();
    }
    
    // Animation loop
    const animate = () => {
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / gui.fps);
      
      // Link uniforms
      if (guiStore.gui) {
        rainShaderUniform.u_blur.value = gui.blur;
        rainShaderUniform.u_intensity.value = gui.intensity;
        rainShaderUniform.u_speed.value = gui.speed;
        rainShaderUniform.u_brightness.value = gui.brightness;
        rainShaderUniform.u_normal.value = gui.normal;
        rainShaderUniform.u_zoom.value = gui.zoom;
        rainShaderUniform.u_panning.value = gui.panning;
        rainShaderUniform.u_lightning.value = gui.lighting;
      }

      // Mouse Control
      // controls.update();

      // reset every 6hr
      if (clock.getElapsedTime() > 21600) {
        // reset clock
        clock.start();
      }
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // Audio
    const audio = await new Audio("../../audio/rain.mp3")
    audio.loop = true;
    audio.autoplay = true;
    audioStore.instance = noSerialize(audio)
    containerRef.value?.appendChild(audio)
  });
  

  return (
    <div class="container" ref={containerRef}>
      <canvas id="bg" />
      
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
