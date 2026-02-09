<script lang="ts">
    const url = new URL(import.meta.env.VITE_API_URL!);
    url.pathname = "/auth/logout";

    let hovering = $state(false);
</script>

<form method="POST" class="contents">
    <button
        type="submit"
        onmouseenter={() => (hovering = true)}
        onmouseleave={() => (hovering = false)}
        title="Log out"
        class="cursor-pointer"
    >
        <i class={[
            "bi",
            hovering ? "bi-door-open" : "bi-door-closed",
            "text-2xl p-2"
        ]}></i>
    </button>
</form>

