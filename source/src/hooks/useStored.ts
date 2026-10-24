import { useEffect, useState } from 'react';
export function useStored<T>(key: string, init: T) {
  const k = 'monika:' + key;
  const [v, setV] = useState<T>(() => { try { const r = localStorage.getItem(k); return r ? (JSON.parse(r) as T) : init; } catch { return init; } });
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }, [k, v]);
  return [v, setV] as const;
}
export function clearStored() { try { Object.keys(localStorage).filter(k => k.startsWith('monika:')).forEach(k => localStorage.removeItem(k)); } catch { /* ignore */ } }
