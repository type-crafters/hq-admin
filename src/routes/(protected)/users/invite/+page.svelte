<script lang="ts">
    import { enhance } from "$app/forms";
    import { isstr } from "$util/isstr";
    import type { AlertData } from "$interface/AlertData";
    import Alert from "$lib/Alert.svelte";
    import Container from "$lib/Container.svelte";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { PageProps } from "./$types";
    import Modal from "$lib/Modal.svelte";
    let submitting: boolean = $state(false);

    let alert: Partial<AlertData> = $state({});
    let showAlert: boolean = $derived(Object.keys(alert).length > 0);

    let { form: modal }: PageProps = $props();
    let showModal: boolean = $derived(modal != null && Object.keys(modal).length > 0);

    let action: string = $state("create");
    let entity: string = $state("user");
    let permissions: string[] = $state([]);
    let permissionstr: string = $derived(JSON.stringify(permissions));

    const precheck: SubmitFunction = ({ formData, cancel }) => {
        submitting = true;

        if (!isstr(formData.get("firstName")?.valueOf())) {
            alert = { type: "error", message: "First name is required!" };
            cancel();
            submitting = false;
            return;
        }
        if (!isstr(formData.get("lastName")?.valueOf())) {
            alert = { type: "error", message: "Last name is required!" };
            cancel();
            submitting = false;
            return;
        }
        if (!isstr(formData.get("email")?.valueOf())) {
            alert = { type: "error", message: "Email is required!" };
            cancel();
            submitting = false;
            return;
        }

        return async ({ update }) => {
            await update();
            try {
                await update();
            } finally {
                alert = {};
                permissions = [];
                submitting = false;
                return;
            }
        };
    };

    const addPermission = () => {
        if (action && entity) {
            const permission = `${action}:${entity}`;
            if (!permissions.includes(permission)) {
                permissions = [...permissions, permission];
                action = "";
                entity = "";
            }
        }
    };

    const removePermission = (permission: string) => {
        permissions = permissions.filter((p) => p !== permission);
    };
</script>

<Modal title={modal?.title!} message={modal?.message!} buttonText={modal?.buttonText!} bind:show={showModal} />
<Container maxW="xl" class="my-8 space-y-8" centered>
    <div class="flex gap-4 items-center">
        <i class="bi bi-person-add text-4xl"></i>
        <div class="space-y-2">
            <h2 class="text-3xl font-semibold">Invite a user</h2>
            <p class="opacity-60">
                Invite new users to join HQ and assign their permissions.
            </p>
        </div>
    </div>
    <form
        method="POST"
        class="card w-full border border-zinc-600 bg-zinc-700/40 space-y-6 p-4"
        use:enhance={precheck}
    >
        <Alert
            type={alert.type!}
            message={alert.message!}
            bind:show={showAlert}
        />
        <div class="space-y-4">
            <fieldset class="fieldset">
                <legend class="text-sm fieldset-legend">First name</legend>
                <label
                    for="firstName"
                    class="input w-full bg-zinc-900 has-focus:outline-none has-focus:border-blue-500 duration-100"
                >
                    <i class="bi bi-person-circle opacity-60"></i>
                    <input
                        type="text"
                        name="firstName"
                        disabled={submitting}
                        id="firstName"
                        class="flex-1"
                        placeholder="John"
                    />
                </label>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="text-sm fieldset-legend">Last name</legend>
                <label
                    for="lastName"
                    class="input w-full bg-zinc-900 has-focus:outline-none has-focus:border-blue-500 duration-100"
                >
                    <i class="bi bi-person-circle opacity-60"></i>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        disabled={submitting}
                        class="flex-1"
                        placeholder="Doe"
                    />
                </label>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="text-sm fieldset-legend">Email address</legend>
                <label
                    for="email"
                    class="input w-full bg-zinc-900 has-focus:outline-none has-focus:border-blue-500 duration-100"
                >
                    <i class="bi bi-envelope opacity-60"></i>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        disabled={submitting}
                        class="flex-1"
                        placeholder="name@example.com"
                    />
                </label>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="text-sm fieldset-legend">Set permissions</legend>
                <div class="flex gap-4 items-center">
                    <div class="flex-1 flex gap-1 items-center">
                        <input
                            type="text"
                            name="permissions"
                            value={permissionstr}
                            class="hidden"
                        />
                        <select
                            disabled={submitting}
                            class="flex-1 select bg-zinc-900 focus:outline-none has-focus:outline-none focus:border-blue-500 has-focus:border-blue-500 duration-100"
                            bind:value={action}
                        >
                            <option value="create">create</option>
                            <option value="list">list</option>
                            <option value="update">update</option>
                            <option value="delete">delete</option>
                        </select>
                        <span>:</span>
                        <select
                            disabled={submitting}
                            class="flex-1 select bg-zinc-900 focus:outline-none has-focus:outline-none focus:border-blue-500 has-focus:border-blue-500 duration-100"
                            bind:value={entity}
                        >
                            <option value="user">user</option>
                            <option value="message">message</option>
                            <option value="member">member</option>
                            <option value="project">project</option>
                            <option value="post">post</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onclick={addPermission}
                        disabled={submitting}
                        class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 p-2 border border-blue-500 rounded"
                    >
                        <i class="bi bi-plus-lg"></i>
                        <span>Add</span>
                    </button>
                </div>
            </fieldset>
            <div class="space-y-1">
                <h3 class="text-sm fieldset-legend">Permission list</h3>
                {#if permissions.length}
                    {#each permissions as perm, i (perm)}
                        <div
                            class="w-full flex items-center p-1 gap-4 hover:bg-zinc-700 rounded duration-150"
                        >
                            <span class="text-xs opacity-60 font-bold">
                                {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <p class="flex-1 font-mono">{perm}</p>
                            <button
                                type="button"
                                onclick={() => removePermission(perm)}
                                class="text-xs text-red-600 uppercase hover:underline"
                                >Delete</button
                            >
                        </div>
                    {/each}
                {:else}
                    <p class="w-full text-center text-sm opacity-60">
                        No permissions set
                    </p>
                {/if}
            </div>
        </div>
        <input
            type="submit"
            value={submitting ? "Sending..." : "Send invitation"}
            disabled={submitting}
            class="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 py-1 rounded disabled:opacity-50"
        />
    </form>
</Container>
