<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Sidebar from "$lib/Sidebar.svelte";
    import type { Snippet } from "svelte";

    const sidebarToggle = "sidebar-toggle";

    interface ProtectedProps {
        children?: Snippet;
    }

    const { children }: ProtectedProps = $props();
</script>

<div class="drawer lg:drawer-open">
    <input id={sidebarToggle} type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col h-full items-center">
        <Header input={sidebarToggle} />
        <main class="w-full flex-1 p-4">
            {@render children?.()}
        </main>
    </div>
    <Sidebar input={sidebarToggle} />
</div>
