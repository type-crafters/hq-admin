import { JSX } from "react";
import UserProfile from "./UserProfile";

export default function AppSidebar(): JSX.Element {
    const navigation: Navigation = {
        Blog: {
            "All posts": "/blog/posts",
            "Create a post": "/blog/new",
        }
    };
    const renderNavTree = (navigation: Navigation): JSX.Element => (
        <ul className="flex flex-col gap-1">
            {Object.entries(navigation).map(([label, value]) => {
                if (typeof value === "string") {
                    return (
                        <li key={label} className="rounded-lg hover:bg-slate-100 duration-200 p-1 cursor-pointer">
                            <a href={value}>
                                {label}
                            </a>
                        </li>
                    );
                } else {
                    return (
                        <li key={label}>
                            <details className="group *:not-[summary]:pl-4 *:not-[summary]:border-l *:not-[summary]:border-slate-400/70">
                                <summary
                                    className="p-1 cursor-pointer marker:hidden flex w-full justify-between items-center flex-1 after:chevron-right after:rotate-0 after:px-2 group-open:after:rotate-90 after:duration-200 rounded-lg hover:bg-slate-100 duration-200"
                                >{label}</summary>
                                {renderNavTree(value)}
                            </details>
                        </li>
                    );
                }
            })}
        </ul>
    );
    return (
        <aside className="h-full w-80 bg-white dark:bg-zinc-800 shadow-md p-4">
            <UserProfile />
            <nav id="side-navigation" className="p-2 rounded-lg">
                {renderNavTree(navigation)}
            </nav>
        </aside>
    );
}

type Navigation = {
    [key: string]: string | Navigation;
};