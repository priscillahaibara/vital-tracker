"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError(null);

    //simulate async work
    setTimeout(() => {
      console.log("Submitting name");
      setLoading(false);
    }, 500);
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
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
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
