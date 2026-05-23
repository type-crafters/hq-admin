import type { JSX } from "react";
import { CreateRoleForm } from "./CreateRoleForm";

export default function NewRolePage(): JSX.Element {
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

      <div>
        <h1 className="text-2xl font-bold">Create New Role</h1>
        <p className="text-sm opacity-60 mt-1">
          Create a new role with custom permissions
        </p>
      </div>

      <CreateRoleForm />
    </div>
  );
}
