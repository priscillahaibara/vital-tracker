import { RiskLevel } from "@/types/patient";

interface RiskBadgeProps {
  level: RiskLevel | null | undefined;
}

const styles = {
  High: "bg-red-100",
  Medium: "bg-yellow-100",
  Low: "bg-green-100",
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
      className={`rounded-full px-2 py-1 text-xs font-medium text-neutral-700 ${styles[level]}`}
    >
      {level}
    </span>
  );
}
