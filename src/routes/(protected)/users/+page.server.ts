import { NODE_ENV, API_URL } from "$env/static/private";
import { ColorScheme, UserStatus, type ListUserResponse, type SimpleUser } from "@typecrafters/hq-types";

export const load = async ({ fetch }) => {
    if (NODE_ENV === "production") {
        const url = new URL("/users", API_URL);
        const response = await fetch(url, { method: "GET" });

        if (response.ok) {
            const { items }: ListUserResponse = await response.json();
            return { items };
        }
    } else {
        return {
            items: [
                {
                    id: "babbdebc-0b7e-4935-a474-c2bea0b1c01d",
                    firstName: "John",
                    lastName: "Doe",
                    email: "name@example.com",
                    password: true,
                    permissions: ["create:user", "list:user", "update:user", "delete:user"],
                    status: UserStatus.Unverified,
                    createdAt: Date.now(),
                    lastUpdatedAt: Date.now(),
                    profilePictureUrl: "/img/link-profile-picture.png",
                    preferredTheme: ColorScheme.Light
                } satisfies SimpleUser
            ]
        }
    }
};