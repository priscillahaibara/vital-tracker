import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`rounded-md border border-neutral-400 px-3 py-1.5 focus:ring-2 focus:ring-black focus:outline-none ${className ?? ""}`}
    />
  );
}