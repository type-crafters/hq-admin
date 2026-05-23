export interface UserProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    timeZone: string;
    profilePictureUrl: string;
    twoFactorEnabled: boolean;
    role: string;
    permissions: {
        production: boolean;
        staging: boolean;
        analytics: boolean;
    };
    lastPasswordChange: string;
    activityLog: {
        action: string;
        timestamp: string;
        details: string;
    }[];
}
