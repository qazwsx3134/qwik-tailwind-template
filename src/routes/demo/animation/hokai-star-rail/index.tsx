import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
  useStylesScoped$,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import styles from "./index.css?inline";

const frameCount = 511;

export default component$(() => {
  useStylesScoped$(styles);

  const canvasRef = useSignal<HTMLCanvasElement>();
  const images = useSignal<HTMLImageElement[]>([]);

  const canvasStore = useStore<{
    context: NoSerialize<CanvasRenderingContext2D | null>;
  }>({
    context: undefined,
  });

  const timelineStore = useStore<{
    init: NoSerialize<gsap.core.Timeline>;
    shake: NoSerialize<gsap.core.Timeline>;
    video: NoSerialize<gsap.core.Timeline>;
  }>({
    init: undefined,
    shake: undefined,
    video: undefined,
  });

  const detectScroll = $(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      timelineStore.shake?.pause();
      return;
    } else {
      timelineStore.shake?.play();
      return;
    }
  });

  useOnWindow("scroll", detectScroll);

  useVisibleTask$(() => {
    /**
     * Tracking if user have scrolled
     * If user have scrolled, we will not play the animation
     * If user scroll to top, we will play the animation
     */
    gsap.registerPlugin(ScrollTrigger);

    const canvasObejct = {
      video: {
        frame: 0,
      },
    };
    if (canvasRef.value && canvasRef.value.getContext("2d")) {
      canvasRef.value.width = 1920;
      canvasRef.value.height = 1080;
      canvasStore.context = noSerialize(
        canvasRef.value.getContext("2d") || undefined
      );
    }

    const render = () => {
      console.log(canvasObejct);
      const context = canvasStore.context;

      context?.drawImage(
        images.value[canvasObejct.video.frame],
        0,
        0,
        canvasRef.value?.width || 1920,
        canvasRef.value?.height || 1080
      );
    };

    for (let index = 1; index < frameCount; index++) {
      const img = new Image();
      const imageIndex = `${index}`.padStart(3, "0");
      img.src = `../../../video/sequence/star/login_${imageIndex}.webp`;
      images.value.push(img);
    }

    images.value[images.value.length - 1].onload = () => {
      render();
      console.log("loaded");
    };

    const initAnimation = gsap
      .timeline()
      .from("#scrollTextContainer", { y: -50, opacity: 0, duration: 1 });
    timelineStore.init = noSerialize(initAnimation);
    const shakeAnimation = gsap
      .timeline({ repeat: -1, repeatDelay: 1 })
      .fromTo(
        "#scrollTextContainer",
        { y: 0 },
        {
          y: 5,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        }
      )
      .fromTo(
        ".landscapeReminder",
        {
          opacity: 0.8,
        },
        {
          opacity: 1,
          rotate: 90,
        }
      );
    timelineStore.shake = noSerialize(shakeAnimation);

    const videoAnimation = gsap
      .timeline()
      .fromTo(
        "#scrollDownButtonLayer",
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0.1%, 0 0.1%)",
          scrollTrigger: {
            trigger: "#scrollContainer",
            start: "top top",
            end: () =>
              `${
                (document.getElementById("firstScreen")?.offsetHeight || 0) * 1
              } top`,
            scrub: 1,
            pin: "#scrollContainer",
          },
        }
      )
      .to(".video", {
        opacity: 0,
        scrollTrigger: {
          trigger: "#scrollContainer",
          start: () => `1px top`,
          end: () => `10px top`,
          scrub: 1,
          pin: "#scrollContainer",
          onLeave: () => {
            console.log("leave");
          },
          onEnterBack: () => {
            console.log("enter back");
          },
        },
      });
    timelineStore.video = noSerialize(videoAnimation);

    gsap.to(".animateButtonWrapper", {
      visibility: "hidden",
      scrollTrigger: {
        trigger: "#scrollContainer",
        start: () => `1x top`,
        end: () => `1px top`,
        scrub: 0.5,
        pin: "#scrollContainer",
      },
    });

    gsap.to(canvasObejct.video, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",

      scrollTrigger: {
        scrub: 0.5,
        start: () => `5px top`,
        end: () => `+=${frameCount * 1}`,
        pin: "#scrollContainer",
        pinSpacing: true,
      },
      onUpdate: render,
    });

    // const loginAnimation = gsap.timeline().to()
  });

  /**
   * Padding bottom is used to maintain the aspect ratio of the video
   * https://css-tricks.com/aspect-ratio-boxes/
   * 56.25% is the aspect ratio of 16:9
   * 100 / 16 * 9 = 56.25 16:9
   * 100 / 9 * 16 = 177.7777777778 9:16
   * 100 / 4 * 3 = 75 4:3
   * 100 / 3 * 4 = 133.3333333333 3:4
   * 100 / 1 * 1 = 100
   * 100 / 1.618 * 1 = 61.8
   * 100 / 1 * 1.618 = 161.8
   * 100 / 1.414 * 1 = 70.7
   */
  return (
    <div id="scrollContainer" class="section w-full min-h-screen bg-black">
      <div id="firstScreen" class="h-screen relative w-full">
        <div id="videoContainer" class="videoContainer h-full">
          <video class="video hidden" autoPlay muted loop playsInline>
            <source src="../../../video/star_m.mp4" type="video/mp4" />
            <h1>You can place a title over the video like this...</h1>
          </video>
          <canvas
            ref={canvasRef}
            id="videoCanvas"
            class="videoCanvas h-full w-full"
          ></canvas>
        </div>

        {/* Reminder of people rotate the phone */}
        <div class="landscapeReminder text-white">
          <i class="fa-solid fa-rotate-right text-4xl"></i>
          <i class="fa-solid fa-mobile text-6xl"></i>
        </div>
        {/* Create two component different color, and use clip path to mask*/}
        <div id="scrollTextContainer" class="scrollTextContainer">
          <div class="animateButtonWrapper">
            <div
              id="scrollDownButton"
              class="border-solid border border-white p-3 rounded-full w-48 absolute left-1/2 top-0 translate-x-[-50%]"
            >
              <div class="text-white font-semibold text-xl tracking-widest text-center">
                Scroll Down
              </div>
            </div>
            <div
              id="scrollDownButtonLayer"
              class="border-solid border border-black bg-white p-3 rounded-full w-48 absolute left-1/2 top-0 translate-x-[-50%]"
            >
              <div class="text-black font-semibold text-xl tracking-widest text-center">
                Scroll Down
              </div>
            </div>

            <div class="flex mt-2 absolute left-1/2 bottom-0 justify-center items-center">
              <i class="fa-solid fa-arrow-down" style="color: #ffffff;"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-black h-1"></div>
    </div>
  );
});
