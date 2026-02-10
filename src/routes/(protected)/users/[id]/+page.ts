import { ColorScheme } from "$common/enum/ColorScheme";
import { UserStatus } from "$common/enum/UserStatus";
import type { GetUserResponse } from "$common/interface/GetUserResponse";

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
    // }

    /** Use for API testing */
    const url = new URL(import.meta.env.VITE_API_URL!);
    url.pathname = `/users/${params.id}`;

    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
        const data: GetUserResponse = await response.json();
        return data.user;
    }
};
