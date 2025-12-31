import Header from "@/components/common/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="px-6 py-4">{children}</main>
    </div>
  );
}