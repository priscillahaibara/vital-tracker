"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useLogoutMutation } from "@/hooks/auth/mutations/useLogoutMutation";
import Link from "next/link";

export default function Header() {
  const { name } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleClick = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex w-full justify-between px-6 py-4">
      <Link href="/dashboard">Vital Tracker</Link>

      <nav>
        <Link href="/patients/list">Patients</Link>
      </nav>

      <div className="flex gap-4">
        {name && <p>{name}</p>}
        <button
          type="button"
          disabled={logoutMutation.isPending}
          onClick={handleClick}
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
