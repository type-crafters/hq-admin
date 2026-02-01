<script lang="ts">
    import Header from "$lib/Header.svelte";
    import type { Snippet } from "svelte";
    interface AdminLayerProps {
        children?: Snippet;
    }  
    const { children }: AdminLayerProps = $props();
</script>

<Header/>
{@render children?.()}  