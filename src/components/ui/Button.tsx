"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingLabel?: string;
};

export function Button({
  loading,
  loadingLabel = "Loading...",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`cursor-pointer rounded-md border bg-neutral-800 px-3 py-1.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
