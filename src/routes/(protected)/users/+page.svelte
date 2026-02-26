<script lang="ts">
    import { userColors } from "$common/util/userColors";
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";
    const { data }: PageProps = $props();
</script>

<Container maxW="5xl" class="my-8 space-y-8" centered>
    <div class="flex gap-4 items-center">
        <i class="bi bi-person-badge text-4xl"></i>
        <div class="space-y-2">
            <h2 class="text-3xl font-semibold">Admin Users</h2>
            <p class="opacity-60">
                Manage administrator accounts and permissions across the system.
            </p>
        </div>
    </div>
    <div class="overflow-x-auto rounded-lg border border-zinc-700">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Permissions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.items as user (user.id)}
                    <tr>
                        <td>
                            <a href="/users/{user.id}" class="hover:underline">
                                {user.id.split("-").at(-1)}
                            </a>
                        </td>
                        <td>
                            <div class="flex gap-2 items-center">
                                <div class="avatar">
                                    <div class="size-8 rounded-full">
                                        <img
                                            src={user.profilePictureUrl} 
                                            alt="{user.firstName} {user.lastName}'s profile."
                                        />
                                    </div>
                                </div>
                                <p class="font-semibold line-clamp-1">{user.firstName} {user.lastName}</p>
                            </div>
                        </td>
                        <td>
                            <p class="line-clamp-1">
                                {user.email}
                            </p>
                        </td>
                        <td>
                            <div class="badge badge-sm badge-outline rounded-full {user.password ? "badge-info" : "badge-error"}">
                                {user.password ? "set" : "unset"}
                            </div>
                        </td>
                        <td>
                            <div class="badge badge-sm badge-outline rounded-full {userColors[user.status]}">
                                {user.status}
                            </div>
                        </td>
                        <td>
                            <div class="badge badge-sm rounded-full {user.permissions.length ? "badge-success" : "badge-ghost"}">
                                <p class="font-bold">
                                    {user.permissions.length > 9 ? "9+" : user.permissions.length}
                                </p>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Container>
