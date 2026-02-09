<script lang="ts">
    import type { Snippet } from "svelte";

    let open: boolean = $state(false);

    interface TooltipProps {
        children?: Snippet;
        hover?: boolean;
    }

    const { children }: TooltipProps = $props();
</script>

<div
    role="presentation"
    class="relative"
    onmouseenter={() => open = true}
    onmouseleave={() => open = false}
>
    <i class="bi bi-info-circle text-xs px-1 text-blue-500 cursor-pointer"></i>
    <div
        role="tooltip"
        class="bottom-0 left-0 translate-x-6 -translate-y-3 w-max max-w-xs absolute bg-zinc-700 px-3 py-2 rounded shadow-sm shadow-black delay-150 duration-300 {open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}"
    >
        {@render children?.()}
    </div>
</div>
