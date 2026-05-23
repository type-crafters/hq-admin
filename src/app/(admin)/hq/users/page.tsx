"use client";

import { ExportFormat } from "@/common/enum/ExportFormat";
import { OptionalToastContent } from "@/common/interface/ToastContent";
import { User } from "@/common/interface/User";
import Dialog from "@/components/Dialog";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import UserStatusBadge from "@/components/UserStatusBadge";
import Link from "next/link";
import { useEffect, useState, type JSX } from "react";

export default function UserListView(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [dialogMounted, setDialogMounted] = useState(false);
    const [toast, setToast] = useState<OptionalToastContent>({});
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<Array<User>>([]);

    const [exportFormat, setExportFormat] = useState<ExportFormat | null>(null);
    const [exportEnabled, setExportEnabled] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        if (users.length) setUsers([]);
        fetch("/api/hq/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => setToast({ title: "Error", message: error.message || String(error) }))
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    useEffect(fetchUsers, [])


    return (
        <>
            <Dialog id="export" mounted={dialogMounted} setMounted={setDialogMounted}>
                <form className="interpolate-keywords duration-200">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold">Export data</h2>
                            <p className="opacity-60">Customize your export with the options below</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Fields</h3>
                                <div className="flex gap-4 items-stretch">
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Format</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(ExportFormat).map(([key, value]) => (
                                        <label className="block flex-1" key={key}>
                                            <input type="radio" name="exportFormat" value={value} onChange={() => setExportFormat(value)} className="hidden peer" />
                                            <div role="presentation" className="flex-1 text-xl text-center py-6 border border-zinc-500 outline-2 outline-transparent hover:outline-white peer-checked:outline-indigo-500! rounded-lg duration-150 cursor-pointer">
                                                {key}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={`${exportFormat ? "max-h-auto" : "max-h-0"} interpolate-keywords duration-200`}>
                                {exportFormat && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Export as</h3>
                                        <div className="flex gap-4 items-stretch">
                                            <div className="flex gap-2 border border-zinc-500 px-2 py-1 w-full rounded bg-zinc-800/60">
                                                <input
                                                    type="text"
                                                    name="filename"
                                                    id="filename"
                                                    className="flex-1 focus:outline-none"
                                                />
                                                <div>
                                                    .{exportFormat}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex justify-end items-center gap-4">
                            <input
                                type="reset"
                                value="Cancel"
                                className="bg-zinc-500 px-3 py-2 rounded hover:bg-zinc-600 duration-150 disabled:bg-zinc-400"
                                disabled={!exportEnabled}
                            />
                            <input
                                type="submit"
                                value="Export"
                                className="bg-indigo-500 px-3 py-2 rounded hover:bg-indigo-600 duration-150 disabled:bg-zinc-400"
                                disabled={!exportEnabled}
                            />
                        </div>
                    </div>
                </form>
            </Dialog>
            <Toast content={toast} setContent={setToast} />
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold">Users</h2>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="w-full max-w-sm rounded border border-zinc-500 bg-zinc-900/50 flex items-center gap-2 px-3 py-1 outline outline-transparent has-focus:outline-indigo-500 duration-150">
                            <i className="bi bi-search text-zinc-500"></i>
                            <input
                                type="text"
                                id="search"
                                className="flex-1 focus:outline-none placeholder:text-zinc-500"
                                placeholder="Search users..."
                                value={query}
                                onInput={(e) => setQuery(e.currentTarget.value)}
                            />
                            {query && (
                                <button aria-label="Clear search" onClick={() => setQuery("")}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            aria-label="Refresh table"
                            onClick={fetchUsers}
                            className="rounded-full border border-zinc-500 disabled:bg-zinc-700"
                        >
                            <i className={`bi bi-arrow-clockwise text-lg p-2 ${loading ? "spin" : ""}`}></i>
                        </button>
                        <label
                            className="relative flex items-center gap-1 px-4 py-1 rounded border border-zinc-500 cursor-pointer"
                        >
                            <input type="checkbox" className="peer hidden" />
                            <span>Actions</span>
                            <i className="bi bi-caret-down-fill text-xs"></i>

                            <ul
                                className="absolute top-full left-0 min-w-full w-max my-2 bg-zinc-800  border border-zinc-500 py-2 rounded invisible opacity-0  pointer-events-none peer-checked:visible peer-checked:opacity-100  peer-checked:pointer-events-auto  duration-300"
                            >
                                <li className="px-4 py-1 hover:bg-zinc-700 duration-150">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            // close dropdown
                                            const input = (
                                                e.currentTarget
                                                    .closest("label")
                                                    ?.querySelector("input")
                                            ) as HTMLInputElement | null;

                                            if (input) input.checked = false;

                                            setDialogMounted(true);
                                        }}
                                        className="flex gap-2 items-center w-full"
                                    >
                                        <i className="bi bi-download"></i>
                                        Export
                                    </button>
                                </li>
                            </ul>
                        </label>
                        <Link
                            href="/hq/users/new"
                            className="flex items-center gap-1 px-4 py-1 rounded bg-indigo-500 border border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 duration-150"
                        >
                            New user
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full rounded-lg border border-neutral-500 border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>ID</span>
                                        <button aria-label="Sort by ID" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Name</span>
                                        <button aria-label="Sort by name" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Email address</span>
                                        <button aria-label="Sort by email" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Role</span>
                                        <button aria-label="Sort by role" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Password</span>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Status</span>
                                        <button aria-label="Sort by status" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                                <th className="text-left font-bold border-b border-neutral-500 p-2">
                                    <div className="flex items-center gap-1">
                                        <span>Permissions</span>
                                        <button aria-label="Sort by permission count" className="rounded-full hover:bg-zinc-700 duration-150">
                                            <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9999}>
                                        <div className="w-full p-2 flex justify-center">
                                            <Spinner />
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length ? users.map((user, i) => (
                                <tr key={i} className="group">
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        <Link href={`/hq/users/${user.id}`} className="line-clamp-1 text-xs opacity-60 hover:underline">
                                            {user.id}
                                        </Link>
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={user.profilePictureUrl}
                                                alt={`${user.firstName}'s profile`}
                                                className="size-9 rounded-full object-center object-cover border border-zinc-500"
                                            />
                                            <span>{user.firstName} {user.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        <p className="max-w-xs truncate">
                                            {user.email}
                                        </p>
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        <p className="max-w-xs truncate">
                                            {user.role}
                                        </p>
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        {user.password ? (
                                            <span className="inline-flex gap-1 text-sm px-2 rounded-full border bg-green-950 text-green-400 border-green-500">
                                                <i className="bi bi-check"></i>
                                                Set
                                            </span>
                                        ) : (
                                            <span className="inline-flex gap-1 text-sm px-2 rounded-full border bg-red-950 text-red-400 border-red-500">
                                                <i className="bi bi-x"></i>
                                                Unset
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        <UserStatusBadge status={user.status} />
                                    </td>
                                    <td className="p-2 group-not-last:border-b border-zinc-500">
                                        {user.permissions.length}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={9999}>
                                        <p className="w-full p-2 text-center opacity-60">
                                            No rows were found.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}