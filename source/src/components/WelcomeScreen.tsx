import { useState } from 'react';
import { Heart } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { initAudio, playButtonClick, playNoteChime } from '../lib/sounds';

export default function WelcomeScreen({ onBegin }: { onBegin: () => void }) {
  const w = content.welcome;
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

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

      {/* Intro Envelope Scene */}
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
      <div className={`light-overlay${opening && !opened ? ' active' : ''}`} aria-hidden="true" />

      {/* Revealed Birthday Welcome Screen */}
      <div className={`welcome-revealed${opened ? ' visible' : ''}`}>
        <h1 className="display">{w.title}</h1>
        <p className="lead">{w.subtitle}</p>
        <p className="soft">{w.support}</p>
        <button
          className="btn primary big"
          onClick={() => { initAudio(); playButtonClick(); onBegin(); }}
        >
          {w.button}
        </button>
      </div>
    </section>
  );
}
