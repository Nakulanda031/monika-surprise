import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, BellOff, Music, Pause, Play } from 'lucide-react';
import { content } from '../data/birthdayContent';
import { isSfxEnabled, toggleSfx } from '../lib/sounds';

const TARGET_VOLUME = 0.50; // Comfortable ambient volume (50%)

export default function MusicPlayer() {
  const { src, title } = content.music;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(TARGET_VOLUME);
  const [error, setError] = useState(false);
  const [sfx, setSfx] = useState(isSfxEnabled);
  const fadeRef = useRef<number | null>(null);

  const startWithFadeIn = useCallback(() => {
    const el = audioRef.current;
    if (!el || error) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    // Start gently at 0.15 so music is heard right away, then fade in to TARGET_VOLUME
    el.volume = 0.15;
    setVolume(0.15);
    el.play().then(() => {
      setIsPlaying(true);
      const step = (TARGET_VOLUME - 0.15) / 25;
      fadeRef.current = window.setInterval(() => {
        if (!audioRef.current || audioRef.current.paused) {
          if (fadeRef.current) clearInterval(fadeRef.current);
          return;
        }
        const next = audioRef.current.volume + step;
        if (next >= TARGET_VOLUME) {
          audioRef.current.volume = TARGET_VOLUME;
          setVolume(TARGET_VOLUME);
          if (fadeRef.current) clearInterval(fadeRef.current);
        } else {
          audioRef.current.volume = next;
          setVolume(next);
        }
      }, 50);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, [error]);

  useEffect(() => {
    const handleStart = () => {
      startWithFadeIn();
    };
    window.addEventListener('monika-start-music', handleStart);
    return () => {
      window.removeEventListener('monika-start-music', handleStart);
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, [startWithFadeIn]);

  if (!src) return null;

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRef.current) clearInterval(fadeRef.current);
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      try {
        el.volume = volume > 0 ? volume : TARGET_VOLUME;
        await el.play();
        setIsPlaying(true);
      } catch {
        setError(true);
      }
    }
  };

  return (
    <div className={`music card${isPlaying ? ' playing' : ''}`} role="region" aria-label="Music player">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onError={() => {
          setError(true);
          setIsPlaying(false);
        }}
      />
      <button
        className={`btn icon music-toggle${isPlaying ? ' on' : ''}`}
        onClick={toggle}
        aria-label={error ? 'Music unavailable' : isPlaying ? `Mute ${title}` : `Play ${title}`}
        title={error ? 'Audio file missing or unavailable' : isPlaying ? 'Pause / Mute' : 'Play music'}
        disabled={error}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      {error ? (
        <small className="music-err" title="Place birthday-music.mp3 in public/media/audio/">Music unavailable</small>
      ) : (
        <>
          <Music size={16} aria-hidden />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            aria-label="Music volume"
            onChange={e => {
              const v = +e.target.value;
              setVolume(v);
              if (audioRef.current) {
                audioRef.current.volume = v;
              }
            }}
          />
        </>
      )}
      <button
        className={`btn icon sfx-toggle${sfx ? ' on' : ''}`}
        onClick={() => { const next = toggleSfx(); setSfx(next); }}
        aria-label={sfx ? 'Mute sound effects' : 'Enable sound effects'}
        title={sfx ? 'Sound effects on — click to mute' : 'Sound effects off — click to enable'}
        style={{ marginLeft: '4px' }}
      >
        {sfx ? <Bell size={16} /> : <BellOff size={16} />}
      </button>
    </div>
  );
}
