import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { playButtonClick, playGalleryClick } from '../lib/sounds';
import StageNav from './StageNav';
export default function PhotoGallery({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const { title, subtitle, photos } = content.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const [bad, setBad] = useState<number[]>([]);
  const step = useCallback((d: number) => setOpen(o => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open, step]);
  const Img = ({ i, full }: { i: number; full?: boolean }) => bad.includes(i)
    ? <div className="missing"><ImageOff /><span>Photo not found</span></div>
    : <img src={photos[i].src} alt={photos[i].alt} loading={full ? 'eager' : 'lazy'} decoding="async" onError={() => setBad(b => [...b, i])} />;
  return (
    <section className="screen">
      <h2 className="display sm center">{title}</h2>
      <p className="soft center">{subtitle}</p>
      {photos.length === 0 ? (
        <div className="card note"><p>No photos yet. Add JPG, PNG or WebP files to <code>public/media/photos</code> and list them in <code>src/data/birthdayContent.ts</code>.</p></div>
      ) : (
        <ul className="grid">
          {photos.map((p, i) => (
            <li key={p.src + i} style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}>
              <button className="photo" onClick={() => { playButtonClick(); setOpen(i); }} aria-label={`Open photo ${i + 1}: ${p.alt}`}>
                <Img i={i} />
                {(p.caption || p.date) && <span className="cap">{p.caption}{p.date ? ` · ${p.date}` : ''}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <div className="lbbody" onClick={e => e.stopPropagation()}>
            <Img i={open} full />
            <p>{photos[open].caption}</p><small>{open + 1} / {photos.length}</small>
          </div>
          <button className="lb close" aria-label="Close" autoFocus onClick={e => { e.stopPropagation(); playButtonClick(); setOpen(null); }}><X /></button>
          {photos.length > 1 && <>
            <button className="lb prev" aria-label="Previous photo" onClick={e => { e.stopPropagation(); playGalleryClick(); step(-1); }}><ChevronLeft /></button>
            <button className="lb next" aria-label="Next photo" onClick={e => { e.stopPropagation(); playGalleryClick(); step(1); }}><ChevronRight /></button></>}
        </div>
      )}
      <StageNav onBack={onBack} onNext={onNext} />
    </section>
  );
}
