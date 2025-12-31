"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useAuth } from "@/hooks/useAuth";

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

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-neutral-400 px-3 py-1.5"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-neutral-400 px-3 py-1.5"
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="rounded-md border bg-neutral-800 px-3 py-1.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
        {loginMutation.isError && (
          <p className="text-sm text-red-500">{loginMutation.error.message}</p>
        )}
      </form>
    </main>
  );
}