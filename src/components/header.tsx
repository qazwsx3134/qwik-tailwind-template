import {
  component$,
  useComputed$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { Hamburger } from "./starter/icons/hamburger";
import { QwikLogo } from "./starter/icons/qwik";
import AnimateButton from "./button/glowOnHoverButton";
import { appContext } from "~/routes/layout";
import CartModal from "./modal/cartModal";

export default component$(() => {
  const scrollDown = useSignal(false);
  const context = useContext(appContext);

  return (
    <header
      class={`fixed flex-1 flex top-0 h-16 ${
        scrollDown.value ? "invisible opacity-0" : "visible opacity-100"
      } p-4 w-full bg-white shadow-lg z-10 transition-opacity duration-300`}
      document:onScroll$={() => {
        if (window.scrollY > 0) {
          scrollDown.value = true;
        } else {
          scrollDown.value = false;
        }
      }}
    >
      <div class="flex justify-between items-center w-full text-2xl sm:text-4xl">
        <i class="fa-solid fa-bars"></i>
        {/* 放網站logo or 登入頭像? */}
        <div
          class="relative cursor-pointer"
          onClick$={() => {
            context.modal.cart = !context.modal.cart;
          }}
        >
          <div class="absolute grid place-items-center -top-2 -right-2 bg-slate-900 text-white rounded-full h-5 w-5 text-xs">
            {context.cart.items.length}
          </div>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </header>
  );
});
