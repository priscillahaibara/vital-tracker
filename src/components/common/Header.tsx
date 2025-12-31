"use client";

import { useLogoutMutation } from "@/hooks/useLogoutMutation";
import Link from "next/link";

export default function Header() {
  const logoutMutation = useLogoutMutation();

  const handleClick = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="flex w-full justify-between px-6 py-4">
      <Link href="/dashboard">Vital Tracker</Link>

      <button
        type="button"
        disabled={logoutMutation.isPending}
        onClick={handleClick}
      >
        {logoutMutation.isPending ? "Logging out..." : "Logout"}
      </button>
    </header>
  );
}