<script lang="ts">
    import type { Snippet } from "svelte";

    interface ContainerProps {
        maxW?: string;
        id?: string;
        class?: string;
        centered?: boolean;
        children?: Snippet;
    }

    let {
        maxW = "container",
        id,
        class: className,
        centered,
        children,
    }: ContainerProps = $props();

    const containerSizes: Record<string, string> = {
        "3xs": "max-w-3xs",
        "2xs": "max-w-2xs",
        "xs": "max-w-xs",
        "sm": "max-w-sm",
        "md": "max-w-md",
        "lg": "max-w-lg",
        "xl": "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        "container": "container",
        "full": "max-w-full",
    } as const;

</script>

<section
    {id}
    class="w-full px-4 py-2 {containerSizes[maxW]} {centered && 'mx-auto'}"
>
    <div id="area:{id}" class="w-full {className}">
        {@render children?.()}
    </div>
</section>
