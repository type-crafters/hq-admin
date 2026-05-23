import type { JSX } from "react";
import { getUserPreferences } from "../actions";
import { UserPreferencesForm } from "./UserPreferencesForm";

export default async function PreferencesPage(): Promise<JSX.Element> {
  const preferences = await getUserPreferences();

  const defaultPreferences = {
    theme: "system" as const,
    emailNotifications: true,
    pushNotifications: false,
    language: "en"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Preferences</h1>
        <p className="text-sm opacity-60 mt-1">
          Customize your personal experience and notification settings
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <UserPreferencesForm initialPreferences={preferences || defaultPreferences} />
      </div>
    </div>
  );
}
