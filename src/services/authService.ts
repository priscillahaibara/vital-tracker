import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { LoginCredentials } from "@/types/auth";

export async function signIn(credentials: LoginCredentials): Promise<User> {
  const { email, password } = credentials;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user) throw new Error("User not returned by Supabase");

  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}