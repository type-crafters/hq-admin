export interface GeneralSettings {
    appName: string;
    logoUrl: string;
    faviconUrl: string;
    contactEmail: string;
    supportUrl: string;
    version: string;
}

export interface UserPreferences {
    theme: "light" | "dark" | "system";
    emailNotifications: boolean;
    pushNotifications: boolean;
    language: string;
}

export interface SystemSettings {
    maintenanceMode: boolean;
    sessionTimeoutMinutes: number;
    auditLogRetentionDays: number;
}

export interface Settings {
    general: GeneralSettings;
    preferences: UserPreferences;
    system: SystemSettings;
}
