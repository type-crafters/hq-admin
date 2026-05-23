"use client";

import type { UserProfileData } from "@/common/interface/UserProfile";
import Breadcrumbs from "@/components/Breadcrumbs";
import Toggle from "@/components/Toggle";
import { useRouter } from "next/navigation";
import { useRef, useState, type JSX } from "react";

const TIME_ZONES = [
    { label: "PST (UTC -08:00)", value: "PST" },
    { label: "MST (UTC -07:00)", value: "MST" },
    { label: "CST (UTC -06:00)", value: "CST" },
    { label: "EST (UTC -05:00)", value: "EST" },
    { label: "UTC (UTC +00:00)", value: "UTC" },
    { label: "CET (UTC +01:00)", value: "CET" },
    { label: "ART (UTC -03:00)", value: "ART" },
];

const MOCK_USER: UserProfileData = {
    firstName: "Alex",
    lastName: "Henderson",
    email: "alex.h@softwareco.com",
    phone: "+1 (555) 123-4567",
    timeZone: "PST",
    profilePictureUrl: "",
    twoFactorEnabled: true,
    role: "Super Admin",
    permissions: {
        production: true,
        staging: true,
        analytics: true,
    },
    lastPasswordChange: "45 days ago",
    activityLog: [
        { action: "Successful Login", timestamp: "Today, 08:42 AM", details: "IP: 192.168.1.1" },
        { action: "API Key Generated", timestamp: "Oct 24, 2023", details: "System Console" },
    ],
};

