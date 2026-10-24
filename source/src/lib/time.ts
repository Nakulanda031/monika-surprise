export function parseLocalDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return isNaN(d.getTime()) || d.getMonth() !== +m[2] - 1 ? null : d;
}
export type Countdown =
  | { phase: 'before'; days: number; hours: number; minutes: number; seconds: number }
  | { phase: 'today' | 'after' };
export function getCountdown(now: Date, target: Date): Countdown {
  const diff = target.getTime() - now.getTime();
  if (diff > 0) {
    const t = Math.floor(diff / 1000);
    return { phase: 'before', days: Math.floor(t / 86400), hours: Math.floor(t / 3600) % 24, minutes: Math.floor(t / 60) % 60, seconds: t % 60 };
  }
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate() + 1);
  return { phase: now < end ? 'today' : 'after' };
}
