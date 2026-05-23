import type { JSX } from "react";
import { getSystemSettings } from "../actions";
import { SystemSettingsForm } from "./SystemSettingsForm";

export default async function SystemSettingsPage(): Promise<JSX.Element> {
  const settings = await getSystemSettings();

  const defaultSettings = {
    maintenanceMode: false,
    sessionTimeoutMinutes: 60,
    auditLogRetentionDays: 90
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-sm opacity-60 mt-1">
          Configure advanced system behavior and security policies
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <SystemSettingsForm settings={settings || defaultSettings} />
      </div>
    </div>
  );
}
