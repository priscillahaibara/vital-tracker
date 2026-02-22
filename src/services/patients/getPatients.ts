import { supabase } from "@/lib/supabase/client";
import { Patient } from "@/types/patient";

export async function getPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("id, name, age, condition, risk_level")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
