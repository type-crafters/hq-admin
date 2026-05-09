import type { JSX } from "react";
import UserProfile from "./UserProfile";

export default function AdminHeader(): JSX.Element {
    return (
        <header className="sticky top-0 flex w-full items-center px-8 py-4 border-b border-zinc-500 bg-zinc-900">
            <div className="flex-1">
                <div className="flex items-center border border-zinc-500 rounded w-sm px-2 py-1 gap-3">
                    <i className="bi bi-search text-zinc-400"></i>
                    <input type="text" className="flex-1 focus:outline-none placeholder:text-zinc-400" placeholder="Search users, content..." />
                </div>
            </div>
            <div className="flex items-center gap-8">
                <button type="button" className="relative p-2 border border-zinc-500 hover:border-indigo-500 duration-150 text-zinc-400 rounded">
                    <span className="absolute flex justify-center items-center text-xs bg-orange-700 text-white font-semibold -top-1 -right-1 size-4 rounded-full">
                        9
                    </span>
                    <i className="bi bi-bell text-lg"></i>
                </button>
                <UserProfile firstName="Diego" lastName="Chan" role="Super Admin" />
                <button type="button" className="p-2 border border-zinc-500 hover:border-indigo-500 duration-150 text-zinc-400 rounded">
                    <i className="bi bi-door-closed text-lg"></i>
                </button>
            </div>
        </header>
    );
}