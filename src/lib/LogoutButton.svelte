<script lang="ts">
    const url = new URL(import.meta.env.VITE_API_URL!);
    url.pathname = "/auth/logout";

    let hovering = $state(false);
</script>

<a
    onmouseenter={() => hovering = true}
    onmouseleave={() => hovering = false}
    href={url.toString()}
    class="relative"
    title="Log out"
>
    <i class={["bi", hovering ? "bi-door-open" : "bi-door-closed", "text-2xl p-2"]}></i>
</a>
