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

      // if (!store.debounce) {
      //   return [];
      // }
      // Fetch the data and return the promises.
      const res = getRepositories(store.debounce!, controller);
      console.log(res);
      return res;
    }
  );

  const badCustomerNumbers = useComputed$(
    async () => (await badCustomerResource.value).length
  );

  return (
    <>
      <div class="flex flex-auto flex-col rounded-lg">
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
        <div class="px-4 py-4 bg-white rounded-lg">
          <div class="border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
              <li class="mr-2">
                <div class="leading-5 inline-flex items-center px-4 pb-2 border-b-2 rounded-t-lg text-lg text-black border-gray-950 group">
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
          <Resource
            value={badCustomerResource}
            onPending={() => <>Loading...</>}
            onRejected={(error) => <div>{error}</div>}
            onResolved={(badCustomers) => (
              <div class="mt-2">
                {badCustomers.map((badCustomer) => (
                  <div class="cursor-pointer group grid grid-cols-12 grid-rows-6 gap-1 w-full h-60 px-5 py-4 mb-2 transition-colors duration-200 bg-white rounded-md hover:bg-gray-100 focus:outline-none active:bg-gray-500">
                    {/* First row */}
                    <div class="row-span-2 col-span-2 flex items-center justify-start">
                      {/* <i class="text-gray-700 fa-solid fa-circle-exclamation fa-2xl group-active:text-gray-200"></i> */}
                      <i class="fa-regular fa-circle-xmark fa-2xl leading-8"></i>
                    </div>

                    <div class="row-span-2 col-span-6 text-left flex items-center justify-start">
                      <span class="text-xl font-semibold group-active:text-gray-200">
                        {badCustomer.phoneNumber || badCustomer.email}
                      </span>
                    </div>

                    <div class="row-span-2 col-span-4 text-left flex items-center justify-end">
                      <span class="text-sm font-normal truncate group-active:text-gray-200">
                        {badCustomer.updatedAt}
                      </span>
                    </div>

                    {/* Second row */}
                    <div class="row-span-1 col-span-12">
                      <div class="flex items-center justify-end text-sm">
                        <>
                          {badCustomer.tag.map((tag) => (
                            <Tag size="sm">
                              <div q:slot="children">{tag}</div>
                            </Tag>
                          ))}
                        </>
                      </div>
                    </div>

                    {/* Third row */}
                    <div class="row-span-2 col-span-12">
                      <div class="flex flex-col flex-grow h-full">
                        <div class="flex flex-grow items-center justify-star font-normal text-sm line-clamp-3 leading-4 h-8">
                          comment for this dude comment for this comment for
                          this dude comment for thiscomment for this dude
                          comment for this comment for this dude comment for
                          this comment for this dude comment for thiscomment for
                          this dude comment for this
                        </div>
                        <div class="truncate flex items-end justify-end text-xs font-light">
                          {badCustomer.updatedAt}
                        </div>
                      </div>
                    </div>
                    {/* Fourth row*/}
                    <div class="row-span-1 col-span-12">
                      <div class="flex flex-col flex-grow h-full items-center justify-center">
                        Watch more
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
