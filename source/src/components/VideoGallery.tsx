import { useState } from 'react';
import { content } from '../data/birthdayContent';
import StageNav from './StageNav';
function VideoCard({ src, poster, caption }: { src: string; poster?: string; caption?: string }) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  return (
    <figure className="card vid">
      {state === 'loading' && <p className="soft" role="status">Loading video…</p>}
      {state === 'error' ? <p className="err" role="alert">This video couldn't be loaded. Check the file path in birthdayContent.ts, or try again on a stronger connection.</p> : (
        <video controls playsInline preload="metadata" poster={poster} src={src} onLoadedData={() => setState('ready')} onError={() => setState('error')} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
export default function VideoGallery({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { title, subtitle, items } = content.videos;
  return (
    <section className="screen">
      <h2 className="display sm center">{title}</h2>
      <p className="soft center">{subtitle}</p>
      {items.length === 0
        ? <div className="card note"><p>No videos yet. Add MP4 files to <code>public/media/videos</code> and list them in <code>src/data/birthdayContent.ts</code>.</p></div>
        : items.map(v => <VideoCard key={v.src} {...v} />)}
      <StageNav onBack={onBack} onNext={onNext} />
    </section>
  );
}
