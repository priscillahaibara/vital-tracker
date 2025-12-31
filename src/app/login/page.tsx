"use client";

import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          className="rounded-md border bg-neutral-800 px-3 py-1.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Login
        </button>
      </form>
    </main>
  );
}