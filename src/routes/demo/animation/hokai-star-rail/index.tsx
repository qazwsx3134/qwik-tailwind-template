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
import ScrollTrigger from "gsap/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);

    const initAnimation = gsap
      .timeline()
      .from("#scrollTextContainer", { y: -50, opacity: 0, duration: 1 });
    timelineStore.init = noSerialize(initAnimation);
    const shakeAnimation = gsap.timeline({ repeat: -1, repeatDelay: 1 }).fromTo(
      "#scrollTextContainer",
      { y: 0 },
      {
        y: 5,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      }
    ).fromTo(".landscapeReminder",{
      opacity: 0.8
    },{
      opacity: 1,
      rotate: 90,
    });
    timelineStore.shake = noSerialize(shakeAnimation);

    gsap.fromTo(
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
              (document.getElementById("secondScreen")?.offsetHeight || 0) * 1
            } top`,
          scrub: 1,
          markers: true,
          pin: "#scrollContainer",
          anticipatePin: 1,
        },
      }
    );
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
      <div id="firstScreen" class="h-screen relative ">
        <div class="videoContainer h-full">
          <video class="video" autoPlay muted loop>
            <source src="../../../public/video/star_m.mp4" type="video/mp4" />
            <h1>You can place a title over the video like this...</h1>
          </video>
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

      {/*  */}
      <div id="secondScreen" class="h-screen">
        cc
      </div>
      <div class="h-screen">cc</div>
    </div>
  );
});
