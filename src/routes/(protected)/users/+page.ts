import type { ListUsersResponse } from "$common/interface/ListUsersResponse";
import type { UserRow } from "$common/interface/UserRow";
import { ColorScheme } from "$common/enum/ColorScheme";
import { UserStatus } from "$common/enum/UserStatus";

export const load = async ({ fetch }) => {
    // /** Use for UI testing */
    // return {
    //     rows: [
    //         {
    //             id: "001",
    //             name: "Diego Chan",
    //             pfpSrc: "/img/link-profile-picture.png",
    //             status: UserStatus.Active,
    //             password: true,
    //             email: "xdiego.chanx@gmail.com",
    //             theme: ColorScheme.Light
    //         },
    //     ],
    // };
    
    /** Use for API testing */
    const url = new URL(import.meta.env.VITE_API_URL!);
    url.pathname = "/users";
    url.searchParams.append("limit", "30");

    const response = await fetch(url, { method: "GET" });

    const data: ListUsersResponse = await response.json();

    return {
        rows: data.items.map((user) => {
            return {
                id: user.id,
                name: [user.firstName, user.lastName].join(" "),
                email: user.email,
                pfpSrc: user.profilePictureUrl,
                password: user.password,
                theme: user.preferredTheme,
                status: user.status
            } satisfies UserRow;
        })
    };

};