"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const { loading: authLoading } = useRequireAuth({
    role: "admin",
    redirectTo: "/dashboard",
  });

  const { session } = useAuth();

  const [email, setEmail] = useState("");

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        alert("Failed to send invite");
        return;
      }

      alert("Invite sent");
    } catch {
      alert("Network error");
    }
  }

  if (authLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md">
      <h1 className="mb-3 text-2xl font-bold">Invite User</h1>
      <form onSubmit={handleInvite}>
        <p className="mb-2">
          Admin-only page. Enter an email address to send an invitation:
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="user@example.com"
            className="flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Send Invite</Button>
        </div>
      </form>
    </div>
  );
}
