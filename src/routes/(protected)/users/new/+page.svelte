<script lang="ts">
    import Container from "$lib/Container.svelte";
    import Tooltip from "$lib/Tooltip.svelte";

    const ACTION = "action";
    const ENTITY = "entity";

    let action: string = $state(ACTION);
    let entity: string = $state(ENTITY);

    let permissions: Set<string> = $state(new Set());

    const addPermission = () => {
        if (action !== ACTION && entity !== ENTITY) {
            permissions = new Set(permissions).add(`${action}:${entity}`);
            action = ACTION;
            entity = ENTITY;
        }
    };

    const removePermission = (permission: string) => {
        if (permissions.has(permission)) {
            permissions = new Set([...permissions].filter(p => p !== permission));
        }
    };

    let permissionString: string = $derived(
        JSON.stringify([...permissions]),
    );

    $effect(() => console.log(action));
    $effect(() => console.log(entity));
    $effect(() => permissions.forEach((p) => console.log(p)));
</script>

<Container
    id="new-user"
    maxWidth="max-w-xl"
    class="space-y-8 my-8"
    centered
>
    <div class="flex items-center gap-4">
        <i class="bi bi-person-square text-4xl"></i>
        <div>
            <h2 class="font-semibold text-2xl">Invite user</h2>
            <p class="opacity-60">
                Send an invitation to add a new user to this organization
            </p>
        </div>
    </div>
    <form
        method="POST"
        class="rounded-lg bg-zinc-700/20 border border-zinc-600 p-4 space-y-6"
    >
        <div>
            <h3 class="text-lg font-semibold">User information</h3>
            <p class="text-sm opacity-60">
                Enter the details of the person you want to invite
            </p>
        </div>
        <div class="space-y-6">
            <div class="space-y-2">
                <label
                    for="firstName"
                    class="block font-semibold opacity-80 text-sm"
                    >First name</label
                >
                <div
                    class="group flex items-center gap-2 p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 duration-150"
                >
                    <i class="bi bi-person text-lg opacity-60"></i>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="John"
                        class="flex-1 min-w-0 focus:outline-none"
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
                    class="group flex items-center gap-2 p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 duration-150"
                >
                    <i class="bi bi-person text-lg opacity-60"></i>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Doe"
                        class="flex-1 min-w-0 focus:outline-none"
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
                    class="group flex items-center gap-2 p-2 rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 duration-150"
                >
                    <i class="bi bi-envelope text-lg opacity-60"></i>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        class="flex-1 min-w-0 focus:outline-none"
                    />
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex items-center gap-1">
                    <span class="block font-semibold opacity-80 text-sm">Permissions</span>
                    <Tooltip>
                        <p class="text-sm">
                            Roles will only be assigned upon approval, after the
                            user has confirmed their email and created a
                            password.
                        </p>
                    </Tooltip>
                </div>
                <input
                    type="text"
                    name="permissions"
                    id="permissions"
                    class="hidden"
                    bind:value={permissionString}
                />
                <div class="flex items-center gap-4">
                    <div class="flex-1 flex items-center gap-1">
                        <select
                            bind:value={action}
                            class="flex-1 appearance-base-select picker:appearance-base-select picker:my-1 picker:border picker:border-zinc-600 picker:rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 rounded p-2 picker-icon:scale-x-80 picker-icon:scale-y-60 picker-icon:opacity-40 open:picker-icon:rotate-180 picker-icon:duration-300 cursor-pointer"
                        >
                            <button type="button">
                                <selectedcontent class="flex items-center gap-2"></selectedcontent>
                            </button>
                            <option
                                value="create"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-plus-lg"></i>
                                <span>create</span>
                            </option>
                            <option
                                value="list"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-view-list"></i>
                                <span>list</span>
                            </option>
                            <option
                                value="update"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-pencil"></i>
                                <span>update</span>
                            </option>
                            <option
                                value="delete"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-trash"></i>
                                <span>delete</span>
                            </option>
                        </select>
                        <span class="text-lg font-bold">:</span>
                        <select
                            bind:value={entity}
                            class="flex-1 appearance-base-select picker:appearance-base-select picker:my-1 picker:border picker:border-zinc-600 picker:rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 rounded p-2 picker-icon:scale-x-80 picker-icon:scale-y-60 picker-icon:opacity-40 open:picker-icon:rotate-180 picker-icon:duration-300 cursor-pointer"
                        >
                            <button type="button">
                                <selectedcontent class="flex items-center gap-2"></selectedcontent>
                            </button>
                            <option
                                value="user"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-person-circle"></i>
                                <span>user</span>
                            </option>
                            <option
                                value="project"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-folder"></i>
                                <span>project</span>
                            </option>
                            <option
                                value="member"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-person-vcard"></i>
                                <span>member</span>
                            </option>
                            <option
                                value="message"
                                class="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                            >
                                <i class="bi bi-envelope"></i>
                                <span>message</span>
                            </option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onclick={addPermission}
                        class="bg-blue-500 rounded p-2 hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
                        aria-label="Add permission to list"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div class="space-y-2">
                <span class="block font-semibold opacity-80 text-sm"
                    >Permission list</span
                >
                {#if permissions.size}
                    <ul class="w-full border border-zinc-700 rounded">
                        {#each permissions as perm}
                        <li class="flex w-full p-2 not-last:border-b border-zinc-700">
                            <span class="flex-1">{perm}</span>
                            <button
                                type="button"
                                class="cursor-pointer text-xs hover:underline text-red-700"
                                onclick={() => removePermission(perm)}
                            >Remove</button>
                        </li>
                        {/each}
                    </ul>
                {:else}
                    <p class="text-center opacity-60 text-sm">
                        No permissions added
                    </p>
                {/if}
            </div>
            <div>
                <input
                    type="submit"
                    value="Invite user"
                    class="w-full text-center p-2 bg-blue-500 rounded hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
                />
            </div>
        </div>
    </form>
</Container>
