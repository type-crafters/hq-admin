import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const { id } = event.params;

        const url = new URL(`/users/${id}`, process.env.VITE_API_URL!);

        const response = await event.fetch(url, {
            method: "PATCH",
             body: data
        });
    }
}