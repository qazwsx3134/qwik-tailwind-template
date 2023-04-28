import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import Loader from "~/components/loader";
import EyeMove from "~/components/loader/eyeMove";

export default component$(() => {
  const onDone = useSignal(false);

  useVisibleTask$(() => {
    onDone.value = true;
  });
  return (
    <div >
      <Loader onDone={onDone.value}>
        <EyeMove q:slot="icon"/>
      </Loader>
    </div>
  );
})