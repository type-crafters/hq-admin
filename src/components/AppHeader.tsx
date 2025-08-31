import { JSX } from "react";

export default function AppHeader(): JSX.Element {
    return (
        <header className="w-full flex bg-white dark:bg-zinc-800 px-8 py-3 shadow-md">
            <a href="/" title="Go to dashboard">
                <h1 className="text-2xl font-semibold">HQ Admin</h1>
            </a>
        </header>
    );
}