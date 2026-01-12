"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
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
          Create your account
        </h1>
        <p>
          Complete your signup using the invitation link you received in your
          email.
        </p>
        <Input
          type="password"
          placeholder="Set password"
          minLength={6}
          required
        />
        <Input
          type="password"
          placeholder="Confirm password"
          minLength={6}
          required
        />
        <Button type="submit">Create Account</Button>
      </form>
    </main>
  );
}
