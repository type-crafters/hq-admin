"use client";

import { ListResponse } from "@/common/interface/ListResponse";
import { Optional } from "@/common/interface/Optional";
import { ResponseMetadata } from "@/common/interface/ResponseMetadata";
import { OptionalToastContent } from "@/common/interface/ToastContent";
import { User } from "@/common/interface/User";
import ExportDialog from "@/components/ExportDialog";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import UserStatusBadge from "@/components/UserStatusBadge";
import Link from "next/link";
import { SyntheticEvent, useEffect, useRef, useState, type JSX } from "react";

export default function UserListView(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [meta, setMeta] = useState<Optional<ResponseMetadata>>({});

    const [exportOpen, setExportOpen] = useState<boolean>(false);
    const [toast, setToast] = useState<OptionalToastContent>({});

    const checkboxRef = useRef<HTMLInputElement>(null);

    const fetchUsers = () => {
        setLoading(true);
        if (users.length) setUsers([]);
        fetch("/api/hq/users")
            .then(response => response.json())
            .then((payload) => {
                if (payload.error) {
                    throw new Error(payload.error);
                }
                setUsers(payload.data);
                setMeta(payload.meta ?? {});
            })
            .catch(error => setToast({ title: "Error", message: error.message || String(error) }))
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    const closeDropdown = (event: SyntheticEvent) => {
        event.stopPropagation();
        if (checkboxRef.current) checkboxRef.current.checked = false;
    }

    useEffect(fetchUsers, []);

    return (
        <>
            <ExportDialog resource="users" id="export" open={exportOpen} setOpen={setExportOpen} entities={users} />
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
                            <input type="checkbox" className="peer hidden" ref={checkboxRef} />
                            <span>Actions</span>
                            <i className="bi bi-caret-down-fill text-xs"></i>

                            <ul
                                className="absolute top-full right-0 min-w-40 w-max my-2 bg-zinc-800  border border-zinc-500 py-2 rounded invisible opacity-0  pointer-events-none peer-checked:visible peer-checked:opacity-100  peer-checked:pointer-events-auto  duration-300"
                            >
                                <li className="px-4 py-2 hover:bg-zinc-700 duration-150">
                                    <button
                                        type="button"
                                        onClick={(e) => { closeDropdown(e); setExportOpen(true); }}
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