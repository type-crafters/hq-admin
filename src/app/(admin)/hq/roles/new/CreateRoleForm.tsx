"use client";

import PermissionMatrix from "@/components/PermissionMatrix";
import { useState, useTransition, type JSX } from "react";
import { useRouter } from "next/navigation";
import { createRole } from "../actions";

export function CreateRoleForm(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePermissionChange = (newPermissions: string[]) => {
    setPermissions(newPermissions);
    setSuccess(false);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Role name is required");
      return;
    }

    startTransition(async () => {
      const result = await createRole({
        name: name.trim(),
        description: description.trim() || undefined,
        permissions
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/hq/roles");
        }, 1500);
      } else {
        setError(result.error || "Failed to create role");
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-bold opacity-60 mb-2">
            Role Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            placeholder="Enter role name"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-bold opacity-60 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null);
            }}
            placeholder="Enter role description (optional)"
            rows={3}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="border-t border-zinc-700 pt-6">
        <h2 className="text-lg font-semibold mb-4">Permissions</h2>
        <PermissionMatrix
          permissions={permissions}
          onChange={handlePermissionChange}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          <div className="flex items-center gap-2">
            <i className="bi bi-check-circle"></i>
            <span>Role created successfully! Redirecting...</span>
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
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed duration-150"
        >
          {isPending ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin"></i>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg"></i>
              <span>Create Role</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
