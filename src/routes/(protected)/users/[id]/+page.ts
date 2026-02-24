import { type User, ColorScheme, UserStatus } from "@typecrafters/hq-types";

export const load = async ({ fetch, params }) => {
    // /** Use for UI testing */
    // return {
    //     id: "UUID:001",
    //     firstName: "Diego",
    //     lastName: "Chan",
    //     email: "xdiego.chanx@gmail.com",
    //     password: true,
    //     status: UserStatus.Active,
    //     permissions: [],
    //     profilePictureUrl: "/img/link-profile-picture.png",
    //     createdAt: new Date().toISOString(),
    //     lastUpdatedAt: new Date().toISOString(),
    //     preferredTheme: ColorScheme.Dark
    // } satisfies User;

    /** Use for API testing */
    const url = new URL(`/users/${params.id}`, import.meta.env.VITE_API_URL!);

    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
        const data: User = await response.json();
        return data;
    }
};
