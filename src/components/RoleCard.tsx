import type { Role } from "@/common/interface/Role";
import { getUserRoleDisplay, UserRole } from "@/common/enum/UserRole";
import type { JSX } from "react";

interface RoleCardProps {
    role: Role;
    onEdit?: (role: Role) => void;
}

export default function RoleCard({ role, onEdit }: RoleCardProps): JSX.Element {
    const displayInfo = getUserRoleDisplay(role.name as UserRole);
    const permissionCount = role.permissions.length;

    return (
        <div className="bg-zinc-700 border border-zinc-500 rounded-lg p-6 space-y-4 hover:border-zinc-400 duration-150">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500 flex items-center justify-center">
                        <i className="bi bi-shield-check text-indigo-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{displayInfo.name}</h3>
                        <p className="text-xs opacity-60 uppercase tracking-wide">{role.name}</p>
                    </div>
                </div>
                {onEdit && (
                    <button
                        onClick={() => onEdit(role)}
                        className="p-2 rounded hover:bg-zinc-600 duration-150 opacity-60 hover:opacity-100"
                        title="Edit role"
                    >
                        <i className="bi bi-pencil"></i>
                    </button>
                )}
            </div>

            <p className="text-sm opacity-80 leading-relaxed">
                {displayInfo.description}
            </p>

            <div className="pt-4 border-t border-zinc-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-key opacity-60"></i>
                        <span className="text-sm opacity-80">
                            {permissionCount} permission{permissionCount !== 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {permissionCount > 0 && role.permissions.slice(0, 3).map((perm, idx) => (
                            <span 
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-zinc-800/60 border border-zinc-600 opacity-80"
                            >
                                {perm.split(":")[0]}
                            </span>
                        ))}
                        {permissionCount > 3 && (
                            <span className="text-xs px-2 py-1 rounded bg-zinc-800/60 border border-zinc-600 opacity-60">
                                +{permissionCount - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
