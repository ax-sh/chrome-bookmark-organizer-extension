import { clsx } from "clsx";
import { DateTime } from "luxon";
import { DurationUnits } from "luxon";

export function ElapsedTime({
  unix,
  className,
  args = [
    "years",
    "days",
    "hours",
    // 'minutes'
  ],
}: {
  unix: number;
  className?: string;
  args?: DurationUnits;
}) {
  const pastTime = DateTime.fromMillis(unix);
  const now = DateTime.now();
  const elapsed = now.diff(pastTime, args);
  return (
    <time className={clsx("text-[0.5rem]", className)} title={`[${unix}]`}>
      {elapsed.toHuman()} ago
    </time>
  );
}
