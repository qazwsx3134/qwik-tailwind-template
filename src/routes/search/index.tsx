import {
  component$,
  Resource,
  useComputed$,
  useResource$,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import AnimateButton from "~/components/button/glowOnHoverButton";
import Tag from "~/components/tag";

type Customer = {
  updatedAt: string;
  phoneNumber?: string;
  email?: string;
} & (
  | {
      phoneNumber: string;
    }
  | {
      email: string;
    }
) & {
    nationality?: string;
    language?: string;
    name?: string;
    address?: string;
    company?: string;
    job?: string;
    note?: string;
    habit?: string[];
  };

type BadCustomer = Customer & {
  tag: string[];
};

export async function getRepositories(
  username: string,
  controller?: AbortController
): Promise<BadCustomer[]> {
  // console.log("FETCH", `https://api.github.com/users/${username}/repos`);
  // const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
  //   signal: controller?.signal,
  // });
  // console.log("FETCH resolved");
  // const json = await resp.json();
  // return Array.isArray(json)
  //   ? json.map((repo: { name: string }) => repo.name)
  //   : Promise.reject(json);
  return [
    {
      phoneNumber: "0911111111",
      tag: ["tag1", "tag1", "tag1"],
      nationality: "Taiwan",
      language: "Chinese",
      name: "John",
      email: "qaaaaaaa@gmail.com",
      address: "Taipei",
      company: "Google",
      job: "Engineer",
      note: "note",
      habit: ["h1", "h2", "h3"],
      updatedAt: "2021-08-01T00:00:00.000Z",
    },
    {
      phoneNumber: "0922222222",
      tag: ["tag1", "tag2", "tag3"],
      nationality: "Taiwan",
      language: "Chinese",
      name: "John",
      email: "q22222222@gmail.com",
      address: "Taipei",
      company: "Google",
      job: "Engineer",
      note: "note",
      habit: ["h1", "h2", "h3"],
      updatedAt: "2021-08-01T00:00:00.000Z",
    },
  ];
}

export default component$(() => {
  const store = useStore<{
    input: string | undefined;
    debounce: string | undefined;
  }>({
    input: undefined,
    debounce: undefined,
  });

  const badCustomerResource = useResource$<BadCustomer[]>(
    ({ track, cleanup }) => {
      // We need a way to re-run fetching data whenever the `github.org` changes.
      // Use `track` to trigger re-running of this data fetching function.
      track(() => store.debounce);

      // A good practice is to use `AbortController` to abort the fetching of data if
      // new request comes in. We create a new `AbortController` and register a `cleanup`
      // function which is called when this function re-runs.
      const controller = new AbortController();
      cleanup(() => controller.abort());

      if (!store.debounce) {
        return [];
      }
      // Fetch the data and return the promises.
      const res = getRepositories(store.debounce, controller);
      console.log(res);
      return res;
    }
  );

  const badCustomerNumbers = useComputed$(
    async () => (await badCustomerResource.value).length
  );

  return (
    <>
      <div class="flex flex-auto flex-col bg-white rounded-lg">
        {/* Search */}
        <div class="flex shadow-sm mb-2">
          <input
            type="search"
            placeholder="Search for a customer"
            class="py-2 pl-6 pr-4 rounded-l-md flex flex-1 min-h-[60px] text-lg"
            value={store.input}
            onInput$={(event) => {
              store.input = (event.target as HTMLInputElement).value;
            }}
            onKeyDown$={(event) => {
              if (event.key === "Enter") {
                store.debounce = store.input;
              }
            }}
          />

          <button
            class="bg-white hover:bg-gray-200 active:bg-gray-500 text-pink py-2 px-4 rounded-r-md"
            onClick$={() => {
              store.debounce = store.input;
            }}
          >
            <i class="fa-brands fa-searchengin fa-2xl"></i>
          </button>
        </div>
        {/* Tabs */}
        <div class="px-4">
          <div class="border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              <li class="mr-2">
                <div class="leading-5 inline-flex items-center px-4 pb-2 border-b-2 border-transparent rounded-t-lg text-lg text-black border-gray-950 group">
                  <span class="mr-2">All</span>
                  <Tag>
                    <div q:slot="children">{badCustomerNumbers}</div>
                  </Tag>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <AnimateButton />
          <Resource
            value={badCustomerResource}
            onPending={() => <>Loading...</>}
            onRejected={(error) => <div>{error}</div>}
            onResolved={(badCustomers) => (
              <div class="mt-2">
                {badCustomers.map((badCustomer) => (
                  <div class="cursor-pointer group flex items-center w-full px-5 py-6 transition-colors duration-200 hover:bg-gray-100 focus:outline-none active:bg-gray-500">
                    <i class="contents text-gray-700 fa-sharp fa-solid fa-circle-exclamation fa-2xl w-8 h-8 group-active:text-gray-200"></i>
                    <div class="ml-3 text-left">
                      <span class="text-base font-semibold group-active:text-gray-200">
                        {badCustomer.phoneNumber || badCustomer.email}
                      </span>
                      <div class="flex text-sm items-end">
                        <>
                          {badCustomer.tag.map((tag) => (
                            <Tag size="sm">
                              <div q:slot="children">{tag}</div>
                            </Tag>
                          ))}
                        </>
                        <span class="group-active:text-gray-200">
                          {badCustomer.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
});
