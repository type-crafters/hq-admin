<script lang="ts">
    import Container from "$lib/Container.svelte";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
</script>

<Container maxW="5xl" class="my-8 space-y-8" centered>
    <div class="flex gap-4 items-center">
        <i class="bi bi-archive text-4xl"></i>
        <div class="space-y-2">
            <h2 class="text-3xl font-semibold">Ongoing Projects</h2>
            <p class="opacity-60">
                Manage the projects showcased on the team's landing page,
                including details, status, and media.
            </p>
        </div>
    </div>
    <div class="overflow-x-auto rounded-lg border border-zinc-700">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Project name</th>
                    <th>Description</th>
                    <th>Content</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                {#each data.items as project}
                    <tr>
                        <td>
                            <a href="/projects/{project.id}" class="hover:underline">
                                {project.id.split("-").at(-1)}
                            </a>
                        </td>
                        <td>
                            <p class="line-clamp-1 font-semibold">
                                {project.projectName}
                            </p>
                        </td>
                        <td>
                            <p class="line-clamp-1 max-w-70">
                                {project.description}
                            </p>
                        </td>
                        <td>
                            <div class="badge badge-sm bg-zinc-600 opacity-60 {!project.content && "opacity-60"}">
                                {project.content ? "..." : "Not set"}
                            </div>
                        </td>
                        <td>
                            <div class="badge badge-sm rounded-full {project.tags.length ? "badge-success" : "badge-ghost"}">
                                <p class="font-bold">
                                    {project.tags.length > 9 ? "9+" : project.tags.length}
                                </p>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Container>
