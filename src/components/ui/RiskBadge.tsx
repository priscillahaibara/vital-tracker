import { RiskLevel } from "@/types/patient";

interface RiskBadgeProps {
  level: RiskLevel | null | undefined;
}

const styles = {
  low: "bg-green-300",
  medium: "bg-yellow-300",
  high: "bg-red-300",
};

const labels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  if (!level) {
    return (
      <span className="rounded-full bg-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700">
        -
      </span>
    );
  }

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium text-neutral-900 ${styles[level]}`}
    >
      {labels[level]}
    </span>
  );
}
