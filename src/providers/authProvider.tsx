"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session] = useState<Session | null>(null);
  const [user] = useState<User | null>(null);
  const [loading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
