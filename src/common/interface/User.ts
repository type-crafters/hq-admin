import type { ColorScheme } from "$common/enum/ColorScheme";
import type { UserStatus } from "$common/enum/UserStatus";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: boolean;
    status: UserStatus;
    permissions: string[];
    profilePictureUrl: string;
    createdAt: string;
    lastUpdatedAt: string;
    preferredTheme: ColorScheme;
}