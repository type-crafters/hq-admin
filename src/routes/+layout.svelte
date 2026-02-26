<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "bootstrap-icons/font/bootstrap-icons.min.css";
	import "$styles/index.css";
	import type { Snippet } from "svelte";
	interface IndexLayoutProps {
		children?: Snippet;
	}

	let { children }: IndexLayoutProps = $props();
</script>

<svelte:head>
	<title>Admin Panel | TypeCrafters HQ</title>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children?.()}

