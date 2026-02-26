import type { UserStatus } from "@typecrafters/hq-types";

export const userColors: Record<UserStatus, string> = {
  unverified: "badge-ghost",
  pending: "badge-warning",
  active: "badge-success",
  deleted: "badge-error",
} as const;