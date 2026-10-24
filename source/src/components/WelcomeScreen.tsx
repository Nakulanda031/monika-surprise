import { content } from '../data/birthdayContent';
import { initAudio, playButtonClick } from '../lib/sounds';
export default function WelcomeScreen({ onBegin }: { onBegin: () => void }) {
  const w = content.welcome;
  return (
    <section className="screen center hero">
      <h1 className="display">{w.title}</h1>
      <p className="lead">{w.subtitle}</p>
      <p className="soft">{w.support}</p>
      <button className="btn primary big" onClick={() => { initAudio(); playButtonClick(); onBegin(); }}>{w.button}</button>
    </section>
  );
}
