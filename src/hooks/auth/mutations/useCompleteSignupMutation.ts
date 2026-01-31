"use client";

import { useMutation } from "@tanstack/react-query";
import { completeInviteSignUp } from "@/services/auth/authService";
import type { User } from "@supabase/supabase-js";

export function useCompleteSignupMutation() {
  return useMutation<User, Error, string>({
    mutationFn: completeInviteSignUp,
  });
}
