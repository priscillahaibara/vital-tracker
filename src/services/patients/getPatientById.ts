import { supabase } from "@/lib/supabase/client";

export async function getPatientById(id: string) {
  if (!id) throw new Error("Patient ID is required.");

  const { data, error } = await supabase
    .from("patients")
    .select("id, name, age, condition, risk_level")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
