<script lang="ts">
    import "$styles/index.css";
    import "bootstrap-icons/font/bootstrap-icons.min.css";
    import type { Snippet } from "svelte";

    interface IndexLayoutProps {
        children?: Snippet;
    }

    const { children }: IndexLayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <title>HQ Admin</title>
</svelte:head>

{@render children?.()}
