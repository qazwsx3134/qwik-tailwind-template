import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { gsap, Power0 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
    const triggerObjectCb = (trigger: string) => ({
      trigger: trigger,
      start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
        markers: true,
    })
    // register the plugin
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      defaults: { ease: "power1.out", duration: 1 },
    });
    timelineStore.timeline = noSerialize(timeline);
    /**
     * ScrollTrigger
     * https://greensock.com/docs/v3/Plugins/ScrollTrigger
     * trigger: ".a", // the element to trigger the animation
     * toggleActions: "onEnter(scroll start pass start), onLeave(scroll start pass end), onEnterBack(scroll start return end), and onLeaveBack(scroll start return start)", // play pause resume reset restart complete reverse none
     * markers: true, // show markers
     * start: "top center", // "the trigger position relate to trigger object, the scroller position on viewport", "start end", "top center bottom pixels, percentage from the top"
     */
    timeline.to("#a", {
      scrollTrigger: triggerObjectCb("#a"),
      x: 400,
      rotation: 360,
      duration: 2,
      ease: Power0.easeIn,
    });

    timeline.to("#c", {
      scrollTrigger: triggerObjectCb("#c"),
      x: 400,
      rotation: 360,
      duration: 2,
      ease: Power0.easeIn,
    });
  });

  return (
    <div class="m-0 h-full flex flex-col">
      <div class="header h-10 bg-red-400">
        <div class="links h-full flex justify-around items-center text-white">
          <div class="link"> link 1</div>
          <div class="link"> link 2</div>
          <div class="link"> link 3</div>
        </div>
      </div>

      <div class="content flex flex-grow justify-between overflow-auto">
        <div class="sidebar left w-12 bg-green-500"> </div>
        <div
          class="flex flex-col justify-between"
          style={{
            height: "500vh",
          }}
        >
          <div id="a" class="h-20 block bg-red-600"></div>
          <button
            id="b"
            type="button"
            class="button align-middle bg-slate-500"
            onClick$={buttonOnClick}
          >
            Reverse
          </button>
          <div id="c" class="h-20 block bg-green-600"></div>
          <div class="h-20 block d bg-orange-600"></div>
        </div>

        <div class="sidebar right w-12 bg-green-500"> </div>
      </div>
      <div class="footer h-12 bg-cyan-600"></div>
    </div>
  );
});
