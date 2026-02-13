import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();
        const userId = data.get("userId")?.valueOf();

        if (typeof userId === "string" && userId) {
            const url = new URL(`/users/${userId}`, import.meta.env.VITE_API_URL!);
            await fetch(url, { method: "DELETE" });
        }
    }
};