import { useMemo } from 'react';
export default function Sky({ night = false }: { night?: boolean }) {
  const bits = useMemo(() => Array.from({ length: night ? 30 : 14 }, (_, i) => ({ i, l: Math.random() * 100, t: Math.random() * 100, s: 10 + Math.random() * 16, d: Math.random() * 6, heart: i % (night ? 5 : 2) === 0 })), [night]);
  return (
    <div className={`sky${night ? ' night' : ''}`} aria-hidden="true">
      <i className="cloud c1" /><i className="cloud c2" /><i className="cloud c3" />
      {bits.map(b => <span key={b.i} className={b.heart ? 'bit heart' : 'bit spark'} style={{ left: `${b.l}%`, top: `${b.t}%`, fontSize: b.s, animationDelay: `${b.d}s` }}>{b.heart ? '♥' : '✦'}</span>)}
    </div>
  );
}
