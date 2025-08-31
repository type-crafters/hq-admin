import { JSX } from "react";
import UserProfile from "./UserProfile";

export default function AppSidebar(): JSX.Element {
    return (
        <aside className="h-full w-80 bg-white dark:bg-zinc-800 shadow-md p-4">
            <UserProfile />
        </aside>
    );
}