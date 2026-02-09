import type { User } from "./User";

export interface ListUsersResponse {
    cursor?: string;
    items: Array<User>;
}