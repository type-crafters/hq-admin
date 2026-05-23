"use client";

import { PermissionAction } from "@/common/enum/PermissionAction";
import { PermissionEntity } from "@/common/enum/PermissionEntity";
import type { Role } from "@/common/interface/Role";
import { AppResponse } from "@/common/interface/AppResponse";
import { ErrorResponse } from "@/common/interface/ErrorResponse";
import { OptionalToastContent } from "@/common/interface/ToastContent";
import PermissionMatrix from "@/components/PermissionMatrix";
import Toast from "@/components/Toast";
import Toggle from "@/components/Toggle";
import { SubmitEvent, SyntheticEvent, useEffect, useState, type JSX } from "react";

export default function NewUserView(): JSX.Element {
    const [formEnabled, setFormEnabled] = useState(true);
    const [toast, setToast] = useState<OptionalToastContent>({});
    const [roles, setRoles] = useState<Role[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [permissions, setPermissions] = useState<string[]>([]);
    const [showOnPage, setShowOnPage] = useState(false);

    useEffect(() => {
        fetch("/api/hq/roles")
            .then((res) => res.json())
            .then((data) => setRoles(data))
            .catch(() => {});
    }, []);

    const handleRoleChange = (roleId: string) => {
        setSelectedRole(roleId);
        const role = roles.find((r) => r.id === roleId);
        if (role) {
            setPermissions(role.permissions);
        }
    };

    const handlePermissionChange = (newPermissions: string[]) => {
        setPermissions(newPermissions);
    };

    const resetForm = (event?: SyntheticEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        setFirstName("");
        setLastName("");
        setEmail("");
        setSelectedRole("");
        setPermissions([]);
        setShowOnPage(false);
    };

    const submitForm = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormEnabled(false);
        try {
            const form = event.currentTarget as HTMLFormElement;
            const data = new FormData(form);

            const response = await fetch("/api/hq/users/new", {
                method: "POST",
                body: data,
            });

            const payload: AppResponse = await response.json();

            if (response.ok) {
                setToast({ title: "Success", message: "User created successfully." });
                resetForm();
            } else {
                setToast({ title: "Error", message: payload.message });
            }
        } finally {
            setFormEnabled(true);
        }
    };

    return (
        <>
            <Toast content={toast} setContent={setToast}/>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl font-bold">New User</h2>
                    <p className="opacity-60">
                        Configure profile details and
                        platform permissions for a new team member.
                    </p>
                </div>
                <form onSubmit={submitForm} className="contents" onReset={resetForm}>
                    <fieldset className="p-6 border border-zinc-500 space-y-4 bg-zinc-700">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <i className="bi bi-person-vcard"></i>
                            Identity
                        </h3>
                        <hr className="opacity-20" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="firstName" className="block text-sm opacity-60 uppercase font-semibold">First name</label>
                                <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2 has-disabled:cursor-progress">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="John"
                                        className="flex-1 focus:outline-none text-lg"
                                        disabled={!formEnabled}
                                        value={firstName}
                                        onInput={(e) => setFirstName(e.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="lastName" className="block text-sm opacity-60 uppercase font-semibold">Last name</label>
                                <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2 has-disabled:cursor-progress">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Doe"
                                        className="flex-1 focus:outline-none text-lg"
                                        disabled={!formEnabled}
                                        value={lastName}
                                        onInput={(e) => setLastName(e.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm opacity-60 uppercase font-semibold">Email address</label>
                                <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2 has-disabled:cursor-progress has-disabled:bg-zinc-700/60">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="name@example.com"
                                        className="flex-1 focus:outline-none text-lg"
                                        disabled={!formEnabled}
                                        value={email}
                                        onInput={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="role" className="block text-sm opacity-60 uppercase font-semibold">Role</label>
                                <div className="flex items-center border border-zinc-600 rounded bg-zinc-800/60 outline outline-transparent has-focus:outline-indigo-500 duration-150 px-2 py-1 gap-2 has-disabled:cursor-progress has-disabled:bg-zinc-700/60">
                                    <select
                                        name="role"
                                        id="role"
                                        className="flex-1 focus:outline-none text-lg bg-transparent"
                                        disabled={!formEnabled}
                                        value={selectedRole}
                                        onChange={(e) => handleRoleChange(e.target.value)}
                                    >
                                        <option value="">Select a role...</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                    <a
                                        href="/hq/roles/new"
                                        className="shrink-0 p-1 rounded hover:bg-zinc-600 duration-150 text-zinc-400 hover:text-zinc-200"
                                        title="Create new role"
                                    >
                                        <i className="bi bi-plus-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="flex gap-8">
                        <fieldset className="flex-3 p-6 border border-zinc-500 space-y-4 bg-zinc-700">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                <i className="bi bi-key"></i>
                                Access Management
                            </h3>
                            <hr className="opacity-20" />
                            <p className="opacity-60">Select permissions for this user to have across the platform.</p>
                            <PermissionMatrix
                                permissions={permissions}
                                onChange={handlePermissionChange}
                            />
                        </fieldset>
                        <fieldset className="flex-2 p-6 border border-zinc-500 space-y-4 bg-zinc-700">
                            <h3 className=" text-xl font-semibold flex items-center gap-2">
                                <i className="bi bi-globe-americas"></i>
                                Landing Page
                            </h3>
                            <hr className="opacity-20" />
                            <div className="space-y-1">
                                <Toggle
                                    id="showOnPage"
                                    state={showOnPage}
                                    setState={setShowOnPage}
                                    label="Show on Team section"
                                    labelPosition="left"
                                    disabled={!formEnabled}
                                />
                                <p className="opacity-60">
                                    Show this user's information on TypeCrafter's HQ landing page.
                                </p>
                            </div>
                        </fieldset>
                        <input type="text" name="permissions" id="permisions" value={JSON.stringify(permissions)} className="hidden" readOnly />
                    </div>
                    <div className="w-full flex justify-end items-center gap-4">
                        <input
                            type="reset"
                            value="Cancel"
                            className="bg-zinc-500 px-3 py-2 rounded hover:bg-zinc-600 duration-150 disabled:bg-zinc-400"
                            disabled={!formEnabled}
                        />
                        <input
                            type="submit"
                            value="Create User"
                            className="bg-indigo-500 px-3 py-2 rounded hover:bg-indigo-600 duration-150 disabled:bg-zinc-400"
                            disabled={!formEnabled}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
