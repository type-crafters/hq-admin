import { UploadType } from "$common/enum/UploadType";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request, params, fetch}) => {
        const id = params.id;
        const data = await request.formData();
        const picture = data.get("profilePicture");

        const body = Object.fromEntries(Object.entries({
            firstName: data.get("firstName")?.valueOf(),
            lastName: data.get("lastName")?.valueOf(),
            email: data.get("email")?.valueOf(),
            status: data.get("status")?.valueOf(),
            preferredTheme: data.get("preferredTheme")?.valueOf()
        }).filter(([_, v]) => !!v));

        let key;

        if (picture instanceof File) {
            const signRequestUrl = new URL(`/users/${id}/upload`, process.env.VITE_API_URL!);
            if (picture.type.startsWith("image/") && picture.size) {
                const signedUrlResponse = await fetch(signRequestUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        upload: UploadType.ProfilePicture,
                        contentType: picture.type
                    })
                });

                if (signedUrlResponse.ok) {
                    const response = await signedUrlResponse.json();

                    const url = response["url"];
                    key = response["key"];

                    await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": picture.type
                        },
                        body: picture
                    });
                }
            }
        }

        const updateUrl = new URL(`/users/${id}`, process.env.VITE_API_URL!);

        const updateResponse = await fetch(updateUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body, ...(key && { profilePictureUrl: key }) })
        });
    }
}