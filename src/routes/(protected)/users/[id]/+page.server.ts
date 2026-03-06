import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { API_URL, NODE_ENV } from "$env/static/private";
import { ColorScheme, UploadType, UserStatus, type SignURLRequest, type SignURLResponse, type SimpleUser, type User } from "@typecrafters/hq-types";
import type { ModalData } from "$interface/ModalData.js";
import { isstr } from "$util/isstr";
import { MB } from "$common/util/consts.js";

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
    delete: async ({ params, fetch }) => {
        const id = params.id;

        if (!id) return fail(400, {
            title: "Error",
            message: "Missing required path parameter 'id'.",
            buttonText: "Understood."
        } satisfies ModalData);
        
        if (NODE_ENV !== "production") {
            return {
                title: "Success?",
                message: "All path parameters successfully validated. Response not sent to the server",
                buttonText: "OK!"
            } satisfies ModalData;
        }
        
        const response = await fetch(`/users/${id}`, { method: "DELETE" });

        if (response.ok) {
            throw redirect(303, "/users");
        } else {
            return {
                title: "Error",
                message: "An unexpected error occurred.",
                buttonText: "Understood."
            } satisfies ModalData;
        }

    },

    patch: async ({ request, params, fetch }) => {
        const data = await request.formData();

        const id = params.id!;

        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const preferredTheme = data.get("preferredTheme");
        const picture = data.get("profilePicture");

        if (!isstr(firstName)) {
            return fail(400, {
                title: "Error",
                message: "First name is required.",
                buttonText: "Understood"
            } satisfies ModalData);
        }

        if (!isstr(lastName)) {
            return fail(400, {
                title: "Error",
                message: "Last name is required.",
                buttonText: "Understood"
            } satisfies ModalData);
        }

        if (!isstr(email)) {
            return fail(400, {
                title: "Error",
                message: "Email is required.",
                buttonText: "Understood"
            } satisfies ModalData);
        }

        if (
            !isstr(preferredTheme) ||
            !(Object.values(ColorScheme) as string[]).includes(preferredTheme)
        ) {
            return fail(400, {
                title: "Error",
                message: "Invalid preferred theme selected.",
                buttonText: "Understood"
            } satisfies ModalData);
        }

        let key: string = "";

        const payload: Partial<User> = {
            firstName,
            lastName,
            email,
            preferredTheme: preferredTheme as ColorScheme,
        } satisfies Partial<User>;

        if (!(picture instanceof File)) {
            return fail(400, {
                title: "Error",
                message: "Unrecognized data sent as profile picture.",
                buttonText: "Understood."
            });
        }
        if (picture.size > 5 * MB) {
            return fail(413, {
                title: "Error",
                message: "Image is too large. Maximum file size is 5MB.",
                buttonText: "Understood."
            });
        }

        if (!picture.type.trim().startsWith("image/")) {
            return fail(415, {
                title: "Error",
                message: "Uploaded file is not an image.",
                buttonText: "Understood."
            });
        }

        if (NODE_ENV !== "production") {
            return {
                title: "Success?",
                message: "All fields successfully validated. Response not sent to the server",
                buttonText: "OK!"
            } satisfies ModalData;
        }

        const signedUploadURL = new URL("/uploads/url", API_URL);
        const urlResponse = await fetch(signedUploadURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: id,
                uploadType: UploadType.ProfilePicture,
                contentType: picture.type
            } satisfies SignURLRequest)
        });

        if (urlResponse.ok) {
            const data: SignURLResponse = await urlResponse.json();
            const uploadResponse = await fetch(data.url, {
                method: "PUT",
                headers: {
                    "Content-Type": picture.type
                },
                body: picture
            });
            if (uploadResponse.ok) {
                key = data.key;
            } else {
                return fail(500, {
                    title: "Error",
                    message: "Failed to upload image.",
                    buttonText: "Understood."
                });
            }
        } else {
            return fail(500, {
                title: "Error",
                message: "Failed to generate upload URL.",
                buttonText: "Understood."
            });
        }

        if (key) {
            payload.profilePictureUrl = key;
        }

        const url = new URL(`/users/${id}`, API_URL);
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const text = response.headers.get("Content-Type")?.includes("text/plain") ? await response.text() : "User successfully updated.";

        return {
            title: response.ok ? "Success" : "Error",
            message: text,
            buttonText: response.ok ? "OK!" : "Understood."
        } satisfies ModalData;
    }
};
