import { Suspense } from "react";
import type { Role } from "@/common/interface/Role";
import RoleCard from "@/components/RoleCard";
import Link from "next/link";
import type { JSX } from "react";
import { getRoles } from "../actions";

async function RolesList(): Promise<JSX.Element> {
  const roles = await getRoles();

  if (roles.length === 0) {
    return (
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-700 flex items-center justify-center">
          <i className="bi bi-shield text-2xl opacity-60"></i>
        </div>
        <h3 className="text-lg font-semibold mb-2">No roles found</h3>
        <p className="text-sm opacity-60 mb-4">
          Get started by creating your first security role
        </p>
        <Link
          href="/hq/security/roles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-150"
        >
          <i className="bi bi-plus-lg"></i>
          <span>Create Role</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.map((role) => (
        <Link
          key={role.id}
          href={`/hq/security/roles/${role.id}`}
          className="block"
        >
          <RoleCard role={role} />
        </Link>
      ))}
    </div>
  );
}

function RolesListSkeleton(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-700"></div>
            <div className="flex-1">
              <div className="h-4 bg-zinc-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-zinc-700 rounded w-20"></div>
            </div>
          </div>
          <div className="h-3 bg-zinc-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

export default async function RolesPage(): Promise<JSX.Element> {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security Roles</h1>
          <p className="text-sm opacity-60 mt-1">
            Manage user roles and their permissions
          </p>
        </div>
        <Link
          href="/hq/security/roles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-150"
        >
          <i className="bi bi-plus-lg"></i>
          <span>New Role</span>
        </Link>
      </div>

      <Suspense fallback={<RolesListSkeleton />}>
        <RolesList />
      </Suspense>
    </div>
  );
}
