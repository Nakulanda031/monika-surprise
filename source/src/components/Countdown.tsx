import { content } from '../data/birthdayContent';
import { getCountdown, parseLocalDate } from '../lib/time';
import { useNow } from '../hooks/useNow';
import StageNav from './StageNav';
export default function Countdown({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const now = useNow();
  const target = parseLocalDate(content.birthday);
  const c = target ? getCountdown(now, target) : null;
  const t = content.countdown;
  const units = c && c.phase === 'before' ? ([['days', c.days], ['hours', c.hours], ['minutes', c.minutes], ['seconds', c.seconds]] as const) : null;
  return (
    <section className="screen center">
      {c?.phase === 'today' ? (<><h2 className="display">{t.birthdayTitle}</h2><p className="lead">{t.birthdayText}</p></>)
        : c?.phase === 'after' ? (<><h2 className="display">{t.afterTitle}</h2><p className="lead">{t.afterText}</p></>)
        : (<><h2 className="display">{t.heading}</h2>
            {units && <div className="clock" role="timer" aria-label={`${units.map(([l, v]) => `${v} ${l}`).join(', ')} until your birthday`}>
              {units.map(([l, v]) => <div key={l} className="card tick"><b>{String(v).padStart(2, '0')}</b><small>{l}</small></div>)}
            </div>}
            {!c && <p className="lead">Your surprise is ready whenever you are.</p>}</>)}
      <StageNav onBack={onBack} onNext={onNext} nextLabel="Let's play" />
    </section>
  );
}
