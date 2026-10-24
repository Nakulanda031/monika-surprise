import { useEffect, useRef, type ReactNode } from 'react';
export default function Modal({ children, onClose, label, closeLabel = 'Close' }: { children: ReactNode; onClose: () => void; label: string; closeLabel?: string }) {
  const btn = useRef<HTMLButtonElement>(null);
  const cb = useRef(onClose); cb.current = onClose;
  useEffect(() => { btn.current?.focus(); const k = (e: KeyboardEvent) => e.key === 'Escape' && cb.current(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return (
    <div className="backdrop" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={label} className="card modal" onClick={e => e.stopPropagation()}>
        {children}
        <button ref={btn} className="btn primary" onClick={onClose}>{closeLabel}</button>
      </div>
    </div>
  );
}
