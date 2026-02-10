import type { User } from "./User";

export interface GetUserResponse {
    message: string;
    user: User;
}