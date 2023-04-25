import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
  useStylesScoped$,
  useOnWindow,
} from "@builder.io/qwik";
import gsap from "gsap";

import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const timelineStore = useStore<{
    init: NoSerialize<gsap.core.Timeline>;
    shake: NoSerialize<gsap.core.Timeline>;
  }>({
    init: undefined,
    shake: undefined,
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

    const initAnimation = gsap
      .timeline()
      .from("#scrollText", { y: -50, opacity: 0, duration: 1 });
    timelineStore.init = noSerialize(initAnimation);
    const shakeAnimation = gsap.timeline({ repeat: -1, repeatDelay: 1 }).fromTo(
      "#scrollText",
      { y: 0 },
      {
        y: 5,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
    timelineStore.shake = noSerialize(shakeAnimation);

    const textScrollAnimation = gsap
      .timeline()
      .fromTo(
        "#textLayer",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          duration: 1,
          reversed: true,
        }
      ).repeat(-1);
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
    <div class="section relative w-full min-h-screen bg-black">
      <div class="videoContainer">
        <video class="video" autoPlay muted loop>
          <source src="../../../public/video/star_m.mp4" type="video/mp4" />
          <h1>You can place a title over the video like this...</h1>
        </video>
      </div>
      <div id="scrollText" class="absolute z-10 left-1/2 top-3/4">
        <div class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div
            id="text"
            class="border-solid border border-white p-3 rounded-full w-48"
          >
            <div class="text-white font-semibold text-xl tracking-widest text-center">
              Scroll Down
            </div>
          </div>
          <div class="flex mt-2 justify-center items-center">
            <i class="fa-solid fa-arrow-down" style="color: #000;"></i>
          </div>
        </div>
        <div
          id="textLayer"
          class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
        >
          <div
            id="text"
            class="border-solid border-2 border-slate-900 p-3 rounded-full w-48 bg-white"
          >
            <div class="text-black font-semibold text-xl tracking-widest text-center">
              Scroll Down
            </div>
          </div>
          <div class="flex mt-2 justify-center items-center">
            <i class="fa-solid fa-arrow-down" style="color: #ffffff;"></i>
          </div>
        </div>
      </div>
    </div>
  );
});
