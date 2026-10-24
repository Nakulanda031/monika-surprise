import { useState } from 'react';
import { content } from '../data/birthdayContent';
import { burst } from '../lib/confetti';
import { playButtonClick } from '../lib/sounds';
import StageNav from './StageNav';
export default function CrushHint({ onBack, onReplay }: { onBack: () => void; onReplay: () => void }) {
  const c = content.crush;
  const [thanked, setThanked] = useState(false);
  return (
    <section className="screen center">
      <div className="card letter">
        {c.paragraphs.map((p, i) => <p key={i} className="reveal" style={{ animationDelay: `${i * 0.9}s` }}>{p}</p>)}
        <p className="sign reveal" style={{ animationDelay: `${c.paragraphs.length * 0.9}s` }}>{c.signoff.map(l => <span key={l}>{l}<br /></span>)}</p>
      </div>
      {thanked ? <p className="msg" role="status">{c.thanks}</p>
        : <button className="btn primary big" onClick={() => { playButtonClick(); setThanked(true); burst(0.5, 0.6, true); }}>{c.button}</button>}
      <p className="soft">{c.credit}</p>
      <StageNav onBack={onBack} onNext={onReplay} nextLabel={c.replay} />
    </section>
  );
}
