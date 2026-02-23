<script lang="ts">
    interface UserProfileProps {
        profilePictureUrl?: string;
        firstName: string;
        lastName: string;
        email: string;
    }

    const { profilePictureUrl, firstName, lastName, email }: UserProfileProps =
        $props();

    const initials: string = $derived(
        (firstName.charAt(0) + lastName.charAt(0)).toUpperCase(),
    );
</script>

<a href="/users/me" class="flex gap-4 p-4 items-center hover:bg-zinc-700 duration-200 rounded-lg">
    <div class="avatar {!profilePictureUrl && 'avatar-placeholder'}">
        <div class="size-16 bg-gray-900 rounded-full">
            {#if profilePictureUrl}
                <img
                    src={profilePictureUrl}
                    alt="{firstName} {lastName}'s profile"
                />
            {:else}
                <span class="text-xl text-sky-200">{initials}</span>
            {/if}
        </div>
    </div>
    <div class="flex-1 space-y-1">
            <h2 class="text-xl font-semibold line-clamp-1">{firstName} {lastName}</h2>
            <p class="text-sm opacity-60 line-clamp-1">{email}</p>
    </div>
</a>
