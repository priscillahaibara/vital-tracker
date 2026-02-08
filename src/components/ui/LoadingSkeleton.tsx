type LoadingSkeletonProps = {
  rows: number;
  height: string;
  width?: string;
  space?: string;
};

export default function LoadingSkeleton({
  rows,
  height,
  width = "w-full",
  space = "space-y-2",
}: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${space}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`rounded bg-gray-200 ${width} ${height}`}></div>
      ))}
    </div>
  );
}
