import { UserStatus } from "@/common/enum/UserStatus";
import type { JSX } from "react";

interface UserStatusBadgeProps {
    status: UserStatus;
}

export default function UserStatusBadge({
    status
}: UserStatusBadgeProps): JSX.Element {
    const titled = status.at(0)?.toUpperCase() + status.slice(1).toLowerCase();

    switch (status) {
        case UserStatus.Unverified:
            return (
                <span className="w-fit border rounded-full px-2 py-0.5 flex items-center gap-2 text-xs border-yellow-500 bg-yellow-950 text-yellow-400">
                    <i className="bi bi-exclamation-triangle"></i>
                    <span>{titled}</span>
                </span>
            );
        case UserStatus.Active:
            return (
                <span className="w-fit border rounded-full px-2 py-0.5 flex items-center gap-2 text-xs border-green-500 bg-green-950 text-green-400">
                    <i className="bi bi-check-circle"></i>
                    <span>{titled}</span>
                </span>
            );
        case UserStatus.Suspended:
            return (
                <span className="w-fit border rounded-full px-2 py-0.5 flex items-center gap-2 text-xs border-red-500 bg-red-950 text-red-400">
                    <i className="bi bi-ban"></i>
                    <span>{titled}</span>
                </span>
            );
    }
}
