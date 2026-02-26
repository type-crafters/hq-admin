<script lang="ts">
    import UserProfile from "./UserProfile.svelte";
    interface SidebarProps {
        input: string;
    }

    const { input }: SidebarProps = $props();
</script>

<aside class="drawer-side">
    <label for={input} aria-label="close sidebar" class="drawer-overlay"></label>
    <nav class="min-h-full flex flex-col w-80 bg-zinc-800 shadow-md shadow-neutral-900">
        <UserProfile
            profilePictureUrl="/img/placeholder.svg"
            firstName="Diego"
            lastName="Chan"
            email="xdiego.chanx@gmail.com"
        />
        <ul class="menu rounded-box w-full flex-1">
            <li>
                <span>Team members</span>
                <ul>
                    <li>
                        <a href="/members">View all members</a>
                    </li>
                    <li>
                        <a href="/members/new">Add a member</a>
                    </li>
                </ul>
            </li>
            <li>
                <span>Projects</span>
                <ul>
                    <li>
                        <a href="/projects">View all projects</a>
                    </li>
                    <li>
                        <a href="/projects/new">Create a project</a>
                    </li>
                </ul>
            </li>
            <li>
                <span>Admin users</span>
                <ul>
                    <li>
                        <a href="/users">View all users</a>
                    </li>
                    <li>
                        <a href="/users/invite">Invite a user</a>
                    </li>
                </ul>
            </li>
            <li>
                <span>Messages</span>
                <ul>
                    <li>
                        <a href="/messages">View all messages</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</aside>