import { supabase } from "@/lib/supabase/client";
import type { CreatePatientInput } from "@/types/patient";

export async function createPatient(input: CreatePatientInput) {
  const { name, age, condition } = input;

  if (!name.trim() || Number.isNaN(age) || age < 0 || age > 130) {
    throw new Error("Invalid patient data.");
  }

  const { data, error } = await supabase
    .from("patients")
    .insert({
      name,
      age,
      condition: condition?.length ? condition : null,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
