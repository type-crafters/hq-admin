<script lang="ts">
    import "$styles/index.css";
    import type { Snippet } from "svelte";
    import Header from "$lib/Header.svelte";

    interface IndexLayoutProps {
        children?: Snippet;
    }

    const { children }: IndexLayoutProps = $props();
</script>

<Header />
{@render children?.()}
