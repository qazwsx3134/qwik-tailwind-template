import { component$, Slot, useTask$ } from "@builder.io/qwik";
import EyeMove from "./eyeMove/";
import { isServer } from "@builder.io/qwik/build";
import gsap from "gsap";

interface Props {
  onDone?: boolean;
}
/**
 * Make sure use Slot to pass the icon
 */
export default component$<Props>((props) => {
  useTask$(({ track }) => {
    track(() => props.onDone);

    if (isServer) {
      return;
    }

    if (props.onDone) {
      gsap.to("#icon", {
        scale: 0,
      });

      gsap.to(".blinder", {
        duration: 1,
        delay: 0.5,
        scaleY: 0,
        ease: "power2.inOut",
        transformOrigin: "top",
        stagger: {
          amount: 0.5,
        },
      });
    }
  });

  return (
    <div class="loader h-screen w-full absolute z-50">
      <div class="binderContainer absolute top-0 w-full flex">
        <div class="flex blinder bg-green-200 h-screen grow w-full relative"></div>
        <div class="flex blinder bg-green-200 h-screen grow w-full relative"></div>
        <div class="flex blinder bg-green-200 h-screen grow w-full relative"></div>
        <div class="flex blinder bg-green-200 h-screen grow w-full relative"></div>
        <div class="flex blinder bg-green-200 h-screen grow w-full relative"></div>
      </div>
      <div
        id="icon"
        class=" top-1/2 left-1/2  z-10 absolute -translate-x-1/2 -translate-y-1/2"
      >
        <Slot name="icon" />
        {/* <EyeMove /> */}
      </div>
    </div>
  );
});
