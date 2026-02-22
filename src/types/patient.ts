export const CONDITIONS = ["diabetes", "hypertension"] as const;

export type Condition = (typeof CONDITIONS)[number];

export const CONDITION_LABELS: Record<Condition, string> = {
  diabetes: "Diabetes",
  hypertension: "Hypertension",
};

export const CONDITION_OPTIONS = CONDITIONS.map((condition) => ({
  id: condition,
  label: CONDITION_LABELS[condition],
}));

export type CreatePatientInput = {
  name: string;
  age: number;
  condition: Condition[] | null;
};

export type RiskLevel = "low" | "medium" | " high";

export type Patient = {
  id: string;
  name: string;
  age: number;
  condition: Condition[] | null;
  risk_level: RiskLevel;
};
