import {
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
  const containerRef = useSignal<HTMLDivElement>();
  const timelineStore = useStore<{
    timeline: NoSerialize<gsap.core.Timeline>;
  }>({
    timeline: undefined,
  });

  useVisibleTask$(() => {
    // register the plugin
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power1.out", duration: 1 });

    const timeline = gsap.timeline();
    timelineStore.timeline = noSerialize(timeline);

    const sections = gsap.utils.toArray(".slide");
    // Start from scroller start touch the trigger start
    // End at scroller end touch the trigger end
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".slider-container",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `${containerRef.value?.offsetWidth} bottom`,
        markers: true,
      },
    });
  });

  return (
    <div class="m-0 h-screen w-full flex overflow-x-hidden">
      {/* Create a slide-in panels */}
      <div ref={containerRef} class="slider-container h-full flex flex-nowrap">
        <div class="slide h-full w-screen bg-slate-300" id="slide1"></div>
        <div class="slide h-full w-screen bg-orange-300" id="slide2"></div>
        <div class="slide h-full w-screen bg-green-300" id="slide3"></div>
        <div class="slide h-full w-screen bg-blue-300" id="slide4"></div>
      </div>
    </div>
  );
});
