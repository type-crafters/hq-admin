<script lang="ts">
    import type { ModalData } from "$interface/ModalData";
    import { cubicIn, cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    let {
        title,
        message,
        buttonText,
        show = $bindable(),
        buttonAction
    }: ModalData & {
        show: boolean;
    } = $props();
</script>

{#if show}
    <div
        id="modal-overlay"
        role="button"
        tabindex="0"
        onclick={() => (show = false)}
        onkeydown={(e) => [" ", "Enter"].includes(e.key) && (show = false)}
        in:fade={{ duration: 300 }}
        out:fade={{ duration: 300 }}
        class="fixed w-screen h-screen flex justify-center items-center inset-0 z-50 bg-black/30 backdrop-blur-xs"
    >
        <div class="w-full h-full flex justify-center items-center">
            <div
                in:fly={{ y: "-100%", duration: 300, easing: cubicOut }}
                out:fly={{ y: "-100%", duration: 300, easing: cubicIn }}
                role="dialog"
                onclick={(e) => e.stopPropagation()}
                tabindex="0"
                onkeydown={(e) => e.stopPropagation()}
                class="bg-zinc-600 w-full max-w-xl p-4 flex flex-col justify-between gap-16 items-center"
            >
                <h2 class="text-center text-2xl font-semibold">{title}</h2>
                <p class="text-center">{message}</p>
                <button
                    type="button"
                    onclick={(e) => {
                        if (buttonAction) buttonAction(e);
                        show = false;
                    }}
                    class="w-fit px-12 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
{/if}
