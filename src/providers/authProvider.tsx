"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}