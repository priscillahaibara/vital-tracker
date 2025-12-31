"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/services/authService";

export function useLogoutMutation() {
  return useMutation({
    mutationFn: signOut,
  });
}