import { clsx } from 'clsx';
import { DateTime } from 'luxon';

export function ElapsedTime({ unix, className }: { unix: number; className?: string }) {
  const pastTime = DateTime.fromMillis(unix);
  const now = DateTime.now();
  const elapsed = now.diff(pastTime, ['years', 'days', 'hours', 'minutes', 'seconds']);
  return (
    <time className={clsx('text-[0.5rem]', className)} title={`[${unix}]`}>
      {elapsed.toHuman()}
    </time>
  );
}
