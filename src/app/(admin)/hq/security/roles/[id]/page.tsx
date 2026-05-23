import { notFound } from "next/navigation";
import type { JSX } from "react";
import { getRole } from "../../actions";
import { RoleEditForm } from "./RoleEditForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoleDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params;
  const role = await getRole(id);

  if (!role) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <a
          href="/hq/security/roles"
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 duration-150"
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to Roles</span>
        </a>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{role.name}</h1>
            {role.description && (
              <p className="text-sm opacity-60 mt-1">{role.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-700 text-sm">
            <i className="bi bi-key opacity-60"></i>
            <span>{role.permissions.length} permissions</span>
          </div>
        </div>

        <RoleEditForm initialRole={role} />
      </div>
    </div>
  );
}
