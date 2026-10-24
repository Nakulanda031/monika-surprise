import { useState } from 'react';
import { Heart } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { useStored } from '../hooks/useStored';
import { playNoteChime } from '../lib/sounds';
import Modal from './Modal';
import StageNav from './StageNav';
export default function SecretNotes({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { title, subtitle, items } = content.notes;
  const [opened, setOpened] = useStored<number[]>('notes', []);
  const [opening, setOpening] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const last = items.length - 1;
  const lockedFinal = opened.filter(i => i !== last).length < last;
  const all = opened.length >= items.length;
  const tap = (i: number) => {
    if (i === last && lockedFinal) { setHint('The last note unlocks after you open the others. 💌'); return; }
    setHint(''); setOpening(i);
    playNoteChime();
    setTimeout(() => { setOpening(null); setActive(i); setOpened(o => (o.includes(i) ? o : [...o, i])); }, 450);
  };
  return (
    <section className="screen">
      <h2 className="display sm center">{title}</h2>
      <p className="soft center">{subtitle}</p>
      <p className="center" aria-live="polite"><b>{opened.length} of {items.length} notes discovered</b></p>
      <div className="envs">
        {items.map((_, i) => {
          const locked = i === last && lockedFinal;
          return (
            <button key={i} className={`env${opened.includes(i) ? ' open' : ''}${opening === i ? ' opening' : ''}${locked ? ' locked' : ''}`} onClick={() => tap(i)}
              aria-label={`Envelope ${i + 1}${opened.includes(i) ? ', opened. Read again' : locked ? ', locked' : ''}`}>
              <Heart size={22} fill="currentColor" /><span>{locked ? 'Locked' : opened.includes(i) ? 'Read again' : `Note ${i + 1}`}</span>
            </button>
          );
        })}
      </div>
      <p className="center soft" role="status">{hint}</p>
      {active !== null && <Modal label={`Note ${active + 1}`} onClose={() => setActive(null)}><p className="paper">{items[active]}</p></Modal>}
      <StageNav onBack={onBack} onNext={all ? onNext : undefined} onSkip={all ? undefined : onNext} skipLabel="Skip notes" />
    </section>
  );
}
