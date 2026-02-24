<script lang="ts">
    import { ProjectStatus } from "@typecrafters/hq-types";
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";

    const statusColors: Map<ProjectStatus, string> = new Map([
        [ProjectStatus.Planning, "bg-sky-600"],
        [ProjectStatus.Development, "bg-teal-600"],
        [ProjectStatus.Testing, "bg-violet-500"],
        [ProjectStatus.EarlyAccess, "bg-yellow-600"],
        [ProjectStatus.Available, "bg-emerald-600"],
        [ProjectStatus.Paused, "bg-gray-600"],
        [ProjectStatus.Canceled, "bg-red-600/70"],
    ]);

    let { data }: PageProps = $props();

    // svelte-ignore state_referenced_locally
    let form = $state(structuredClone(data));

    let currentTag: string = $state("");
    let tags = $derived(new Set(form.tags));
    let taglist = $derived(JSON.stringify(form.tags));

    let status: ProjectStatus = $state(ProjectStatus.Planning);

    const addTag = (event?: Event) => {
        if (event) event.preventDefault();

        const value = currentTag.trim();
        if (!value) return;

        if (!form.tags.includes(value)) {
            form.tags = [...form.tags, value];
        }

        currentTag = "";
    };

    const removeTag = (name: string) => {
        form.tags = form.tags.filter((tag) => tag !== name);
    };

    // svelte-ignore state_referenced_locally
    let preview = $state(data.thumbnailUrl);

    const changeFile = (event: Event) => {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];
        if (preview && preview !== data.thumbnailUrl) {
            URL.revokeObjectURL(preview);
        }
        preview = URL.createObjectURL(file!);
    };
</script>

<Container
    id="project-details"
    maxWidth="max-w-xl"
    class="my-6 space-y-8"
    centered
