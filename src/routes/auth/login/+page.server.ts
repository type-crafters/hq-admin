import assert, { AssertionError } from "assert";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import type { LoginResponse } from "$common/interface";

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const email = data.get("email")?.valueOf();
        const password = data.get("password")?.valueOf();
        const rememberMeString = data.get("rememberMe")?.valueOf();

        const rememberMe = rememberMeString === "on";

        try {
            assert(typeof email === "string" && email);
            assert(typeof password === "string" && password);
        } catch (error: unknown) {
            console.log(`typeof email: ${typeof email}`);
            console.log(`typeof password: ${typeof password}`);
            console.log(`typeof rememberMe: ${typeof rememberMe}`);

            if (error instanceof AssertionError) {
                return fail(400);
            }
        }

        const url = new URL(import.meta.env.VITE_API_URL!);
        url.pathname = "/auth/login";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, rememberMe })
        });

        if (response.ok) {
            const { roles }: LoginResponse = await response.json();
            void roles; // TODO save
        }
    }
} satisfies Actions;