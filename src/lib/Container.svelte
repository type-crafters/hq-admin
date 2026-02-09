<script lang="ts">
    import type { Snippet } from "svelte";

    interface ContainerProps {
        centered?: boolean
        children?: Snippet;
        class?: string;
        id?: string;
        maxWidth: string;
        scrollable?: boolean;
    }

    const { centered = false, children, class: className, id, maxWidth, scrollable = false }: ContainerProps = $props();
</script>

<section {id} class="w-full px-4 {scrollable ? "overflow-y-auto" : "overflow-y-hidden"} {maxWidth} {centered && "mx-auto"}">
    <div id="area:{id}" class="w-full {className}">
        {@render children?.()}
    </div>
</section>