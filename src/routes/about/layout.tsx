import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section>
      <Slot /> {/* <== Child layout/route inserted here */}
    </section>
  );
});
