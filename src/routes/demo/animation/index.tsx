import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import gsap from "gsap";

export default component$(() => {
  const timelineStore = useStore<{
    timeline: NoSerialize<gsap.core.Timeline>;
  }>({
    timeline: undefined,
  });

  const buttonOnClick = $(() => {
    // select the button and reverse the timeline
    if (timelineStore.timeline) {
      // Speed up the timeline by 2x
      timelineStore.timeline.timeScale(2);
      timelineStore.timeline.reverse();
    }
  });

  useVisibleTask$(() => {
    // gsap.from(".header", { duration: 1, y: -100, ease: "bounce" });
    // gsap.from(".link", { duration: 1, opacity:0, delay: 1, stagger: 0.2 });
    // gsap.from(".right", { duration: 2, x: '-100vw', delay: 1, ease: "power2.in" });
    // gsap.from(".left", { duration: 1, x: '-100%', delay: 1.5, ease: "power2.in" });
    // gsap.from(".footer", { duration: 1, opacity: 0, delay: 1.5 });

    // gsap.fromTo(".button", { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, delay: 2, ease: "elastic" });
    const timeline = gsap.timeline({
      defaults: { ease: "power1.out", duration: 1 },
    });
    timelineStore.timeline = noSerialize(timeline);
    timeline
      .from(".header", { y: "-100%", duration: 1.5, delay: 0.5 })
      .from(".link", { opacity: 0, stagger: 0.5, duration: 1 }, "-=1")
      .from(".right", { duration: 1, x: "-100vw", ease: "power2.in" }, 1) // absolute time
      .from(".left", { duration: 1, x: "-100%", ease: "power2.in" }, "<1") // relative time according to the previous element
      .fromTo(
        ".button",
        { opacity: 0, scale: 0, rotation: 720 },
        { opacity: 1, scale: 1, rotation: 0, ease: "elastic" }
      );
  });

  return (
    <div class="overflow-hidden m-0 h-screen flex flex-col">
      <div class="header h-10 bg-red-400">
        <div class="links h-full flex justify-around items-center text-white">
          <div class="link"> link 1</div>
          <div class="link"> link 2</div>
          <div class="link"> link 3</div>
        </div>
      </div>

      <div class="content flex flex-grow justify-between">
        <div class="sidebar left w-12 bg-green-500"> </div>
        <button
          type="button"
          class="button align-middle"
          onClick$={buttonOnClick}
        >
          Reverse
        </button>
        <div class="sidebar right w-12 bg-green-500"> </div>
      </div>
      <div class="footer h-12 bg-cyan-600"></div>
    </div>
  );
});
