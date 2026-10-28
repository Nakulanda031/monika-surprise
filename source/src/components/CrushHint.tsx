import { useState, useRef } from 'react';
import { content } from '../data/birthdayContent';
import { burst } from '../lib/confetti';
import { playButtonClick } from '../lib/sounds';
import StageNav from './StageNav';

export default function CrushHint({ onBack, onReplay }: { onBack: () => void; onReplay: () => void }) {
  const c = content.crush;
  const [scene, setScene] = useState(0);
  const lastTapRef = useRef<number>(0);

  const totalScenes = 5;

  const nextScene = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) return;
    lastTapRef.current = now;
    playButtonClick();
    setScene(s => Math.min(totalScenes - 1, s + 1));
  };

  const prevScene = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) return;
    lastTapRef.current = now;
    playButtonClick();
    if (scene > 0) {
      setScene(s => s - 1);
    } else {
      onBack();
    }
  };

  const onSweetClick = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) return;
    lastTapRef.current = now;
    playButtonClick();
    burst(0.5, 0.6, true);
    setScene(4);
  };

  return (
    <section className="screen center story-page">
      <div className="ambient-glow" aria-hidden="true" />

      {/* Reading Progress */}
      <div className="story-progress" aria-label={`Scene ${scene + 1} of ${totalScenes}`}>
        <span className="story-step-badge">Scene {scene + 1} of {totalScenes}</span>
        <div className="story-dots">
          {[0, 1, 2, 3, 4].map(idx => (
            <span
              key={idx}
              className={`story-dot${idx === scene ? ' active' : idx < scene ? ' past' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="card letter story-card">
        {scene < 4 ? (
          <div className="story-scenes" key={scene}>
            {c.paragraphs.slice(0, Math.min(scene + 1, c.paragraphs.length)).map((p, i) => (
              <p
                key={i}
                className={`story-line ${i === scene ? 'active-line' : 'past-line'}`}
              >
                {p}
              </p>
            ))}
            {scene === 3 && (
              <p className="sign reveal active-line">
                {c.signoff.map(l => (
                  <span key={l}>{l}<br /></span>
                ))}
              </p>
            )}
          </div>
        ) : (
          <div className="story-final reveal">
            <p className="msg final-text" role="status">{c.thanks}</p>
            <p className="personal-signature">
              A little something from Nakulan, with no expectations — just a genuine wish to make you smile. 💗✨
            </p>
          </div>
        )}
      </div>

      {/* Next step buttons */}
      <div className="story-controls">
        {scene < 2 && (
          <button className="btn primary story-btn" onClick={nextScene}>
            Continue ✨
          </button>
        )}
        {scene === 2 && (
          <button className="btn primary story-btn" onClick={nextScene}>
            Discover what's next →
          </button>
        )}
        {scene === 3 && (
          <button className="btn primary big story-btn" onClick={onSweetClick}>
            {c.button}
          </button>
        )}
      </div>

      {scene === 4 && <p className="soft">{c.credit}</p>}

      <StageNav
        onBack={prevScene}
        onNext={scene === 4 ? onReplay : undefined}
        nextLabel={scene === 4 ? c.replay : undefined}
      />
    </section>
  );
}
