"use client";

import { PermissionAction } from "@/common/enum/PermissionAction";
import { PermissionEntity } from "@/common/enum/PermissionEntity";
import { useCallback, useEffect, useRef, useState, type JSX } from "react";

interface PermissionMatrixProps {
    permissions: string[];
    onChange: (permissions: string[]) => void;
    readOnly?: boolean;
}

const ACTION_ORDER: PermissionAction[] = [
    PermissionAction.CREATE,
    PermissionAction.LIST,
    PermissionAction.UPDATE,
    PermissionAction.DELETE
];

const ENTITY_ORDER: PermissionEntity[] = [
    PermissionEntity.USER,
    PermissionEntity.PROJECT,
    PermissionEntity.POST,
    PermissionEntity.MESSAGE,
    PermissionEntity.FILE
];

function formatAction(action: PermissionAction): string {
    return action.charAt(0).toUpperCase() + action.slice(1);
}

function formatEntity(entity: PermissionEntity): string {
    return entity.charAt(0).toUpperCase() + entity.slice(1);
}

function getPermissionKey(action: PermissionAction, entity: PermissionEntity): string {
    return `${action}:${entity}`;
}

export default function PermissionMatrix({
    permissions,
    onChange,
    readOnly = false
}: PermissionMatrixProps): JSX.Element {
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set(permissions));

    useEffect(() => {
        setSelectedPermissions(prev => {
            const next = new Set(permissions);
            if (prev.size !== next.size) return next;
            for (const val of prev) {
                if (!next.has(val)) return next;
            }
            return prev;
        });
    }, [permissions]);

    const togglePermission = useCallback((action: PermissionAction, entity: PermissionEntity) => {
        if (readOnly) return;

        const key = getPermissionKey(action, entity);
        setSelectedPermissions(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }, [readOnly]);

    const toggleAllForEntity = useCallback((entity: PermissionEntity) => {
        if (readOnly) return;

        setSelectedPermissions(prev => {
            const next = new Set(prev);
            const entityPermissions = ACTION_ORDER.map(action => getPermissionKey(action, entity));
            const allSelected = entityPermissions.every(key => next.has(key));

            if (allSelected) {
                entityPermissions.forEach(key => next.delete(key));
            } else {
                entityPermissions.forEach(key => next.add(key));
            }
            return next;
        });
    }, [readOnly]);

    useEffect(() => {
        onChangeRef.current(Array.from(selectedPermissions));
    }, [selectedPermissions]);

    const isEntityAllSelected = (entity: PermissionEntity): boolean => {
        return ACTION_ORDER.every(action => selectedPermissions.has(getPermissionKey(action, entity)));
    };

    const isEntityPartiallySelected = (entity: PermissionEntity): boolean => {
        const selectedCount = ACTION_ORDER.filter(action => 
            selectedPermissions.has(getPermissionKey(action, entity))
        ).length;
        return selectedCount > 0 && selectedCount < ACTION_ORDER.length;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-zinc-600">
                        <th className="text-left py-3 px-4 text-sm font-semibold opacity-80">
                            Entity
                        </th>
                        {ACTION_ORDER.map(action => (
                            <th 
                                key={action} 
                                className="text-center py-3 px-4 text-sm font-semibold opacity-80 w-24"
                            >
                                {formatAction(action)}
                            </th>
                        ))}
                        {!readOnly && (
                            <th className="text-center py-3 px-4 text-sm font-semibold opacity-80 w-28">
                                All
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {ENTITY_ORDER.map(entity => (
                        <tr key={entity} className="border-b border-zinc-700/50 hover:bg-zinc-800/30">
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                    <i className={`bi ${getEntityIcon(entity)} opacity-60`}></i>
                                    <span className="font-medium">{formatEntity(entity)}</span>
                                </div>
                            </td>
                            {ACTION_ORDER.map(action => {
                                const key = getPermissionKey(action, entity);
                                const isChecked = selectedPermissions.has(key);
                                return (
                                    <td key={key} className="py-3 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => togglePermission(action, entity)}
                                            disabled={readOnly}
                                            className="w-5 h-5 rounded border-zinc-600 bg-zinc-800/60 text-indigo-500 focus:outline-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </td>
                                );
                            })}
                            {!readOnly && (
                                <td className="py-3 px-4 text-center">
                                    <button
                                        type="button"
                                        onClick={() => toggleAllForEntity(entity)}
                                        className={`text-sm px-3 py-1 rounded duration-150 ${
                                            isEntityAllSelected(entity)
                                                ? "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                                                : isEntityPartiallySelected(entity)
                                                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                                    : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                                        }`}
                                    >
                                        {isEntityAllSelected(entity) ? "Clear" : "Select"}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function getEntityIcon(entity: PermissionEntity): string {
    switch (entity) {
        case PermissionEntity.USER:
            return "bi-person";
        case PermissionEntity.PROJECT:
            return "bi-archive";
        case PermissionEntity.POST:
            return "bi-file-richtext";
        case PermissionEntity.MESSAGE:
            return "bi-envelope";
        case PermissionEntity.FILE:
            return "bi-file-earmark";
        default:
            return "bi-question-circle";
    }
}
