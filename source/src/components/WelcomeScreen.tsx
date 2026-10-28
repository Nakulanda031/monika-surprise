import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { initAudio, playButtonClick, playNoteChime } from '../lib/sounds';
import { getMidnightCountdown, type MidnightCountdown } from '../lib/time';

export default function WelcomeScreen({ onBegin }: { onBegin: () => void }) {
  const w = content.welcome;
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const [countdown, setCountdown] = useState<MidnightCountdown>(() => getMidnightCountdown());
  const wasLockedRef = useRef(!countdown.isUnlocked);
  const hasTriggeredRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const tick = () => {
      const next = getMidnightCountdown();
      setCountdown(next);

      // Midnight trigger: was locked, now unlocked, and haven't triggered yet
      if (next.isUnlocked && wasLockedRef.current && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsTransitioning(true);
        playNoteChime();
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1800);
      }
    };

    tick();
    const timer = setInterval(tick, 250);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        tick();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onVisibility);
    };
  }, []);

  const openEnvelope = () => {
    if (opening || opened) return;
    initAudio();
    playNoteChime();
    window.dispatchEvent(new CustomEvent('monika-start-music'));
    setOpening(true);

    setTimeout(() => {
      setOpened(true);
    }, 2200);
  };

  return (
    <section className="screen center hero intro-wrapper">
      <div className="ambient-glow" aria-hidden="true" />
      <span className="sparkle sp1" aria-hidden="true">✨</span>
      <span className="sparkle sp2" aria-hidden="true">✨</span>
      <span className="sparkle sp3" aria-hidden="true">✨</span>
      <span className="sparkle sp4" aria-hidden="true">✨</span>

      {/* Intro Envelope Scene (Page 1) */}
      <div className={`intro-scene${opened ? ' hide-intro' : ''}${opening ? ' opening' : ''}`}>
        <div className="intro-header">
          <h1 className="intro-title">Hey, Monika… <span className="heart-icon">💗</span></h1>
          <p className="intro-subtitle">Someone has a little surprise for you…</p>
        </div>

        <div className="envelope-wrap">
          <div className={`envelope${opening ? ' opening' : ''}`} onClick={openEnvelope}>
            <div className="envelope-inner">
              <div className="light-beam" />
            </div>
            <div className="envelope-pocket">
              <div className="fold-left" />
              <div className="fold-right" />
              <div className="fold-bottom" />
            </div>
            <div className="envelope-flap" />
            <button
              className="heart-seal"
              onClick={e => { e.stopPropagation(); openEnvelope(); }}
              aria-label="Touch the heart to open your surprise"
            >
              <Heart size={28} fill="currentColor" />
            </button>
            <div className="burst-hearts" aria-hidden="true">
              <span className="b-heart">💗</span>
              <span className="b-heart">✨</span>
              <span className="b-heart">💖</span>
              <span className="b-heart">🌸</span>
              <span className="b-heart">💕</span>
            </div>
          </div>
        </div>

        <p className="intro-hint">Touch the heart to open your surprise ✨</p>
      </div>

      {/* Fullscreen light dissolve overlay */}
      <div className={`light-overlay${(opening && !opened) || isTransitioning ? ' active' : ''}`} aria-hidden="true" />

      {/* BEFORE MIDNIGHT: Page 2 — Live Midnight Countdown */}
      {opened && !countdown.isUnlocked && (
        <div className="countdown-page visible">
          <div className="countdown-glow" aria-hidden="true" />
          <h2 className="display countdown-title">Your special moment is almost here, Monika… <span className="heart-icon">💗</span></h2>
          <p className="lead countdown-subtitle">Someone made a little world just for you. It unlocks at midnight…</p>

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

          <p className="soft countdown-hint">Countdown to October 29, 2026 • 12:00 AM IST ✨</p>
        </div>
      )}

      {/* AFTER MIDNIGHT (or once unlocked): Revealed Birthday Welcome Screen */}
      {opened && countdown.isUnlocked && (
        <div className="welcome-revealed visible">
          <h1 className="display">It's your day, Monika! Happy Birthday! 🎂💗</h1>
          <p className="lead">{w.subtitle}</p>
          <p className="soft">{w.support}</p>
          <button
            className="btn primary big"
            onClick={() => { initAudio(); playButtonClick(); onBegin(); }}
          >
            {w.button}
          </button>
        </div>
      )}
    </section>
  );
}
