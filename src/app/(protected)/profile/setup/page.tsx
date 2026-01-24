"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateProfileMutation } from "@/hooks/useUpdateProfileMutation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const updateProfileMutation = useUpdateProfileMutation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setError(null);

    updateProfileMutation.mutate(name, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-3 text-2xl font-bold">Complete Profile</h1>
      <p className="mb-2">
        Before accessing the dashboard, please complete your profile
        information.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex gap-2">
          <Input
            type="text"
            placeholder="Full name"
            className="flex-1"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
          />
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            loading={updateProfileMutation.isPending}
            loadingLabel="Submitting..."
          >
            Submit
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