export default function UserProfileView(): JSX.Element {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<UserProfileData>(MOCK_USER);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fullName = `${profile.firstName} ${profile.lastName}`;
    const initials = `${profile.firstName.at(0)}${profile.lastName.at(0)}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        try {
            const response = await fetch("/api/hq/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: profile.email,
                    phone: profile.phone,
                    timeZone: profile.timeZone,
                    permissions: profile.permissions,
                }),
            });

            if (response.ok) {
                setSaveSuccess(true);
                router.refresh();
            } else {
                setSaveError("Failed to save profile. Please try again.");
            }
        } catch {
            setSaveError("Failed to save profile. Please try again.");
        }

        setIsSaving(false);
    };

    const handleReset = () => {
        setProfile(MOCK_USER);
        setSaveError(null);
        setSaveSuccess(false);
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            setSaveError("Only JPG and PNG files are allowed");
            return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            setSaveError("File size must be less than 2MB");
            return;
        }

        setUploading(true);
        setSaveError(null);

        try {
            const formData = new FormData();
            formData.append("profilePicture", file);

            const response = await fetch("/api/hq/users/profile/picture", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfile((prev) => ({ ...prev, profilePictureUrl: data.url }));
            } else {
                setSaveError("Failed to upload photo");
            }
        } catch {
            setSaveError("Failed to upload photo");
        }

        setUploading(false);
        // Reset input so same file can be selected again
        e.target.value = "";
    };

    return (
        <div className="w-full space-y-6">
            <div>
                <Breadcrumbs />
                <h1 className="text-2xl font-bold mt-2">My Profile</h1>
                <p className="opacity-60 mt-1">
                    Manage your personal information, security, and preferences for your enterprise account.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Personal Information */}
                    <div className="lg:col-span-2 p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg space-y-6">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-person text-indigo-400"></i>
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative size-28 rounded-lg overflow-hidden bg-zinc-700 border border-zinc-600 flex items-center justify-center">
                                    {profile.profilePictureUrl ? (
                                        <img
                                            src={profile.profilePictureUrl}
                                            alt={fullName}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold opacity-60">{initials}</span>
                                    )}
                                    
                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    
                                    <button
                                        type="button"
                                        onClick={handleCameraClick}
                                        disabled={uploading}
                                        className="absolute bottom-1 right-1 size-7 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {uploading ? (
                                            <i className="bi bi-arrow-repeat animate-spin text-xs"></i>
                                        ) : (
                                            <i className="bi bi-camera text-xs"></i>
                                        )}
                                    </button>
                                </div>
                                <span className="text-xs opacity-50">JPG, PNG, max 2MB</span>
                            </div>

                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="fullName" className="text-sm font-medium opacity-70">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => {
                                            const parts = e.target.value.split(" ");
                                            setProfile((prev) => ({
                                                ...prev,
                                                firstName: parts[0] || "",
                                                lastName: parts.slice(1).join(" "),
                                            }));
                                            setSaveSuccess(false);
                                        }}
                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white text-sm"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-sm font-medium opacity-70">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        readOnly
                                        className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-600 rounded-lg text-white text-sm opacity-60 cursor-not-allowed"
                                    />
                                    <p className="text-xs opacity-40 flex items-center gap-1">
                                        <i className="bi bi-lock"></i>
                                        Contact admin to change
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="phone" className="text-sm font-medium opacity-70">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => {
                                            setProfile((prev) => ({ ...prev, phone: e.target.value }));
                                            setSaveSuccess(false);
                                        }}
                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white text-sm"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="timeZone" className="text-sm font-medium opacity-70">
                                        Time Zone
                                    </label>
                                    <select
                                        id="timeZone"
                                        value={profile.timeZone}
                                        onChange={(e) => {
                                            setProfile((prev) => ({ ...prev, timeZone: e.target.value }));
                                            setSaveSuccess(false);
                                        }}
                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white text-sm"
                                    >
                                        {TIME_ZONES.map((tz) => (
                                            <option key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security & Access */}
                    <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg space-y-6">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-shield-lock text-indigo-400"></i>
                            <h2 className="text-lg font-semibold">Security & Access</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Toggle
                                    id="twoFactor"
                                    label="Two-Factor Authentication"
                                    labelPosition="left"
                                    state={profile.twoFactorEnabled}
                                    setState={(value) => {
                                        setProfile((prev) => ({ ...prev, twoFactorEnabled: value }));
                                        setSaveSuccess(false);
                                    }}
                                />
                                <p className="text-xs opacity-50 mt-1">
                                    Adds an extra layer of security to your account by requiring a code from your mobile device.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-zinc-700">
                                <h3 className="text-sm font-medium mb-3">Password Management</h3>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-between px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg hover:border-zinc-500 duration-150 text-sm"
                                >
                                    <span>Change Password</span>
                                    <i className="bi bi-key opacity-60"></i>
                                </button>
                                <p className="text-xs opacity-40 mt-2">Last changed {profile.lastPasswordChange}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Account Role & Permissions */}
                    <div className="lg:col-span-2 p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-shield-check text-indigo-400"></i>
                            <h2 className="text-lg font-semibold">Account Role & Permissions</h2>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-700 rounded-lg">
                            <div>
                                <span className="text-xs uppercase tracking-wider opacity-50">Current Role</span>
                                <p className="text-lg font-semibold text-indigo-400">{profile.role}</p>
                            </div>
                            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                                Active
                            </span>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium opacity-70 mb-3">Active Platform Permissions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {([
                                    { key: "production" as const, label: "Production" },
                                    { key: "staging" as const, label: "Staging" },
                                    { key: "analytics" as const, label: "Analytics" },
                                ]).map(({ key, label }) => (
                                    <label
                                        key={key}
                                        className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 duration-150"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={profile.permissions[key]}
                                            onChange={(e) => {
                                                setProfile((prev) => ({
                                                    ...prev,
                                                    permissions: { ...prev.permissions, [key]: e.target.checked },
                                                }));
                                                setSaveSuccess(false);
                                            }}
                                            className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-indigo-500 focus:outline-indigo-500"
                                        />
                                        <span className="text-sm">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity Log */}
                    <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg space-y-4">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-clock-history text-indigo-400"></i>
                            <h2 className="text-lg font-semibold">Activity Log</h2>
                        </div>

                        <div className="space-y-3">
                            {profile.activityLog.map((entry, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="size-2 rounded-full bg-indigo-500 mt-1.5"></div>
                                        {i < profile.activityLog.length - 1 && (
                                            <div className="w-px flex-1 bg-zinc-700 mt-1"></div>
                                        )}
                                    </div>
                                    <div className="pb-3">
                                        <p className="text-sm font-medium">{entry.action}</p>
                                        <p className="text-xs opacity-50">
                                            {entry.timestamp} • {entry.details}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 duration-150">
                            View All History
                        </button>
                    </div>
                </div>

                {/* Feedback Messages */}
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
                            <span>Profile saved successfully</span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-700">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 duration-150 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed duration-150 text-sm font-medium"
                    >
                        {isSaving ? (
                            <>
                                <i className="bi bi-arrow-repeat animate-spin"></i>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-save"></i>
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
