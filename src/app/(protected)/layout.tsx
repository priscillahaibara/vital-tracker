"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { isProfileComplete } from "@/lib/auth/profile";
import Header from "@/components/common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isProfileComplete(user)) {
      router.replace("/profile/setup");
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <main className="px-6 py-4">{children}</main>
    </div>
  );
}
