import { $, component$, Slot, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

// import Header from '~/components/starter/header/header';
// import Footer from '~/components/starter/footer/footer';
import Header from "~/components/header";
import Menu from "~/components/menu";
import Footer from "~/components/footer";

export enum MenuState {
  BadCustomer = "Bad customer",
  Customer = "Customer",
}

/**
 * Route Loaders can only be declared inside the src/routes folder,
 * in a layout.tsx or index.tsx file, and they MUST be exported.
 */

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <main class="flex-auto flex min-h-screen bg-red-300">
        <Header />
        <div class="flex flex-auto mt-14 p-8">
          {/* This is where the route main content will be inserted */}
          <Slot />
        </div>
      </main>
      <div class="section dark">
        <div class="">
          <Footer />
        </div>
      </div>
    </>
  );
});
