"use client";

import { Project } from "@/common/interface/Project";
import { dateFormat } from "@/common/util";
import { useState, type JSX } from "react";

export default function ProjectListPage(): JSX.Element {
    const [query, setQuery] = useState("");
    const [projects, setProjects] = useState<Project[]>([]);
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Projects</h2>
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
                        New project
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
                                    <span>Project Name</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Description</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Text</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Tags</span>
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
                        {projects.length ? projects.map((project) => (
                            <tr key={project.id} className="group">
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    {project.id}
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={project.thumbnailUrl}
                                            alt={`${project.projectName} thumbnail`}
                                            className="w-10 h-10 rounded object-cover border border-zinc-500"
                                        />
                                        <span>{project.projectName}</span>
                                    </div>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <p className="max-w-xs truncate">
                                        {project.description}
                                    </p>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <p className="max-w-xs truncate">
                                        {project.text}
                                    </p>
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    {project.tags.length ? (
                                        <span className="inline-flex items-center rounded-full border border-zinc-600 bg-zinc-800 px-2 py-0.5 text-sm">
                                            {project.tags.length} {project.tags.length === 1 ? "tag" : "tags"}
                                        </span>
                                    ) : (
                                        <em className="opacity-60">No tags</em>
                                    )}
                                </td>
                                <td className="p-2 group-not-last:border-b border-zinc-500">
                                    <time dateTime={new Date(project.createdAt).toISOString()}>
                                        {dateFormat.format(new Date(project.createdAt))}
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