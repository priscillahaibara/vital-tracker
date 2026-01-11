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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send invite");
      }

      setSuccess(`Invite sent to ${email}`);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "UnexpectedError");
    } finally {
      setLoading(false);
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
        <div className="mb-2 flex gap-2">
          <Input
            type="email"
            placeholder="user@example.com"
            className="flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" loading={loading}>
            Send Invite
          </Button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}
      </form>
    </div>
  );
}
