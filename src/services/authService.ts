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

export async function completeInviteSignUp(password: string): Promise<User> {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error("User not returned by Supabase.");

  return data.user;
}

export async function updateProfileName(name: string): Promise<User> {
  const { data, error } = await supabase.auth.updateUser({data: { name }});

  if (error) throw error;
  if (!data.user) throw new Error('User not returned by Supabase.')

  return data.user;
}
