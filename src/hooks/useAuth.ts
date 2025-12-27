import { AuthContext } from "@/providers/authProvider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be inside AuthProvider");

  return context;
}
