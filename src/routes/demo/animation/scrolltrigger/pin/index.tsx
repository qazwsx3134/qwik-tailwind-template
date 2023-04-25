import {
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default component$(() => {
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

    // Start from scroller start touch the trigger start
    // End at scroller end touch the trigger end
    gsap.utils.toArray(".panel").forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel as gsap.DOMTarget,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });
  });

  return (
    <div class="m-0 h-full flex flex-col">
      {/* Create a slide-in panels */}
      <div
        class="flex justify-center items-center bg-amber-400 relative z-10"
        style={{
          height: "100vh",
        }}
      >
        Slides
      </div>
      <div
        id="first"
        class="flex justify-center items-center bg-gray-400 panel"
        style={{
          height: "80vh",
        }}
      >
        11111111
      </div>
      <div
        id="second"
        class="flex flex-col bg-orange-500 justify-center items-center panel"
        style={{
          height: "100vh",
        }}
      >
        222222222222
      </div>
      <div
        id="third"
        class="flex flex-col  bg-blue-500 justify-center items-center panel"
        style={{
          height: "100vh",
        }}
      >
        333333333333
      </div>
    </div>
  );
});
