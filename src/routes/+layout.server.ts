import { redirect } from "@sveltejs/kit";

export const load = ({ url }) => {
    if (url.pathname === "/") {
        throw redirect(302, "/dashboard")
    }
};