"use client";

import type { Role } from "@/common/interface/Role";
import PermissionMatrix from "@/components/PermissionMatrix";
import { useState, useTransition, type JSX } from "react";
import { useRouter } from "next/navigation";
import { updateRole } from "../actions";

interface RoleEditFormProps {
  initialRole: Role;
}

export function RoleEditForm({ initialRole }: RoleEditFormProps): JSX.Element {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole);
  const [isPending, startTransition] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePermissionChange = (permissions: string[]) => {
    setRole({ ...role, permissions });
    setSaveSuccess(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateRole(role.id, {
        name: role.name,
        description: role.description,
        permissions: role.permissions
      });

      if (result.success) {
        setSaveSuccess(true);
        router.refresh();
      } else {
        setSaveError(result.error || "Failed to save changes");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-t border-zinc-700 pt-6">
        <h2 className="text-lg font-semibold mb-4">Permissions</h2>
        <PermissionMatrix
          permissions={role.permissions}
          onChange={handlePermissionChange}
        />
      </div>

      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-exclamation-circle"></i>
            <span>{saveError}</span>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-check-circle"></i>
            <span>Changes saved successfully</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-700">
        <a
          href="/hq/roles"
          className="px-4 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 duration-150"
        >
          Cancel
        </a>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed duration-150"
        >
          {isPending ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin"></i>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <i className="bi bi-check-lg"></i>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
