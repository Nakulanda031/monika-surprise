import { ArrowLeft, ArrowRight } from 'lucide-react';
import { playButtonClick } from '../lib/sounds';
type P = { onBack?: () => void; onNext?: () => void; nextLabel?: string; onSkip?: () => void; skipLabel?: string };
export default function StageNav({ onBack, onNext, nextLabel = 'Continue', onSkip, skipLabel = 'Skip' }: P) {
  const click = (fn?: () => void) => () => { if (fn) { playButtonClick(); fn(); } };
  return (
    <nav className="stagenav" aria-label="Section navigation">
      {onBack && <button className="btn" onClick={click(onBack)}><ArrowLeft size={18} /> Back</button>}
      {onSkip && <button className="btn ghost" onClick={click(onSkip)}>{skipLabel}</button>}
      {onNext && <button className="btn primary" onClick={click(onNext)}>{nextLabel} <ArrowRight size={18} /></button>}
    </nav>
  );
}
