"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Page() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log("Submitting name");
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-3 text-2xl font-bold">Complete Profile</h1>
      <p className="mb-2">
        Before accessing the dashboard, please complete your profile
        information.
      </p>

      <form onSubmit={handleSubmit} className="mb-2 flex gap-2">
        <Input
          type="text"
          placeholder="Full name"
          className="flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
