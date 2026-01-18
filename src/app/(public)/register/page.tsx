"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { AuthForm } from "@/components/common/AuthForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const [isLoadingInvite, setIsLoadingInvite] = useState(true);
  const [inviteError, setInviteError] = useState<null | string>(null);

  useEffect(() => {
    const validateInvite = async () => {
      try {
        const hash = window.location.hash;

        if (!hash) throw new Error("missing_hash");

        const params = new URLSearchParams(hash.replace("#", ""));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (!access_token || !refresh_token) throw new Error("missing_tokens");

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) throw error;
      } catch {
        setInviteError("This invitation link is invalid or expired");
      } finally {
        setIsLoadingInvite(false);
      }
    };

    validateInvite();
  }, []);

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

      {isLoadingInvite && <p className="text-sm">Validating invitation...</p>}
      {inviteError && <p className="text-sm text-red-500">{inviteError}</p>}
    </AuthForm>
  );
}
