"use client";

import { AuthForm } from "@/components/common/AuthForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthForm title="Create your account" onSubmit={handleSubmit}>
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
    </AuthForm>
  );
}
