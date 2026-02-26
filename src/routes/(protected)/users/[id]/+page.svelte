<script lang="ts">
    import Container from "$lib/Container.svelte";
    import { ColorScheme, type SimpleUser } from "@typecrafters/hq-types";
    import type { PageProps } from "./$types";
    import { datetimeF } from "$util/DateFormats";
    import { userColors } from "$util/userColors";
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import type { AlertData } from "$interface/AlertData";
    import { isstr } from "$util/isstr";
    import Alert from "$lib/Alert.svelte";
    import type { ModalData } from "$common/interface/ModalData";
    import Modal from "$lib/Modal.svelte";

    let submitting: boolean = $state(false);

    let alert: Partial<AlertData> = $state({});
    let showAlert: boolean = $derived(Object.keys(alert).length > 0);

    let { form: modal, data: user }: PageProps = $props();
    let showModal: boolean = $derived(
        modal != null && Object.keys(modal).length > 0,
    );

    let deleteUser: HTMLFormElement;

    // svelte-ignore state_referenced_locally
    let form: SimpleUser = $state(structuredClone(user));

    let copyTitle: string = $state("Copy ID");

    // svelte-ignore state_referenced_locally
    let picture: string = $state(form.profilePictureUrl);

    const showDeleteConfirmation = () => {
        modal = {
            title: "Confirm Action",
            message:
                "Are you sure you want to delete this user? This action can't be undone",
            buttonText: "Delete",
            buttonAction: () => {
                if (deleteUser) deleteUser.submit();
            }
        } satisfies ModalData;
    };

    const changePicture = (event: Event) => {
        const input = event.currentTarget as HTMLInputElement;

        const file = input.files?.[0];

        if (file) {
            const url = URL.createObjectURL(file);
            if (picture && picture !== form.profilePictureUrl) {
                URL.revokeObjectURL(picture);
            }
            picture = url;
        }
    };

    const copyId = () => {
        navigator.clipboard.writeText(form.id);
        copyTitle = "Copied!";
        setTimeout(() => (copyTitle = "Copy ID"), 3000);
    };

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

        if (!isstr(formData.get("preferredTheme")?.valueOf())) {
            alert = { type: "error", message: "Preferred theme is required!" };
            cancel();
            submitting = false;
            return;
        }

        return async ({ update }) => {
            await update();
            try {
                await update();
            } finally {
                submitting = false;
                return;
            }
        };
    };
</script>

<Modal
    title={modal?.title!}
    message={modal?.message!}
    buttonText={modal?.buttonText!}
    buttonAction={modal?.buttonAction}
    bind:show={showModal}
/>
<Container maxW="xl" class="my-8 space-y-8" centered>
    <div class="flex gap-4 items-center">
        <i class="bi bi-person-gear text-4xl"></i>
        <div class="space-y-2">
            <h2 class="text-3xl font-semibold">User Details</h2>
            <p class="opacity-60">
                Edit or delete this user's personal information.
            </p>
        </div>
    </div>
    <div class="space-y-2">
        <form method="POST" action="?/delete" bind:this={deleteUser} class="hidden" use:enhance></form>
        <form
            method="POST"
            action="?/patch"
            enctype="multipart/form-data"
            class="card w-full border border-zinc-600 bg-zinc-700/40 space-y-6 p-4"
            onreset={(e) => {
                e.preventDefault();
                form = structuredClone(user);
                picture = form.profilePictureUrl;
            }}
            use:enhance={precheck}
        >
            <Alert
                type={alert.type!}
                message={alert.message!}
                bind:show={showAlert}
            />
            <fieldset class="fieldset justify-items-center">
                <legend class="text-sm text-center fieldset-legend"
                    >Profile picture</legend
                >
                <div
                    class="tooltip tooltip-bottom"
                    data-tip="Click to choose a new picture..."
                >
                    <label
                        for="profilePicture"
                        class="avatar hover:brightness-70 cursor-pointer duration-150"
                    >
                        <div class="w-24 rounded-full">
                            <img
                                src={picture}
                                alt="{user.firstName} {user.lastName}'s profile"
                            />
                        </div>
                        <input
                            type="file"
                            onchange={changePicture}
                            name="profilePicture"
                            id="profilePicture"
                            class="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>
            </fieldset>
            <div class="w-full flex justify-center items-center gap-4 text-sm">
                <div class="flex items-center gap-2">
                    <span class="font-bold opacity-60">ID:</span>
                    <span class="rounded px-1 bg-zinc-600">{user.id}</span>
                </div>
                <div class="tooltip tooltip-right" data-tip={copyTitle}>
                    <button type="button" aria-label="Copy ID" onclick={copyId}>
                        <i class="bi bi-copy text-xs"></i>
                    </button>
                </div>
            </div>
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
                            id="firstName"
                            disabled={submitting}
                            bind:value={form.firstName}
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
                            bind:value={form.lastName}
                            class="flex-1"
                            placeholder="Doe"
                        />
                    </label>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="text-sm fieldset-legend">
                        Email address
                    </legend>
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
                            bind:value={form.email}
                            class="flex-1"
                            placeholder="name@example.com"
                        />
                    </label>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="text-sm fieldset-legend">Password</legend>
                    <div class="input w-full bg-zinc-800">
                        <div
                            class="status {user.password
                                ? 'status-success'
                                : 'status-error'}"
                        ></div>
                        <span>Password is {user.password ? "" : "not"} set</span
                        >
                    </div>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="text-sm fieldset-legend">User status</legend>
                    <div class="flex gap-4 items-center">
                        <div class="input flex-1 bg-zinc-800">
                            {user.status}
                        </div>
                        <div class="flex-1">
                            <div
                                class="badge badge-sm badge-outline rounded-full {userColors[
                                    user.status
                                ]}"
                            >
                                {user.status}
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="text-sm fieldset-legend">
                        Preferred theme
                    </legend>
                    <select
                        disabled={submitting}
                        name="preferredTheme"
                        id="preferredTheme"
                        bind:value={form.preferredTheme}
                        class="w-full select bg-zinc-900 focus:outline-none has-focus:outline-none focus:border-blue-500 has-focus:border-blue-500 duration-100"
                    >
                        {#each Object.entries(ColorScheme) as [key, value]}
                            <option {value}>{key}</option>
                        {/each}
                    </select>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="text-sm fieldset-legend">Created at</legend>
                    <div class="input w-full bg-zinc-800">
                        <time
                            datetime={new Date(user.createdAt!).toISOString()}
                        >
                            {datetimeF.format(new Date(user.createdAt!))}
                        </time>
                    </div>
                </fieldset>
            </div>
            <div class="space-y-4">
                <input
                    type="submit"
                    value="Save changes"
                    class="block w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 rounded duration-150"
                />
                <input
                    type="reset"
                    value="Discard changes"
                    class="block w-full py-2 bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-500 rounded duration-150"
                />
            </div>
        </form>
    </div>
    <div class="space-y-4">
        <h3 class="text-red-400 font-semibold">Danger zone</h3>

        <button
            type="button"
            onclick={showDeleteConfirmation}
            class="w-full py-2 bg-red-800 hover:bg-red-900 rounded duration-150"
        >
            Delete user
        </button>
    </div>
</Container>
