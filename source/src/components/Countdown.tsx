import { useEffect, useState } from 'react';
import { content } from '../data/birthdayContent';
import { getMidnightCountdown, type MidnightCountdown } from '../lib/time';
import StageNav from './StageNav';

export default function Countdown({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [countdown, setCountdown] = useState<MidnightCountdown>(() => getMidnightCountdown());
  const t = content.countdown;

  useEffect(() => {
    const tick = () => setCountdown(getMidnightCountdown());
    tick();
    const timer = setInterval(tick, 250);
    return () => clearInterval(timer);
  }, []);

  const isUnlocked = countdown.isUnlocked;

  return (
    <section className="screen center">
      {isUnlocked ? (
        <>
          <h2 className="display">{t.birthdayTitle}</h2>
          <p className="lead">{t.birthdayText}</p>
          <StageNav onBack={onBack} onNext={onNext} nextLabel="Let's play" />
        </>
      ) : (
        <>
          <h2 className="display">Your special moment is almost here, Monika… 💗</h2>
          <p className="lead">Someone made a little world just for you. It unlocks at midnight…</p>
          <div
            className={`clock ${countdown.days > 0 ? 'four-cols' : 'three-cols'}`}
            role="timer"
            aria-label={`${countdown.days > 0 ? `${countdown.days} days, ` : ''}${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds until your birthday`}
          >
            {countdown.days > 0 && (
              <div className="card tick">
                <b>{String(countdown.days).padStart(2, '0')}</b>
                <small>days</small>
              </div>
            )}
            <div className="card tick">
              <b>{String(countdown.hours).padStart(2, '0')}</b>
              <small>hours</small>
            </div>
            <div className="card tick">
              <b>{String(countdown.minutes).padStart(2, '0')}</b>
              <small>minutes</small>
            </div>
            <div className="card tick">
              <b>{String(countdown.seconds).padStart(2, '0')}</b>
              <small>seconds</small>
            </div>
          </div>
          <p className="soft">Countdown to October 29, 2026 • 12:00 AM IST ✨</p>
          <StageNav onBack={onBack} onNext={undefined} />
        </>
      )}
    </section>
  );
}