>
    <div class="flex items-center gap-4">
        <i class="bi bi-archive text-4xl"></i>
        <div>
            <h2 class="font-semibold text-2xl">Project Details</h2>
            <p class="opacity-60">
                View and update information and media for this project.
            </p>
        </div>
    </div>
    <form
        method="POST"
        class="rounded-lg bg-zinc-700/20 border border-zinc-600 py-4 space-y-8"
    >
        <fieldset class="space-y-2">
            <legend
                class="px-4 w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
            >
                <i class="bi bi-image"></i>
                <span>Project thumbnail</span>
            </legend>
            <label for="thumbnail" class="flex flex-col gap-2">
                <div class="tooltip" data-tip="Click to pick a new image...">
                    <figure
                        class="w-full aspect-5/2 bg-neutral-900 overflow-hidden hover:scale-y-102 hover:brightness-70 cursor-pointer duration-150"
                    >
                        <img
                            src={preview}
                            class="object-cover object-center"
                            alt="Project thumbnail"
                        />
                    </figure>
                </div>
                <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    class="hidden"
                    accept="image/*"
                    onchange={changeFile}
                />
            </label>
        </fieldset>
        <div class="px-4 space-y-8">
            <fieldset class="space-y-4">
                <legend
                    class="w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
                >
                    <i class="bi bi-file-earmark-text"></i>
                    <span>Basic information</span>
                </legend>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <label
                            for="projectName"
                            class="block font-semibold opacity-80 text-sm"
                            >Project name</label
                        >
                        <div
                            class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                        >
                            <i class="bi bi-alphabet text-lg opacity-60"></i>
                            <input
                                type="text"
                                name="projectName"
                                id="projectName"
                                bind:value={form.projectName}
                                class="flex-1 focus:outline-none"
                                placeholder="Nuclear Launch Codes"
                            />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label
                            for="description"
                            class="block font-semibold opacity-80 text-sm"
                        >
                            Description
                        </label>
                        <div
                            class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                        >
                            <i class="bi bi-text-left text-lg opacity-60"></i>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                bind:value={form.description}
                                class="flex-1 focus:outline-none"
                                placeholder="Briefly describe the project..."
                            />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label
                            for="content"
                            class="block font-semibold opacity-80 text-sm"
                        >
                            Content
                        </label>
                        <textarea
                            rows={5}
                            name="content"
                            id="content"
                            bind:value={form.content}
                            class="w-full rounded border border-zinc-600 resize-y focus:outline-none focus:ring-2 ring-blue-500 duration-150 p-2"
                            placeholder="Lorem ipsum..."
                        ></textarea>
                    </div>
                    <div class="space-y-2">
                        <label
                            for="description"
                            class="block font-semibold opacity-80 text-sm"
                        >
                            Project status
                        </label>
                        <div class="flex gap-4 items-center">
                            <select
                                bind:value={form.projectStatus}
                                name="projectStatus"
                                id="projectStatus"
                                class="flex-1 appearance-base-select picker:appearance-base-select picker:my-1 picker:border picker:border-zinc-600 picker:rounded border border-zinc-600 has-focus:ring-2 ring-blue-500 rounded p-2 picker-icon:scale-x-80 picker-icon:scale-y-60 picker-icon:opacity-40 open:picker-icon:rotate-180 picker-icon:duration-300 cursor-pointer"
                            >
                                <button type="button">
                                    <selectedcontent
                                        class="font-mono flex items-center gap-2"
                                    ></selectedcontent>
                                </button>
                                {#each Object.entries(ProjectStatus) as [name, value]}
                                    <option
                                        class="font-mono px-4 py-2 hover:bg-zinc-700 duration-150 checkmark:hidden"
                                        {value}>{name}</option
                                    >
                                {/each}
                            </select>
                            <div class="flex-1">
                                <div
                                    class="badge badge-sm rounded-full {statusColors.get(
                                        status,
                                    )}"
                                >
                                    {status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset class="space-y-4">
                <legend
                    class="w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
                >
                    <i class="bi bi-link-45deg"></i>
                    <span>External references</span>
                </legend>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <label
                            for="href"
                            class="block font-semibold opacity-80 text-sm"
                        >
                            Project URL
                        </label>
                        <div
                            class="flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                        >
                            <i class="bi bi-box-arrow-up-right opacity-60"></i>
                            <input
                                type="text"
                                name="href"
                                id="href"
                                bind:value={form.href}
                                class="flex-1 focus:outline-none"
                                placeholder="Briefly describe the project..."
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
            <fieldset class="space-y-4">
                <legend
                    class="w-full flex items-center gap-2 text-sm font-semibold opacity-60 uppercase"
                >
                    <i class="bi bi-tag"></i>
                    <span>tags</span>
                </legend>
                <div class="flex gap-2 items-center">
                    <div
                        class="flex-1 flex items-center p-2 gap-2 border border-zinc-600 rounded has-focus:ring-2 ring-blue-500 duration-150"
                    >
                        <input
                            type="text"
                            name="tags"
                            id="tags"
                            value={taglist}
                            class="hidden"
                        />
                        <input
                            type="text"
                            id="href"
                            bind:value={currentTag}
                            onkeydown={(e) => e.key === "Enter" && addTag(e)}
                            class="flex-1 focus:outline-none"
                            placeholder="Type a tag name..."
                        />
                    </div>
                    <button
                        type="button"
                        class="flex p-2 gap-2 items-center rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
                        onclick={addTag}
                    >
                        <i class="bi bi-plus-lg"></i>
                        <span>Add</span>
                    </button>
                </div>
                <div class="flex gap-2 flex-wrap">
                    {#each tags as tag (tag)}
                        <div class="badge bg-zinc-700 gap-2 px-2">
                            <span>{tag}</span>
                            <button
                                type="button"
                                aria-label="remove tag"
                                class="cursor-pointer"
                                onclick={() => removeTag(tag)}
                            >
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    {/each}
                </div>
            </fieldset>
            <div class="space-y-4">
                <input
                    type="submit"
                    value="Save changes"
                    class="w-full rounded py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 duration-150 cursor-pointer"
                />
                <input
                    type="reset"
                    onclick={(e) => {
                        e.preventDefault();
                        form = structuredClone(data);
                        currentTag = "";
                    }}
                    value="Discard changes"
                    class="w-full rounded py-2 bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-500 duration-150 cursor-pointer"
                />
            </div>
        </div>
    </form>
</Container>
