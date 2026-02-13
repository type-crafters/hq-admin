<script lang="ts">
    import { ColorScheme } from "$common/enum/ColorScheme";
    import { UserStatus } from "$common/enum/UserStatus";
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    // svelte-ignore state_referenced_locally
    let form = $state(structuredClone(data));

    // svelte-ignore state_referenced_locally
    let preview = $state(data.profilePictureUrl);

    const changeFile = (event: Event) => {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];
        if (preview && preview !== data.profilePictureUrl) {
            URL.revokeObjectURL(preview);
        }
        preview = URL.createObjectURL(file!);
    };
</script>

<Container
    id="user-details"
    maxWidth="max-w-xl"
    class="space-y-8 my-6"
    centered
>
    <div class="flex items-center gap-4">
        <i class="bi bi-person-gear text-4xl"></i>
        <div>
            <h2 class="font-semibold text-2xl">User Details</h2>
            <p class="opacity-60">
                View and update profile information for this user
            </p>
        </div>
    </div>
    <form
        method="POST"
        enctype="multipart/form-data"
        class="rounded-lg bg-zinc-700/20 border border-zinc-600 p-4 space-y-8"
    >
        <div class="w-full flex flex-col items-center gap-4">
            <label class="w-full flex justify-center">
                <figure
                    class="size-24 rounded-full overflow-hidden bg-zinc-700 border-2 border-zinc-600 hover:brightness-50 duration-150 cursor-pointer"
                >
                    <img src={preview} alt="{data.firstName} {data.lastName}'s profile" class="w-full h-full object-cover object-center" />
                </figure>
                <input type="file" name="profilePicture" id="profilePicture" class="hidden" accept="image/*" onchange={changeFile}/>
            </label>
            <div class="flex flex-col items-center gap-3 text-sm">
                <h2 class="text-xl font-semibold">
                    {data.firstName} {data.lastName}
                </h2>
                <p class="opacity-60">{data.email}</p>
                <div class="flex items-center gap-2">
                    <span class="w-fit font-mono px-2 rounded bg-zinc-700">
                        {data.id}
                    </span>
                    <button
                        type="button"
                        aria-label="Copy UUID"
                        class="opacity-60 hover:opacity-100 duration-150 cursor-pointer"
                        onclick={() => navigator.clipboard.writeText("")}
                    >
                        <i class="bi bi-copy text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
        <fieldset class="space-y-4">
            <legend
                class="w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
            >
                <i class="bi bi-person"></i>
                <span>Personal information</span>
            </legend>
            <div class="space-y-6">
                <div class="space-y-2">
                    <label
                        for="firstName"
                        class="block font-semibold opacity-80 text-sm"
                        >First name</label
                    >
                    <div
                        class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                    >
                        <i class="bi bi-person text-lg opacity-60"></i>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            bind:value={form.firstName}
                            class="flex-1 focus:outline-none"
                            placeholder="John"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <label
                        for="lastName"
                        class="block font-semibold opacity-80 text-sm"
                        >Last name</label
                    >
                    <div
                        class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                    >
                        <i class="bi bi-person text-lg opacity-60"></i>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            bind:value={form.lastName}
                            class="flex-1 focus:outline-none"
                            placeholder="Doe"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <label
                        for="email"
                        class="block font-semibold opacity-80 text-sm"
                        >Email address</label
                    >
                    <div
                        class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                    >
                        <i class="bi bi-envelope text-lg opacity-60"></i>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            bind:value={form.email}
                            class="flex-1 focus:outline-none"
                            placeholder="name@example.com"
                        />
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset class="space-y-4">
            <legend
                class="w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
            >
                <i class="bi bi-shield"></i>
                <span>Account settings</span>
            </legend>
            <div class="space-y-6">
                <div class="space-y-2">
                    <label
                        for="status"
                        class="block font-semibold opacity-80 text-sm"
                        >Status</label
                    >
                    <select
                        name="status"
                        id="status"
                        bind:value={form.status}
                        class="w-full appearance-base-select picker:appearance-base-select picker:my-1 picker:border picker:border-zinc-600 picker:rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 rounded p-2 picker-icon:scale-x-80 picker-icon:scale-y-60 picker-icon:opacity-40 open:picker-icon:rotate-180 picker-icon:duration-300 cursor-pointer"
                    >
                        <button type="button">
                            <selectedcontent class="flex items-center gap-2"
                            ></selectedcontent>
                        </button>
                        {#each Object.values(UserStatus) as st}
                            <option
                                value={st}
                                class="px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                {st}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="space-y-2">
                    <span class="block font-semibold opacity-80 text-sm"
                        >Password</span
                    >
                    <div class="flex items-center bg-zinc-700 rounded p-2">
                        <i class="bi bi-key text-xl rotate-135 mr-2"></i>
                        <span class="flex-1">Password is set</span>
                        <div class="size-2 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div class="space-y-2">
                    <label
                        for="theme"
                        class="block font-semibold opacity-80 text-sm"
                        >Preferred theme</label
                    >
                    <select
                        name="theme"
                        id="theme"
                        bind:value={form.preferredTheme}
                        class="w-full appearance-base-select picker:appearance-base-select picker:my-1 picker:border picker:border-zinc-600 picker:rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 rounded p-2 picker-icon:scale-x-80 picker-icon:scale-y-60 picker-icon:opacity-40 open:picker-icon:rotate-180 picker-icon:duration-300 cursor-pointer"
                    >
                        <button type="button">
                            <selectedcontent class="flex items-center gap-2"
                            ></selectedcontent>
                        </button>
                        {#each Object.values(ColorScheme) as sc}
                            <option
                                value={sc}
                                class="px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                {sc}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </fieldset>
        <div class="space-y-4">
            <input
                type="submit"
                value="Save changes"
                class="w-full rounded py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
            />
            <input
                type="reset"
                onclick={(e) => { e.preventDefault(); form = structuredClone(data); }}
                value="Discard changes"
                class="w-full rounded py-2 bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-500 duration-150 cursor-pointer"
            />
        </div>
    </form>
</Container>
