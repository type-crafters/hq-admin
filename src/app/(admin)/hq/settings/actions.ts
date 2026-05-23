"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:8080";

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

// ============ GENERAL SETTINGS ============

export async function getGeneralSettings(): Promise<GeneralSettings | null> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings?category=general`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching general settings:", error);
    return null;
  }
}

export async function saveGeneralSettings(
  settings: GeneralSettings
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        category: "general",
        settings
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to save settings" }));
      return { success: false, error: error.error || "Failed to save settings" };
    }

    revalidatePath("/hq/settings/general");

    return { success: true };
  } catch (error) {
    console.error("Error saving general settings:", error);
    return { success: false, error: "Internal server error" };
  }
}

// ============ USER PREFERENCES ============

export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings?category=preferences`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return null;
  }
}

export async function saveUserPreferences(
  preferences: UserPreferences
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        category: "preferences",
        settings: preferences
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to save preferences" }));
      return { success: false, error: error.error || "Failed to save preferences" };
    }

    revalidatePath("/hq/settings/preferences");

    return { success: true };
  } catch (error) {
    console.error("Error saving user preferences:", error);
    return { success: false, error: "Internal server error" };
  }
}

// ============ SYSTEM SETTINGS ============

export async function getSystemSettings(): Promise<SystemSettings | null> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings?category=system`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching system settings:", error);
    return null;
  }
}

export async function saveSystemSettings(
  settings: SystemSettings
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        category: "system",
        settings
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to save settings" }));
      return { success: false, error: error.error || "Failed to save settings" };
    }

    revalidatePath("/hq/settings/system");

    return { success: true };
  } catch (error) {
    console.error("Error saving system settings:", error);
    return { success: false, error: "Internal server error" };
  }
}
