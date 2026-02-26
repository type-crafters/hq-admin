<script lang="ts">
    import type { AlertData } from "$common/interface/AlertData";
    import type { AlertType } from "$util/AlertType";
    import { fade } from "svelte/transition";

    const alertColors: Record<AlertType, string> = {
        success: "alert-success",
        info: "alert-info",
        warning: "alert-warning",
        error: "alert-error",
    };

    const alertIcons: Record<AlertType, string> = {
        success: "bi-check-lg",
        info: "bi-info",
        warning: "bi-warning",
        error: "bi-exclamation",
    };

    let {
        type,
        message,
        show = $bindable(),
    }: AlertData & { show: boolean } = $props();
</script>

{#if show}
    <div
        in:fade={{ duration: 150 }}
        out:fade={{ duration: 150 }}
        class="alert absolute top-4 right-4 py-0 px-1 w-max max-w-100 {alertColors[type]}"
    >
        <div class="flex gap-1 justify-self-stretch self-stretch">
            <i class="bi {alertIcons[type]}"></i>
            <p>{message}</p>
        </div>
        <button type="button" aria-label="close alert" onclick={() => (show = false)}>
            <i class="bi bi-x"></i>
        </button>
    </div>
{/if}
