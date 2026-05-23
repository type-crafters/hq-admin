export enum UserRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER"
}

export const UserRoleDisplay: Record<UserRole, { name: string; description: string }> = {
    [UserRole.ADMIN]: {
        name: "Administrator",
        description: "Full access to all system features and settings. Can manage users, roles, and system configuration."
    },
    [UserRole.MODERATOR]: {
        name: "Moderator",
        description: "Limited administrative access. Can manage content and users but cannot modify system settings or roles."
    },
    [UserRole.USER]: {
        name: "User",
        description: "Standard user access. Can view and interact with content based on assigned permissions."
    }
};

export function getUserRoleDisplay(role: UserRole): { name: string; description: string } {
    return UserRoleDisplay[role] || { name: role, description: "" };
}
