export const TARGET_MIDNIGHT_IST = '2026-10-29T00:00:00+05:30';
export const TARGET_TIMESTAMP_MS = 1793212200000; // Date.parse('2026-10-29T00:00:00+05:30')

let _testOffset: number | null = null;

export function getEffectiveNowMs(): number {
  if (typeof window !== 'undefined') {
    if (typeof (window as any).__TEST_NOW__ === 'number') {
      return (window as any).__TEST_NOW__;
    }
    if (_testOffset === null) {
      try {
        const sp = new URLSearchParams(window.location.search);
        const tt = sp.get('test_time') || sp.get('test_now');
        if (tt) {
          const parsed = isNaN(+tt) ? Date.parse(tt) : +tt;
          if (!isNaN(parsed)) {
            _testOffset = parsed - Date.now();
          }
        }
      } catch { /* ignore */ }
    }
    if (_testOffset !== null) {
      return Date.now() + _testOffset;
    }
  }
  return Date.now();
}

export function isMidnightUnlocked(): boolean {
  return getEffectiveNowMs() >= TARGET_TIMESTAMP_MS;
}

export interface MidnightCountdown {
  isUnlocked: boolean;
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getMidnightCountdown(): MidnightCountdown {
  const now = getEffectiveNowMs();
  const diff = TARGET_TIMESTAMP_MS - now;
  if (diff <= 0) {
    return {
      isUnlocked: true,
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = days > 0 ? Math.floor((totalSeconds % 86400) / 3600) : Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    isUnlocked: false,
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
  };
}

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
