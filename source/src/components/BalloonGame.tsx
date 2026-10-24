import { useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { content } from '../data/birthdayContent';
import { burst } from '../lib/confetti';
import { useStored } from '../hooks/useStored';
import { playBalloonPop } from '../lib/sounds';
import Modal from './Modal';
import StageNav from './StageNav';
const colors = ['#F7A9C4', '#B9E3FF', '#E6D9FF', '#FFD6E7', '#9fd3f7', '#d4c0ff', '#f58bb0'];
const lefts = [3, 17, 31, 45, 58, 72, 85];
const tops = [14, 52, 4, 46, 18, 56, 8];
export default function BalloonGame({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const msgs = content.balloons;
  const [popped, setPopped] = useStored<number[]>('popped', []);
  const [active, setActive] = useState<number | null>(null);
  const seen = useRef(new Set(popped));
  const pop = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    if (seen.current.has(i)) return;
    seen.current.add(i);
    playBalloonPop();
    const r = e.currentTarget.getBoundingClientRect();
    burst((r.left + r.width / 2) / window.innerWidth, (r.top + r.height / 2) / window.innerHeight);
    setPopped(p => (p.includes(i) ? p : [...p, i]));
    setActive(i);
  };
  const done = popped.length >= msgs.length;
  return (
    <section className="screen center">
      <h2 className="display sm">Pop the balloons 🎈</h2>
      <p className="soft" aria-live="polite">{popped.length} of {msgs.length} balloons popped</p>
      <div className="field">
        {msgs.map((_, i) => (
          <button key={i} className={`balloon${popped.includes(i) ? ' popped' : ''}`} disabled={popped.includes(i)} aria-label={`Balloon ${i + 1}${popped.includes(i) ? ', popped' : ''}`}
            onClick={e => pop(i, e)} style={{ left: `${lefts[i % 7]}%`, top: `${tops[i % 7]}%`, '--c': colors[i % 7], '--dur': `${2.6 + (i % 4) * 0.7}s`, '--del': `${-i * 0.6}s` } as CSSProperties} />
        ))}
      </div>
      {done && active === null && <div className="card note"><p>{content.balloonsDone}</p></div>}
      {active !== null && <Modal label="Balloon message" onClose={() => { setActive(null); if (popped.length >= msgs.length) burst(0.5, 0.4, true); }}><p className="msg">{msgs[active]}</p></Modal>}
      <StageNav onBack={onBack} onNext={done ? onNext : undefined} onSkip={done ? undefined : onNext} skipLabel="Skip activity" />
    </section>
  );
}
