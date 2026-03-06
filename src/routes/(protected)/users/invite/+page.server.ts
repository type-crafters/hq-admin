import { isstr } from "$util/isstr";
import { API_URL, NODE_ENV } from "$env/static/private";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import type { ModalData } from "$common/interface/ModalData";
import type { InviteUserRequest } from "@typecrafters/hq-types";

export const actions: Actions = {
    default: async ({ request, fetch }) => {

        const form = await request.formData();

        const firstName = form.get("firstName");
        const lastName = form.get("lastName");
        const email = form.get("email");
        const permissionstr = form.get("permissions");

        let permissions: string[] = [];

        if (!isstr(firstName))
            return fail(400, {
                title: "Error",
                message: "First name is required.",
                buttonText: "Understood."
            } satisfies ModalData);

        if (!isstr(lastName))
            return fail(400, {
                title: "Error",
                message: "Last name is required.",
                buttonText: "Understood."
            } satisfies ModalData);

        if (!isstr(email))
            return fail(400, {
                title: "Error",
                message: "Email is required.",
                buttonText: "Understood."
            } satisfies ModalData);

        if (isstr(permissionstr)) {
            try {
                permissions = JSON.parse(permissionstr);
            } catch {
                permissions = [];
            }
        }
        if (NODE_ENV === "production") {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                permissions
            } satisfies InviteUserRequest;

            try {
                const url = new URL("/users/invite", API_URL);
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const message = await response.text();

                return {
                    title: response.ok ? "Success" : "Error",
                    message,
                    buttonText: response.ok ? "OK!" : "Understood."
                } satisfies ModalData;
            } catch {
                return fail(500, {
                    title: "Error",
                    message: "An unexpected error occured on our side.",
                    buttonText: "Understood."
                } satisfies ModalData);
            }

        } else {
            return {
                title: "Success?",
                message: "All fields successfully validated. Response not sent to the server",
                buttonText: "OK!"
            } satisfies ModalData;
        }
    }
}