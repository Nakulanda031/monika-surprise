import { useState } from 'react';
import { Mail } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { burst } from '../lib/confetti';
import { playButtonClick } from '../lib/sounds';
import StageNav from './StageNav';
export default function FinalReveal({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const f = content.final;
  const [open, setOpen] = useState(false);
  return (
    <section className="screen center">
      <div className={`gift${open ? ' open' : ''}`} aria-hidden="true"><Mail size={56} /></div>
      <h2 className="display sm reveal r1">{f.line1}</h2>
      <p className="lead reveal r2">{f.line2}</p>
      {open
        ? <p className="msg reveal" role="status">{f.revealed}</p>
        : <button className="btn primary big reveal r3" onClick={() => { playButtonClick(); setOpen(true); burst(0.5, 0.45, true); }}>{f.button}</button>}
      <StageNav onBack={onBack} onNext={open ? onNext : undefined} nextLabel={f.next} />
    </section>
  );
}
