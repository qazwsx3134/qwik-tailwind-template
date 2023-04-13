import {
  component$,
  useSignal,
  useStore,
  useTask$,
  useStylesScoped$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  Form,
  server$,
} from "@builder.io/qwik-city";
import STYLES from "./index.css?inline";

// routeLoader$ to send data from the server to the client
// routeAction$ to send data from the client to the server

// interface ProductData {
//   skuId: string;
//   name: string;
//   price: number;
//   description: string;
// }

interface DadJoke {
  id: string;
  joke: string;
  status: number;
}

export const useJokeVoteAction = routeAction$((props) => {
  // Leave it as an exercise for the reader to implement this.
  console.log("VOTE", props);
});

export const useJoke = routeLoader$(async () => {
  console.log("FETCHING JOKE");
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const res = (await response.json()) as DadJoke;
  return res;
});

export default component$(() => {
  useStylesScoped$(STYLES);
  const dadJokeSignal = useJoke();
  const vote = useJokeVoteAction();
  const isFavoriteSignal = useSignal(false);
  const count = useStore({
    value: 0,
  });

  useTask$(({ track }) => {
    track(isFavoriteSignal);
    console.log("FAVORITE (isomorphic)", isFavoriteSignal.value);
    server$(() => {
      console.log("FAVORITE (server)", isFavoriteSignal.value);
    })();
  });
  return (
    <div class="section bright">
      <div>{dadJokeSignal.value.joke}</div>
      <Form action={vote}>
        <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
        <button name="vote" value="up">
          👍
        </button>
        <button name="vote" value="down">
          👎
        </button>
      </Form>
      <button
        onClick$={() => (isFavoriteSignal.value = !isFavoriteSignal.value)}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </button>
      <button onClick$={() => count.value++}>+++{count.value}</button>
      <div>Count: {count.value}</div>
    </div>
  );
});
