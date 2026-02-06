import { redirect } from "@sveltejs/kit";

export const load = ({ url }) => {
    if (!import.meta.env.VITE_API_URL) {
        throw new Error("Missing required environment variable VITE_API_URL");
    }

    if (url.pathname === "/") {
        throw redirect(302, "/dashboard")
    }
};