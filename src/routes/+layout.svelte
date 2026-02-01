<script lang="ts">
    import "$styles/index.css";
    import "bootstrap-icons/font/bootstrap-icons.min.css";
    import type { Snippet } from "svelte";

    interface IndexLayoutProps {
        children?: Snippet;
    }

    const { children }: IndexLayoutProps = $props();
</script>

{@render children?.()}
