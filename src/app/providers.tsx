"use client";

import { AuthProvider } from "@/providers/authProvider";
import { QueryProvider } from "@/providers/queryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
