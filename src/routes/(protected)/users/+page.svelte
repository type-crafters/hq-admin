<script lang="ts">
    import { ColorScheme } from "$common/enum/ColorScheme";
    import { UserStatus } from "$common/enum/UserStatus";
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";
    let search: string = $state("");

    const statusStyles: Map<UserStatus, string> = new Map([
        [UserStatus.Unverified, "badge-warning"],
        [UserStatus.Pending, "badge-info"],
        [UserStatus.Active, "badge-success"],
        [UserStatus.Deleted, "badge-error"]
    ]);

    const themeIcons: Map<ColorScheme, string> = new Map([
        [ColorScheme.Light, "bi-sun"],
        [ColorScheme.Dark, "bi-moon"],
        [ColorScheme.System, "bi-display"]
    ]);

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
                    autocomplete="off"
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
                <div class="overflow-auto rounded-box border border-zinc-700">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>Theme</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.rows as user}
                                <tr>
                                    <td>
                                        <a href="/users/{user.id}" class="text-xs opacity-60 line-clamp-1 hover:underline">
                                            UUID:{user.id.split("-").at(-1)}
                                        </a>
                                    </td>
                                    <td>
                                        <div class="w-full flex gap-2 items-center">
                                            <div class="avatar">
                                                <div class="size-8 rounded-full">
                                                    <img src={user.pfpSrc} alt="{user.name}'s profile">
                                                </div>
                                            </div>
                                            <span class="font-semibold line-clamp-1">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="opacity-60 line-clamp-1">{user.email}</span>
                                    </td>
                                    <td>
                                        <div class="badge badge-sm rounded-full badge-outline {user.password ? "badge-info" : "badge-warning"}">
                                            {user.password ? "set" : "unset"}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="badge badge-sm rounded-full badge-outline {statusStyles.get(user.status)}">
                                            {user.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="flex items-center gap-2 opacity-60">
                                            <i class="bi {themeIcons.get(user.theme)} text-sm"></i>
                                            <span>{user.theme}</span>
                                        </div>
                                    </td> 
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
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
