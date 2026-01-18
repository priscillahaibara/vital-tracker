"use client";

type AuthFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export function AuthForm({ title, onSubmit, children }: AuthFormProps) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm flex-col gap-3 px-8 py-4"
      >
        <h1 className="mb-2 text-center text-2xl font-bold">{title}</h1>

        {children}
      </form>
    </main>
  );
}
