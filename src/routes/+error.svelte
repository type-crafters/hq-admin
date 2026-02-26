<script lang="ts">
    import { page } from "$app/state";
</script>

<main class="w-screen h-screen flex flex-col gap-8 justify-center items-center">
    <div class="flex gap-4 items-center">
        <h1 class="text-6xl font-bold">{page.status}</h1>
        <div class="divider divider-horizontal"></div>
        <p class="opacity-60 text-2xl uppercase font-bold">{page.error?.message}</p>
    </div>
    <p class="text-xl">
        Go to 
        <a href="/dashboard" class="text-blue-500 hover:underline">
            dashboard
        </a>
    </p>
</main>