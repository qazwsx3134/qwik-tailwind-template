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

    timeline
      .from("#first", { xPercent: -100 })
      .from("#second", { xPercent: 100 })
      .from("#third", { xPercent: -100 });

    // Start from scroller start touch the trigger start
    // End at scroller end touch the trigger end
    ScrollTrigger.create({
      animation: timeline,
      trigger: "#slide-container",
      start: "top top",
      end: () => `400% bottom`,
      scrub: 0.5,
      markers: true,
      pin: true,
      anticipatePin: 1,
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
        Slide in
      </div>
      {/* relative container */}
      <div
        id="slide-container"
        class="relative"
        style={{
          height: "100vh",
        }}
      >
        {/* absolute container */}
        <div
          class="absolute inset-0"
          style={{
            height: "100vh",
          }}
        >
          <div
            id="first"
            class="flex justify-center items-center bg-gray-400"
            style={{
              height: "100vh",
            }}
          >
            11111111
          </div>
        </div>
        <div
          class="absolute inset-0"
          style={{
            height: "100vh",
          }}
        >
          <div
            id="second"
            class="flex flex-col bg-orange-500 justify-center items-center"
            style={{
              height: "100vh",
            }}
          >
            222222222222
          </div>
        </div>
        <div
          class="absolute inset-0"
          style={{
            height: "100vh",
          }}
        >
          <div
            id="third"
            class="flex flex-col  bg-blue-500 justify-center items-center"
            style={{
              height: "100vh",
            }}
          >
            333333333333
          </div>
        </div>
      </div>
    </div>
  );
});
