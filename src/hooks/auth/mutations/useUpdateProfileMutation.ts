import { useMutation } from "@tanstack/react-query";
import { updateProfileName } from "@/services/auth/authService";
import type { User } from "@supabase/supabase-js";

export function useUpdateProfileMutation() {
  return useMutation<User, Error, string>({
    mutationFn: updateProfileName,
  });
}
