import type { ModalData } from "$common/interface/ModalData.js";
import { API_URL, NODE_ENV } from "$env/static/private";
import { error, redirect, type Actions } from "@sveltejs/kit";
import { ColorScheme, UserStatus, type SimpleUser } from "@typecrafters/hq-types";

export const load = async ({ params, fetch }): Promise<SimpleUser> => {
    if (NODE_ENV === "production") {
        const id: string = params.id;

        const url = new URL(`/users/${id}`, API_URL);
        const response = await fetch(url, { method: "GET" });

        if (response.ok) {
            const user: SimpleUser = await response.json();
            return user;
        } else {
            throw error(response.status, "Failed to fetch user");
        }
    } else {
        return {
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
            preferredTheme: ColorScheme.System
        } satisfies SimpleUser;
    }
}

export const actions: Actions = {
    delete: async ({ params, fetch }): Promise<ModalData> => {
        return redirect(303, "/users");
    },

    patch: async ({ request, params, fetch }): Promise<ModalData> => {
        return {
            title: "",
            message: "",
            buttonText: ""
        } satisfies ModalData
    }
};