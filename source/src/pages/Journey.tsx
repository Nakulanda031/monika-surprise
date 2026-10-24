import { useEffect, useState } from 'react';
import Sky from '../components/Sky';
import ProgressIndicator from '../components/ProgressIndicator';
import WelcomeScreen from '../components/WelcomeScreen';
import Countdown from '../components/Countdown';
import BalloonGame from '../components/BalloonGame';
import PhotoGallery from '../components/PhotoGallery';
import VideoGallery from '../components/VideoGallery';
import SecretNotes from '../components/SecretNotes';
import FinalReveal from '../components/FinalReveal';
import CrushHint from '../components/CrushHint';
import MusicPlayer from '../components/MusicPlayer';
import { clearStored, useStored } from '../hooks/useStored';
const STAGES = ['welcome', 'countdown', 'balloons', 'photos', 'videos', 'notes', 'final', 'crush'] as const;
const LABELS = ['Welcome', 'Countdown', 'Balloons', 'Photos', 'Videos', 'Notes', 'Surprise', 'Secret'];
export default function Journey() {
  const [run, setRun] = useState(0);
  const [saved, setStage] = useStored<number>('stage', 0);
  const idx = Number.isInteger(saved) && saved >= 0 && saved < STAGES.length ? saved : 0;
  const go = (d: number) => setStage(Math.min(STAGES.length - 1, Math.max(0, idx + d)));
  const replay = () => { clearStored(); setRun(r => r + 1); setStage(0); };
  useEffect(() => { window.scrollTo(0, 0); }, [idx]);
  const night = idx >= 6;
  const p = { onBack: () => go(-1), onNext: () => go(1) };
  return (
    <div className={`app${night ? ' night' : ''}`} key={run}>
      <Sky night={night} />
      {idx > 0 && <header className="top"><ProgressIndicator step={idx + 1} total={STAGES.length} label={LABELS[idx]} /></header>}
      <main className="stage" key={STAGES[idx]}>
        {idx === 0 && <WelcomeScreen onBegin={() => { window.dispatchEvent(new CustomEvent('monika-start-music')); go(1); }} />}
        {idx === 1 && <Countdown {...p} />}
        {idx === 2 && <BalloonGame {...p} />}
        {idx === 3 && <PhotoGallery {...p} />}
        {idx === 4 && <VideoGallery {...p} />}
        {idx === 5 && <SecretNotes {...p} />}
        {idx === 6 && <FinalReveal {...p} />}
        {idx === 7 && <CrushHint onBack={p.onBack} onReplay={replay} />}
      </main>
      <MusicPlayer />
    </div>
  );
}
