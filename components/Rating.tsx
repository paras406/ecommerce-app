export default function Rating({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span
      className="flex items-center gap-1 text-sm text-amber-500"
      aria-label={`Rated ${value} out of 5`}
    >
      <span aria-hidden="true">
        {"★".repeat(Math.floor(rounded))}
        {rounded % 1 !== 0 ? "½" : ""}
      </span>
      <span className="text-neutral-500 dark:text-neutral-400">
        {value.toFixed(2)}
      </span>
    </span>
  );
}
