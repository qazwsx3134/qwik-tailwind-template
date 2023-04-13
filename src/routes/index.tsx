import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Counter from "~/components/starter/counter/counter";
import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {
  return (
    <div class="">
      <img
        src="/cover2.webp"
        alt="stylish cover image"
        class="relative object-cover brightness-[0.25] h-screen w-screen "
      />
      <div class="absolute top-0 left-0 w-full h-24 bg-black bg-opacity-25 flex">
        <div class="flex flex-1 items-center ml-4 sm:justify-between max-sm:justify-center">
          <span id="headerLogo" class="text-pink text-4xl font-bold">
            Header Logo
          </span>
          <div class="flex mr-6 text-stone-200 max-sm:hidden">
            <span id="loginButton" class="mr-6">
              button
            </span>
            <span id="registerButton">register</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center absolute top-1/2 w-full">
        <div class="text-gWhite text-4xl font-bold mb-2">TESTASTAT</div>
        <div class="text-gWhite text-xl font-medium mb-5">tasdasdasd</div>
        <div class="flex max-sm:flex-col">
          <div>Button 1</div>
          <div>Button 2</div>
        </div>
      </div>
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
