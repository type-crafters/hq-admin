<script lang="ts">
    interface UserProfileProps {
        profilePictureUrl: string;
        firstName: string;
        lastName: string;
        email: string;
    }

    const { profilePictureUrl, firstName, lastName, email }: UserProfileProps = $props();
</script>

<a href="/users/me" class="w-full">
    <figure class="w-full flex p-4 gap-4 items-center hover:bg-zinc-700 duration-200 rounded-lg">
        <div class="size-16 rounded-full overflow-hidden">
            <img src={profilePictureUrl} alt={`${firstName} ${lastName}'s profile`} class="object-cover object-center">
        </div>
        <figcaption class="flex-1">
            <h2 class="text-xl font-semibold line-clamp-1">{firstName} {lastName}</h2>
            <p class="opacity-60 line-clamp-1">{email}</p>
        </figcaption>
    </figure>
</a>