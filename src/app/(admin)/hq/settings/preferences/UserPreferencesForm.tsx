"use client";

import type { UserPreferences } from "@/common/interface/Settings";
import { useState, useTransition, type JSX } from "react";
import { useRouter } from "next/navigation";
import { saveUserPreferences } from "../actions";

interface UserPreferencesFormProps {
  initialPreferences: UserPreferences;
}

export function UserPreferencesForm({ initialPreferences }: UserPreferencesFormProps): JSX.Element {
  const router = useRouter();
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await saveUserPreferences(preferences);

      if (result.success) {
        setSaveSuccess(true);
        router.refresh();
      } else {
        setSaveError(result.error || "Failed to save preferences");
      }
    });
  };

  const handleReset = () => {
    setPreferences(initialPreferences);
    setSaveError(null);
    setSaveSuccess(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium opacity-80">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {(["light", "dark", "system"] as const).map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => {
                  setPreferences({ ...preferences, theme });
                  setSaveSuccess(false);
                }}
                className={`p-4 rounded-lg border text-center duration-150 ${
                  preferences.theme === theme
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-zinc-600 hover:border-zinc-500"
                }`}
              >
                <i className={`bi ${
                  theme === "light" ? "bi-sun" :
                  theme === "dark" ? "bi-moon" : "bi-circle-half"
                } text-xl mb-2 block`}></i>
                <span className="text-sm capitalize">{theme}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium opacity-80">Notifications</label>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:border-zinc-500 duration-150">
              <div className="flex items-center gap-3">
                <i className="bi bi-envelope opacity-60"></i>
                <div>
                  <span className="font-medium">Email Notifications</span>
                  <p className="text-xs opacity-60">Receive updates via email</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) => {
                  setPreferences({ ...preferences, emailNotifications: e.target.checked });
                  setSaveSuccess(false);
                }}
                className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 text-indigo-500 focus:outline-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer hover:border-zinc-500 duration-150">
              <div className="flex items-center gap-3">
                <i className="bi bi-bell opacity-60"></i>
                <div>
                  <span className="font-medium">Push Notifications</span>
                  <p className="text-xs opacity-60">Receive browser notifications</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.pushNotifications}
                onChange={(e) => {
                  setPreferences({ ...preferences, pushNotifications: e.target.checked });
                  setSaveSuccess(false);
                }}
                className="w-5 h-5 rounded border-zinc-600 bg-zinc-700 text-indigo-500 focus:outline-indigo-500"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-medium opacity-80">
            Language
          </label>
          <select
            id="language"
            value={preferences.language}
            onChange={(e) => {
              setPreferences({ ...preferences, language: e.target.value });
              setSaveSuccess(false);
            }}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
      </div>

      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-exclamation-circle"></i>
            <span>{saveError}</span>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-check-circle"></i>
            <span>Preferences saved successfully</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-700">
        <button
          type="button"
          onClick={handleReset}
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
