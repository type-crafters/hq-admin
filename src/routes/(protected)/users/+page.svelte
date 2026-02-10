<script lang="ts">
    import { ColorScheme } from "$common/enum/ColorScheme";
    import { UserStatus } from "$common/enum/UserStatus";
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";
    let search: string = $state("");

    const statusStyles: Record<UserStatus, string> = {
        [UserStatus.Unverified]: "text-yellow-700 border-yellow-700",
        [UserStatus.Pending]: "text-slate-700 border-slate-700",
        [UserStatus.Active]: "text-green-700 border-green-700",
        [UserStatus.Deleted]: "text-green-700 border-green-700",
    };

    const themeIcons: Record<ColorScheme, string> = {
        [ColorScheme.Light]: "bi-sun",
        [ColorScheme.Dark]: "bi-moon",
        [ColorScheme.System]: "bi-display",
    };

    let { data }: PageProps = $props();

</script>

<Container maxWidth="max-w-5xl" class="space-y-8 my-8" centered>
    <div class="flex items-center gap-4">
        <i class="bi bi-person-square text-4xl"></i>
        <div>
            <h2 class="font-semibold text-2xl">Admin Users</h2>
            <p class="opacity-60">
                Manage and view all registered admin users on the platform.
            </p>
        </div>
    </div>
    <div>
        <div class="space-y-4">
            <div
                class="group flex items-center p-2 gap-3 rounded border border-zinc-600 w-full max-w-sm has-focus:ring-2 ring-blue-500 duration-150"
            >
                <i class="bi bi-search text-lg opacity-60"></i>
                <input
                    type="text"
                    name="searchUsers"
                    id="searchUsers"
                    placeholder="Search users by name..."
                    class="min-w-0 flex-1 focus:outline-none"
                    bind:value={search}
                />
                {#if search}
                    <button
                        class="cursor-pointer"
                        aria-label="Clear search box"
                        onclick={() => (search = "")}
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                {/if}
            </div>
            <div>
                <table class="w-full border-separate border-spacing-0 rounded-lg border border-zinc-600">
                    <thead>
                        <tr class="group first:border-b border-zinc-600 text-left *:p-2">
                            <th class="group-first:border-b border-zinc-600">ID</th>
                            <th class="group-first:border-b border-zinc-600">User</th>
                            <th class="group-first:border-b border-zinc-600">Email</th>
                            <th class="group-first:border-b border-zinc-600">Password</th>
                            <th class="group-first:border-b border-zinc-600">Status</th>
                            <th class="group-first:border-b border-zinc-600">Theme</th>
                            <th class="group-first:border-b border-zinc-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.rows as user}
                            <tr class="group not-last:border-b border-zinc-600 *:not-last:p-2 hover:bg-zinc-700 duration-150">
                                <td class="group-not-last:border-b border-zinc-600">
                                    <span class="text-xs opacity-60 line-clamp-1">
                                        UUID:{user.id.split("-").at(-1)}
                                    </span>
                                </td>
                                <td class="group-not-last:border-b border-zinc-600">
                                    <div class="w-full flex gap-2 items-center">
                                        <figure class="size-8 rounded-full bg-zinc-700 overflow-hidden">
                                            <img src={user.pfpSrc} alt="{user.name}'s profile" class="object-cover object-center"/>
                                        </figure>
                                        <span class="font-semibold line-clamp-1">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>
                                <td class="group-not-last:border-b border-zinc-600">
                                    <span class="opacity-60 line-clamp-1">{user.email}</span>
                                </td>
                                <td class="group-not-last:border-b border-zinc-600">
                                    <span class="rounded-full px-2 py-1 text-xs border font-semibold {user.password
                                        ? 'border-sky-700 text-sky-700'
                                        : 'border-slate-700 text-slate-700'}"
                                    >
                                        {user.password ? "set" : "unset"}
                                    </span>
                                </td>
                                <td class="group-not-last:border-b border-zinc-600">
                                    <span class="rounded-full px-2 py-1 text-xs border font-semibold {statusStyles[user. status]}">
                                        {user.status}
                                    </span>
                                </td>
                                <td class="group-not-last:border-b border-zinc-600">
                                    <div class="flex items-center gap-2 opacity-60">
                                        <i class="bi {themeIcons[user.theme]} text-sm"></i>
                                        <span>{user.theme}</span>
                                    </div>
                                </td>
                                <td class="">
                                    <div class="relative group">
                                        <label class="flex w-fit p-1 rounded cursor-pointer hover:bg-zinc-800/75 duration-150">
                                            <i class="bi bi-three-dots-vertical"></i>
                                            <input id="showOptions" type="checkbox" class="hidden">
                                        </label>
                                        <div class="hidden group-has-checked:block absolute right-0 -translate-x-4 -ml-4 z-5 w-max max-w-50 *:first:pt-2 *:last:pb-2 bg-zinc-800 space-y-2 border border-zinc-600 rounded shadow-md">
                                            <h4 class="px-4 font-semibold">Actions</h4>
                                            <hr class="border-zinc-600">
                                            <ul class="*:py-2 *:px-4 border-zinc-600">
                                                <li class="hover:bg-zinc-700 duration-150 cursor-pointer">
                                                    <a href="/users/{user.id}">View details</a>
                                                </li>
                                                <li class="hover:bg-zinc-700 duration-150 text-red-700 cursor-pointer">
                                                    <span>Delete user</span>
                                                </li> <!-- @todo implement -->
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <span class="opacity-60"> Showing 1-10 of 30 </span>
                </div>
                <div class="flex items-center gap-4">
                    <button
                        type="button"
                        class="rounded border border-zinc-600 flex items-center gap-2 p-2 hover:bg-zinc-700 duration-150 cursor-pointer"
                    >
                        <i class="bi bi-chevron-left text-xs"></i>
                        <span>Previous</span>
                    </button>
                    <button
                        type="button"
                        class="rounded border border-zinc-600 flex items-center gap-2 p-2 hover:bg-zinc-700 duration-150 cursor-pointer"
                    >
                        <span>Next</span>
                        <i class="bi bi-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</Container>
