import type { JSX } from "react";

interface ContentTypeBadgeProps {
    contentType: string;
}

export default function ContentTypeBadge({
    contentType
}: ContentTypeBadgeProps): JSX.Element | null {
    const [type, ...subType] = contentType.trim().toLowerCase().split("/");

    if (!type || !subType.length) return null;

    switch (type) {
        case "application":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-yellow-500 bg-yellow-950 text-yellow-400">
                    <i className="bi bi-braces-asterisk"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "image":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-red-500 bg-red-950 text-red-400">
                    <i className="bi bi-card-image"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "video":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-purple-500 bg-purple-950 text-purple-400">
                    <i className="bi bi-film"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "audio":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-green-500 bg-green-950 text-green-400">
                    <i className="bi bi-music-note-beamed"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "text":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-blue-500 bg-blue-950 text-blue-400">
                    <i className="bi bi-text-left"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "multipart":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-pink-500 bg-pink-950 text-pink-400">
                    <i className="bi bi-diagram-3"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "message":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-orange-500 bg-orange-950 text-orange-400">
                    <i className="bi bi-envelope"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        case "model":
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-teal-500 bg-teal-950 text-teal-400">
                    <i className="bi bi-box"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            );
        default:
            return (
                <span className="w-fit border rounded px-1 py-0.5 flex items-center gap-2 text-xs border-zinc-500 bg-zinc-900 text-zinc-400">
                    <i className="bi bi-question-lg"></i>
                    <div className="flex items-center gap-1">
                        <span>{type}</span>
                        <span>/</span>
                        <span>{subType.join("/")}</span>
                    </div>
                </span>
            ); 
    }
}