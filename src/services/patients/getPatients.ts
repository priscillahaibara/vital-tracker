import { supabase } from "@/lib/supabase/client";

export async function getPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select("id, name, age, condition, risk_level")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
