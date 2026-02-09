import assert, { AssertionError } from "assert";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        const firstName = data.get("firstName")?.valueOf();
        const lastName = data.get("lastName")?.valueOf();
        const email = data.get("email")?.valueOf();
        const permissionString = data.get("permissions")?.valueOf();

        let permissions: string[] | null = null;
        try {
            assert(typeof firstName === "string" && firstName);
            assert(typeof lastName === "string" && lastName);
            assert(typeof email === "string" && email);
            assert(typeof permissionString === "string" && permissionString);
            permissions = JSON.parse(permissionString);
            assert(permissions instanceof Array);
        } catch (error: unknown) {
            if (error instanceof AssertionError) {
                return fail(400);
            }
        }

        const url = new URL(import.meta.env.VITE_API_URL!);
        url.pathname = "/users/invite";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, permissions })
        });
        
        console.log(response.status);
        console.log(await response.json());
    }
} satisfies Actions;
