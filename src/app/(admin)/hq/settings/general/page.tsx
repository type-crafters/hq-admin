import type { JSX } from "react";
import { getGeneralSettings } from "../actions";
import { GeneralSettingsForm } from "./GeneralSettingsForm";

export default async function GeneralSettingsPage(): Promise<JSX.Element> {
  const settings = await getGeneralSettings();

  const defaultSettings = {
    appName: "TypeCrafters HQ",
    logoUrl: "",
    faviconUrl: "",
    contactEmail: "",
    supportUrl: "",
    version: "1.0.0"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">General Settings</h1>
        <p className="text-sm opacity-60 mt-1">
          Configure basic application settings and branding
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <GeneralSettingsForm settings={settings || defaultSettings} />
      </div>
    </div>
  );
}
