import { MediaVisbility } from "@/common/interface/MediaVisibility";
import type { JSX } from "react";

interface AccessBadgeProps {
    access: MediaVisbility;
}

export default function AccessBadge({
    access
}: AccessBadgeProps): JSX.Element {
    const titled = access.at(0)?.toUpperCase() + access.slice(1).toLowerCase();

    switch (access) {
        case "public":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-blue-500 bg-blue-950 text-blue-400">
                    <i className="bi bi-globe"></i>
                    <span>{titled}</span>
                </span>
            );
        case "protected":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-purple-500 bg-purple-950 text-purple-400">
                    <i className="bi bi-lock"></i>
                    <span>{titled}</span>
                </span>
            );
        case "private":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-red-500 bg-red-950 text-red-400">
                    <i className="bi bi-ban"></i>
                    <span>{titled}</span>
                </span>
            );
    }
}
