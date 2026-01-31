"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/services/auth/authService";

export function useLogoutMutation() {
  return useMutation({
    mutationFn: signOut,
  });
}