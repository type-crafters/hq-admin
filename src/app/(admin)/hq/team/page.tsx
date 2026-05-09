"use client";

import { TeamMember } from "@/common/interface/TeamMember";
import { dateFormat } from "@/common/util";
import Image from "next/image";
import { useState, type JSX } from "react";

export default function ProjectListPage(): JSX.Element {
    const [query, setQuery] = useState("");
    const [team, setTeam] = useState<TeamMember[]>([]);
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Team</h2>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="w-full max-w-sm rounded border border-zinc-500 bg-zinc-900/50 flex items-center gap-2 px-3 py-1 outline outline-transparent has-focus:outline-indigo-500 duration-150">
                        <i className="bi bi-search text-zinc-500"></i>
                        <input
                            type="text"
                            id="search"
                            className="flex-1 focus:outline-none placeholder:text-zinc-500"
                            placeholder="Search projects..."
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
                    <button aria-label="Refresh table" className="rounded-full border border-zinc-500">
                        <i className="bi bi-arrow-clockwise text-lg p-2"></i>
                    </button>
                    <button className="flex items-center gap-1 px-4 py-1 rounded border border-zinc-500">
                        <span>Actions</span>
                        <i className="bi bi-caret-down-fill text-xs"></i>
                    </button>
                    <button
                        className="flex items-center gap-1 px-4 py-1 rounded bg-indigo-500 border border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 duration-150"
                    >
                        New member
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full rounded-lg border border-neutral-500 border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>ID</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Full name</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Email</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Role</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Created at</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.length ? team.map((member) => (
                            <tr key={member.id} className="group">
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    {member.id}
                                </td>

                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <figure className="flex items-center gap-2">
                                        <Image
                                            src={member.profilePictureUrl} 
                                            alt={`${member.firstName} ${member.lastName}'s profile`}
                                            className="size-10 rounded-full object-cover object-center"
                                        />
                                        <legend>
                                            {member.firstName} {member.lastName}
                                        </legend>
                                    </figure>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <a href={`mailto:${member.email}`} className="hover:underline">
                                        {member.email}
                                    </a>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <span className="inline-flex items-center rounded-full border border-zinc-600 bg-zinc-800 px-2 py-0.5 text-sm">
                                        {member.role}
                                    </span>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <time dateTime={new Date(member.createdAt).toISOString()}>
                                        {dateFormat.format(new Date(member.createdAt))}
                                    </time>
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
    );
}