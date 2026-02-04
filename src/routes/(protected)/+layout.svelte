<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Sidebar from "$lib/Sidebar.svelte";
    import type { Snippet } from "svelte";

    interface ProtectedProps {
        children?: Snippet;
    }

    const { children }: ProtectedProps = $props();
</script>

<div class="w-full h-full flex">
    <Sidebar />
    <div class="flex-1">
        <div class="flex w-full h-full flex-col">
            <Header />
            <main class="w-full flex-1 p-4">
                {@render children?.()}
            </main>
        </div>
    </div>
</div>
