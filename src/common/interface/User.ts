import { UserStatus } from "../enum/UserStatus";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string | null;
    profilePictureUrl: string;
    status: UserStatus;
    permissions: string[];
}