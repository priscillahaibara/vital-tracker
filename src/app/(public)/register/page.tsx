"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { AuthForm } from "@/components/common/AuthForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCompleteSignupMutation } from "@/hooks/auth/mutations/useCompleteSignupMutation";

export default function Page() {
  const completeSignupMutation = useCompleteSignupMutation();
  const router = useRouter();

  const [isLoadingInvite, setIsLoadingInvite] = useState(true);
  const [inviteError, setInviteError] = useState<null | string>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<null | string>(null);

  const isInviteValid = !inviteError && !isLoadingInvite;

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

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    completeSignupMutation.mutate(password, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        setFormError(error.message);
      },
    });
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm password"
        minLength={6}
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        disabled={
          isLoadingInvite || !isInviteValid || completeSignupMutation.isPending
        }
        loading={completeSignupMutation.isPending}
      >
        Complete Signup
      </Button>

      {isLoadingInvite && <p className="text-sm">Validating invitation...</p>}
      {inviteError && <p className="text-sm text-red-500">{inviteError}</p>}
      {formError && <p className="text-sm text-red-500">{formError}</p>}
    </AuthForm>
  );
}
