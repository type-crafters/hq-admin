import Link from "next/link";
import type { JSX } from "react";

export default function AdminSidebar(): JSX.Element {
    return (
        <aside className="sticky top-0 inset-y-0 flex flex-col w-80 bg-zinc-900 border-r border-zinc-500">
            <Link
                href="/dashboard"
                className="not-last:border-b border-zinc-500 flex items-center gap-4 p-6"
            >
                <div className="rounded-lg border border-indigo-500 bg-indigo-600/20 text-indigo-400 p-2">
                    <i className="bi bi-cpu text-2xl"></i>
                </div>

                <div className="space-y-2">
                    <h1 className="text-xl font-bold text-indigo-500">
                        TypeCrafters HQ
                    </h1>
                    <p className="text-xs opacity-60 uppercase">Admin Panel</p>
                </div>
            </Link>
            <nav className="not-last:border-b border-zinc-500 flex-1 py-6 px-3 space-y-2">
                <h2 className="text-xs uppercase font-bold opacity-60">
                    Navigation
                </h2>
                <div className="py-1">
                    <details className="group">
                        <summary className="flex items-center focus:outline-none gap-3 px-3 py-2 rounded cursor-pointer hover:bg-zinc-700 duration-150 list-none">
                            <div className="w-5 flex justify-center">
                                <i className="bi bi-building text-lg"></i>
                            </div>

                            <span className="flex-1 font-medium">HQ</span>

                            <i className="bi bi-chevron-down text-xs group-open:rotate-180 duration-150"></i>
                        </summary>

                        <ul className="mt-2 ml-6 space-y-2 border-l border-zinc-700 pl-4">
                            <li>
                                <Link
                                    href="/hq/users"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-person-circle"></i>
                                    <p>Users</p>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/hq/roles"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-person-vcard"></i>
                                    <p>Roles</p>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/hq/projects"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-archive text-lg"></i>
                                    <p>Projects</p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/hq/blog"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-file-richtext text-lg"></i>
                                    <p>Blog Posts</p>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/hq/messages"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-envelope text-lg"></i>
                                    <p>Messages</p>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </div>
                <div className="py-1">
                    <details className="group">
                        <summary className="flex items-center focus:outline-none gap-3 px-3 py-2 rounded cursor-pointer hover:bg-zinc-700 duration-150 list-none">
                            <div className="w-5 flex justify-center">
                                <i className="bi bi-receipt text-lg"></i>
                            </div>

                            <span className="flex-1 font-medium">FactuScan</span>

                            <i className="bi bi-chevron-down text-xs group-open:rotate-180 duration-150"></i>
                        </summary>
                        <ul className="mt-2 ml-6 space-y-2 border-l border-zinc-700 pl-4">
                            <li>
                                <Link
                                    href="/factuscan/media"
                                    className="flex items-center gap-2 px-3 py-2 rounded opacity-60 hover:opacity-100 hover:bg-zinc-700 duration-150"
                                >
                                    <i className="bi bi-images text-lg"></i>
                                    <p>Media</p>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </div>
            </nav>

            <div className="not-last:border-b border-zinc-500 px-3 py-6 space-y-2">
                <Link
                    href="/hq/security/roles"
                    className="flex p-3 gap-4 items-center hover:bg-zinc-700 duration-150 rounded-lg"
                >
                    <div className="w-5 flex justify-center">
                        <i className="bi bi-shield text-lg"></i>
                    </div>
                    <p>Security</p>
                </Link>

                <Link
                    href="/hq/settings/general"
                    className="flex p-3 gap-4 items-center hover:bg-zinc-700 duration-150 rounded-lg"
                >
                    <div className="w-5 flex justify-center">
                        <i className="bi bi-gear text-lg"></i>
                    </div>
                    <p>Settings</p>
                </Link>
            </div>
        </aside>
    );
}