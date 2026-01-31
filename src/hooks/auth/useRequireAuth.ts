import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import type { Role } from "@/types/auth";

type RequireAuthOptions = {
  role?: Role;
  redirectTo?: string;
};

export function useRequireAuth(options?: RequireAuthOptions) {
  const router = useRouter();
  const { isAuthenticated, role, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (options?.role && role !== options.role) {
      router.replace(options.redirectTo ?? "/");
    }
  }, [isAuthenticated, role, loading, router, options]);

  return { loading };
}