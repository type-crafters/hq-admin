import { UserStatus } from "../enum/UserStatus";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: boolean;
    profilePictureUrl: string;
    role: string;
    status: UserStatus;
    permissions: string[];
}