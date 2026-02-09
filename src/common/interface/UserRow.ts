import type { ColorScheme } from "$common/enum/ColorScheme";
import type { UserStatus } from "$common/enum/UserStatus";

export interface UserRow {
    id: string;
    pfpSrc: string;
    password: boolean;
    theme: ColorScheme;
    name: string;
    email: string;
    status: UserStatus;
}