"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:8080";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getRoles(): Promise<Role[]> {
  try {
    const response = await fetch(`${API_URL}/api/hq/security/roles`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      next: { revalidate: 60 } // ISR: revalida cada 60 segundos
    });

    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}

export async function getRole(id: string): Promise<Role | null> {
  try {
    const response = await fetch(`${API_URL}/api/hq/security/roles/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      cache: "no-store" // Siempre fresh para detalles
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
}

export async function createRole(data: {
  name: string;
  description?: string;
  permissions: string[];
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/security/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to create role" }));
      return { success: false, error: error.error || "Failed to create role" };
    }

    // Revalidar caché de la lista de roles
    revalidatePath("/hq/security/roles");

    return { success: true };
  } catch (error) {
    console.error("Error creating role:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function updateRole(
  id: string,
  data: Partial<Role>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/security/roles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to update role" }));
      return { success: false, error: error.error || "Failed to update role" };
    }

    // Revalidar caché
    revalidatePath(`/hq/security/roles/${id}`);
    revalidatePath("/hq/security/roles");

    return { success: true };
  } catch (error) {
    console.error("Error updating role:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function deleteRole(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/hq/security/roles/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to delete role" }));
      return { success: false, error: error.error || "Failed to delete role" };
    }

    // Revalidar caché
    revalidatePath("/hq/security/roles");

    return { success: true };
  } catch (error) {
    console.error("Error deleting role:", error);
    return { success: false, error: "Internal server error" };
  }
}
