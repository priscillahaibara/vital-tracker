"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/authService";
import type { User } from "@supabase/supabase-js";
import type { LoginCredentials } from "@/types/auth";

export function useLoginMutation() {
  return useMutation<User, Error, LoginCredentials>({
    mutationFn: signIn,
  });
}