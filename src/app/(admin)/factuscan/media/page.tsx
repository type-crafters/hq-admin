"use client";
import { Media } from "@/common/interface/Media";
import { dateFormat } from "@/common/util";
import AccessBadge from "@/components/AccessBadge";
import ContentTypeBadge from "@/components/ContentTypeBadge";
import { useState, type JSX } from "react";

export default function MediaView(): JSX.Element {
    const [query, setQuery] = useState("");
    const [media, setMedia] = useState<Media[]>([]);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Media Library</h2>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="w-full max-w-sm rounded border border-zinc-500 bg-zinc-900/50 flex items-center gap-2 px-3 py-1 outline outline-transparent has-focus:outline-indigo-500 duration-150">
                        <i className="bi bi-search text-zinc-500"></i>
                        <input
                            type="text"
                            id="search"
                            className="flex-1 focus:outline-none placeholder:text-zinc-500"
                            placeholder="Search messages..."
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
                        Upload
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full rounded-lg border border-neutral-500 border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Filename</span>
                                    <button aria-label="Sort by filename" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Content type</span>
                                    <button aria-label="Sort by content type" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Size</span>
                                    <button aria-label="Sort by size" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Uploaded at</span>
                                    <button aria-label="Sort by upload date" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                            <th className="text-left font-bold border-b border-neutral-500 p-2">
                                <div className="flex items-center gap-1">
                                    <span>Visibility</span>
                                    <button aria-label="Sort by sender" className="rounded-full hover:bg-zinc-700 duration-150">
                                        <i className="bi bi-arrow-down-up text-[10px] p-1"></i>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {media.length ? media.map((file) => (
                            <tr className="group">
                                <td className="group-not-last:border-b border-zinc-500">
                                    {file.filename}
                                </td>
                                <td className="group-not-last:border-b border-zinc-500">
                                    <ContentTypeBadge contentType={file.contentType} />
                                </td>
                                <td className="group-not-last:border-b border-zinc-500">
                                    {file.filename}
                                </td>
                                <td className="group-not-last:border-b border-zinc-500">
                                    <time dateTime={file.uploadedAt.toISOString()}>
                                        {dateFormat.format(new Date(file.uploadedAt))}
                                    </time>
                                </td>
                                <td className="group-not-last:border-b border-zinc-500">
                                    <AccessBadge access={file.visibility} />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={9999}>
                                    <p className="w-full p-2 text-center opacity-60">No rows were found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}