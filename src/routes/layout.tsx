import {
  $,
  component$,
  Slot,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import {
  useContext,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";
import CartModal from "~/components/modal/cartModal";

interface AppContext {
  cart: Cart;
  modal: {
    cart: boolean;
  };
}

interface Cart {
  items: (Product | null | undefined)[];
}

interface Product {
  id: string;
}

export const appContext = createContextId<AppContext>("app.context");

export default component$(() => {
  const context = useStore<AppContext>(
    {
      cart: {
        items: [],
      },
      modal: {
        cart: false,
      },
    },
    { deep: true }
  );
  useContextProvider(appContext, context);

  // Check the local storage for context
  useVisibleTask$(() => {
    const cartItems = localStorage.getItem("app.cart.items");
    if (cartItems) {
      context.cart.items = JSON.parse(cartItems);
    }
  });

  // close cart modal function

  return (
    <>
      <main class="flex-1 flex flex-col min-h-screen bg-red-300">
        {context.modal.cart && (
          <CartModal
            onClose$={() => {
              context.modal.cart = false;
            }}
          />
        )}
        <Slot />
      </main>
    </>
  );
});
