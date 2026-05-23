"use client";

import type { SystemSettings } from "@/common/interface/Settings";
import { useTransition, type JSX } from "react";
import { saveSystemSettings } from "../actions";

interface SystemSettingsFormProps {
  settings: SystemSettings;
}

export function SystemSettingsForm({ settings }: SystemSettingsFormProps): JSX.Element {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const updatedSettings: SystemSettings = {
        maintenanceMode: formData.get("maintenanceMode") === "on",
        sessionTimeoutMinutes: parseInt(formData.get("sessionTimeoutMinutes") as string, 10),
        auditLogRetentionDays: parseInt(formData.get("auditLogRetentionDays") as string, 10)
      };

      await saveSystemSettings(updatedSettings);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <i className="bi bi-exclamation-triangle text-amber-400 mt-0.5"></i>
            <div>
              <h3 className="font-semibold text-amber-400">Caution</h3>
              <p className="text-sm opacity-80 mt-1">
                Changes to system settings may affect all users and require a page refresh to take full effect.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:border-zinc-500 duration-150">
            <div className="flex items-center gap-3">
              <i className="bi bi-tools opacity-60"></i>
              <div>
                <span className="font-medium">Maintenance Mode</span>
                <p className="text-xs opacity-60">
                  Enable to show maintenance page to all non-admin users
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                defaultChecked={settings.maintenanceMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sessionTimeoutMinutes" className="text-sm font-medium opacity-80">
                Session Timeout (minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="sessionTimeoutMinutes"
                  name="sessionTimeoutMinutes"
                  defaultValue={settings.sessionTimeoutMinutes}
                  min={5}
                  max={480}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm opacity-50">
                  min
                </span>
              </div>
              <p className="text-xs opacity-50">
                Users will be logged out after this period of inactivity
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="auditLogRetentionDays" className="text-sm font-medium opacity-80">
                Audit Log Retention (days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="auditLogRetentionDays"
                  name="auditLogRetentionDays"
                  defaultValue={settings.auditLogRetentionDays}
                  min={7}
                  max={365}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm opacity-50">
                  days
                </span>
              </div>
              <p className="text-xs opacity-50">
                Older audit logs will be automatically deleted
              </p>
            </div>
          </div>
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
