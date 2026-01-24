import type { User } from "@supabase/supabase-js";

export function isProfileComplete(user: User | null): boolean {
  if (!user) return false;

  const name = user.user_metadata?.name;
  const hasValidName = typeof name === "string" && name.trim().length > 0;

  return hasValidName;
}
