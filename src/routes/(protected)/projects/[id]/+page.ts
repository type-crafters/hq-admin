import { type Project, ProjectStatus } from "@typecrafters/hq-types";

export const load = async({ fetch, params }) => {
    return {
        id: "adddc487-dec2-4319-b6ec-78d9a024a31b",
        thumbnailUrl: "/img/placeholder.svg",
        projectName: "FateBound",
        description: "Join us on an epic adventure where you'll travel accross the world and use music, magic, and strength to save a living world that changes with your choices!",
        content: "Lorem ipsum dolor sit amet...",
        projectStatus: ProjectStatus.Planning,
        href: "https://google.com",
        tags: ["3D", "Fantasy", "Action/Adventure"],
        createdAt: new Date(),
        lastUpdatedAt: new Date()
    } satisfies Project;
    
    // const url = new URL(`/projects/${params.id}`, import.meta.env.VITE_API_URL!);
    // const response = await fetch(url, { method: "GET" });

    // if (response.ok) {
    //     const data: Project = await response.json();
    // }
};