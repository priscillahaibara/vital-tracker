"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Page() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const { isAuthenticated, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ email, password });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-3 px-8 py-4"
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          Welcome to Vital Tracker
        </h1>

        <Input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          loadingLabel="Logging in..."
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Login
        </Button>

        {loginMutation.isError && (
          <p className="text-sm text-red-500">{loginMutation.error.message}</p>
        )}
      </form>
    </main>
  );
}
