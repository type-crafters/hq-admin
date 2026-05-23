"use client";

import type { GeneralSettings } from "@/common/interface/Settings";
import { useTransition, type JSX } from "react";
import { saveGeneralSettings } from "../actions";

interface GeneralSettingsFormProps {
  settings: GeneralSettings;
}

export function GeneralSettingsForm({ settings }: GeneralSettingsFormProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const updatedSettings: GeneralSettings = {
        appName: formData.get("appName") as string,
        logoUrl: formData.get("logoUrl") as string,
        faviconUrl: formData.get("faviconUrl") as string,
        contactEmail: formData.get("contactEmail") as string,
        supportUrl: formData.get("supportUrl") as string,
        version: settings.version
      };

      await saveGeneralSettings(updatedSettings);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="appName" className="text-sm font-medium opacity-80">
            Application Name
          </label>
          <input
            type="text"
            id="appName"
            name="appName"
            defaultValue={settings.appName}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
            placeholder="TypeCrafters HQ"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-medium opacity-80">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            defaultValue={settings.contactEmail}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
            placeholder="support@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="supportUrl" className="text-sm font-medium opacity-80">
            Support URL
          </label>
          <input
            type="url"
            id="supportUrl"
            name="supportUrl"
            defaultValue={settings.supportUrl}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
            placeholder="https://support.example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="logoUrl" className="text-sm font-medium opacity-80">
            Logo URL
          </label>
          <input
            type="url"
            id="logoUrl"
            name="logoUrl"
            defaultValue={settings.logoUrl}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
            placeholder="https://cdn.example.com/logo.png"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="faviconUrl" className="text-sm font-medium opacity-80">
            Favicon URL
          </label>
          <input
            type="url"
            id="faviconUrl"
            name="faviconUrl"
            defaultValue={settings.faviconUrl}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
            placeholder="https://cdn.example.com/favicon.ico"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="version" className="text-sm font-medium opacity-80">
            Version
          </label>
          <input
            type="text"
            id="version"
            name="version"
            value={settings.version}
            readOnly
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-500 cursor-not-allowed"
          />
          <p className="text-xs opacity-50">Version is read-only and auto-generated</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-700">
        <button
          type="reset"
          className="px-4 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 duration-150"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed duration-150"
        >
          {isPending ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin"></i>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="bi bi-check-lg"></i>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
