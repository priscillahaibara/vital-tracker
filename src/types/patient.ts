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