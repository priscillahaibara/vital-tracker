import { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {icon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={`w-full rounded-md border border-neutral-400 py-1.5 focus:ring-2 focus:ring-black focus:outline-none ${icon ? "pr-3 pl-10" : "px-3"}`}
      />
    </div>
  );
}
