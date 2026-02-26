import { API_URL, NODE_ENV } from '$env/static/private'
import { ProjectStatus, type Project } from '@typecrafters/hq-types';

export const load = async ({ fetch }) => {
    if (NODE_ENV === "production") {
        const url = new URL("/projects", API_URL);
        const response = await fetch(url, { method: "GET" });

        if (response.ok) {
            const { items } = await response.json();
            return { items };
        }
    } else {
        return {
            items: [
                {
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
                } satisfies Project
            ]
        }
    }
}

/**
 * 
 * import { NODE_ENV, API_URL } from "$env/static/private";
 import { ColorScheme, UserStatus, type ListUserResponse, type SimpleUser } from "@typecrafters/hq-types";
 
 export const load = async ({ fetch }) => {
     if (NODE_ENV === "production") {
         const url = new URL("/users", API_URL);
         const response = await fetch(url, { method: "GET" });
 
         if (response.ok) {
             const { items }: ListUserResponse = await response.json();
             return { items };
         }
     } else {
         return {
             items: [
                 {
                     id: "babbdebc-0b7e-4935-a474-c2bea0b1c01d",
                     firstName: "John",
                     lastName: "Doe",
                     email: "name@example.com",
                     password: true,
                     permissions: ["create:user", "list:user", "update:user", "delete:user"],
                     status: UserStatus.Unverified,
                     createdAt: Date.now(),
                     lastUpdatedAt: Date.now(),
                     profilePictureUrl: "/img/link-profile-picture.png",
                     preferredTheme: ColorScheme.Light
                 } satisfies SimpleUser
             ]
         }
     }
 };
 */