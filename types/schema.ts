// ============================================
// Day 1 Deliverable: TypeScript Schema
// ============================================

export type UUID = string;
export type ISODateString = string;

export type Role = "admin" | "editor" | "viewer";
export type Status = "active" | "inactive" | "pending";

export interface User {
  id: UUID;
  email: string;
  name: string;
  role: Role;
  status: Status;
  avatarUrl?: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

export type Post = {
  id: UUID;
  title: string;
  content: string;
  authorId: UUID;
  publishedAt: ISODateString | null;
  tags: string[];
};

export type ApiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string; code?: number };

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  meta?: {
    page: number;
    perPage: number;
    total: number;
  };
}

export type Paginated<T> = {
  items: T[];
  page: number;
  perPage: number;
  total: number;
};

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function getById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find((item) => item.id === id);
}

export function formatUser(user: User | null | undefined): string {
  if (!user) return "Unknown user";
  const avatar = user.avatarUrl ?? "no-avatar.png";
  return `${user.name} (${user.role}) - ${avatar}`;
}

export function isAdmin(user: User): user is AdminUser {
  return user.role === "admin" && Array.isArray((user as AdminUser).permissions);
}

export function renderState<T>(state: ApiState<T>): string {
  switch (state.status) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading...";
    case "success":
      return `Success: ${JSON.stringify(state.data)}`;
    case "error":
      return `Error ${state.code ?? 500}: ${state.message}`;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

export type UserPreview = Pick<User, "id" | "name" | "email">;
export type UserUpdate = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
export type UserMap = Record<UUID, User>;

export type Coordinate = [number, number];
export type Tags = readonly string[];