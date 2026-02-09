<script lang="ts">
    import UserProfile from "./UserProfile.svelte";
</script>

<aside
    class="sticky top-0 w-80 h-screen bg-zinc-800 shadow-md shadow-neutral-900"
>
    <UserProfile
        profilePictureUrl="/img/placeholder.svg"
        firstName="Diego"
        lastName="Chan"
        email="xdiego.chanx@gmail.com"
    />
    <nav class="p-4">
        <ul>
            <li class="text-sm font-semibold uppercase opacity-80">
                Team members
            </li>
            <li class="my-4 *:ml-1 *:border-l *:border-zinc-600">
                <ul class="space-y-1">
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/members">View all members</a>
                    </li>
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/members/new">Add a member</a>
                    </li>
                </ul>
            </li>
            <li class="text-sm font-semibold uppercase opacity-80">Projects</li>
            <li class="my-4 *:ml-1 *:border-l *:border-zinc-600">
                <ul class="space-y-1">
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/projects">View all projects</a>
                    </li>
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/projects/new">Create a project</a>
                    </li>
                </ul>
            </li>
            <li class="text-sm font-semibold uppercase opacity-80">Admin users</li>
            <li class="my-4 *:ml-1 *:border-l *:border-zinc-600">
                <ul class="space-y-1">
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/users">View all users</a>
                    </li>
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/users/new">Invite a user</a>
                    </li>
                </ul>
            </li>
            <li class="text-sm font-semibold uppercase opacity-80">Messages</li>
            <li class="my-4 *:ml-1 *:border-l *:border-zinc-600">
                <ul class="space-y-1">
                    <li class="hover:bg-zinc-700 duration-200 px-4 py-1">
                        <a href="/messages">View all messages</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</aside>
