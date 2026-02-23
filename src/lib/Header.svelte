<script lang="ts">
  import Logo from "./Logo.svelte";

  interface SidebarProps {
    input: string;
  }

  const { input }: SidebarProps = $props();
</script>

<header class="navbar bg-zinc-800 shadow-sm gap-4 px-6">
  <div class="flex lg:hidden">
    <label for={input} aria-label="open sidebar">
      <i class="bi bi-list text-2xl"></i>
    </label>
  </div>
  <div class="flex-1">
    <Logo />
  </div>
  <div>
    <label class="toggle">
      <input type="checkbox" class="theme-controller" />
      <i class="bi bi-sun text-sm"></i>
      <i class="bi bi-moon text-xs"></i>
    </label>
  </div>
</header>
