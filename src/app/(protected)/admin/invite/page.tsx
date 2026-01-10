"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const { loading: authLoading } = useRequireAuth({
    role: "admin",
    redirectTo: "/dashboard",
  });

  if (authLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md">
      <h1 className="mb-3 text-2xl font-bold">Invite User</h1>
      <form>
        <p className="mb-2">
          Admin-only page. Enter an email address to send an invitation:
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="user@example.com"
            disabled
            className="flex-1"
          />
          <Button type="submit" disabled>Send Invite</Button>
        </div>
      </form>
    </div>
  );
}
