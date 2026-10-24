/**
 * sounds.ts — Web Audio API synthesized sound effects for Monika's surprise site.
 * All sounds are generated programmatically; no external audio files required.
 * SFX state is independent from background music.
 */

let _ctx: AudioContext | null = null;

/** Lazily create / resume the shared AudioContext. Must be called from a user gesture. */
function ctx(): AudioContext {
  if (!_ctx) _ctx = new AudioContext();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

// ── SFX enabled state (persisted in localStorage) ──────────────────────────
const SFX_KEY = 'monika:sfx';

function readSfxEnabled(): boolean {
  try {
    const stored = localStorage.getItem(SFX_KEY);
    return stored === null ? true : stored === 'true';
  } catch {
    return true;
  }
}

let _sfxEnabled = readSfxEnabled();

export function isSfxEnabled(): boolean {
  return _sfxEnabled;
}

export function toggleSfx(): boolean {
  _sfxEnabled = !_sfxEnabled;
  try { localStorage.setItem(SFX_KEY, String(_sfxEnabled)); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('monika-sfx-change', { detail: _sfxEnabled }));
  return _sfxEnabled;
}

/** Call this once on first intentional user interaction to unlock AudioContext. */
export function initAudio(): void {
  ctx(); // creates + resumes
}

// ── Debounce guard — prevents double-fire within 40 ms ────────────────────
let _lastSound = 0;
function canPlay(minGap = 40): boolean {
  const now = performance.now();
  if (now - _lastSound < minGap) return false;
  _lastSound = now;
  return true;
}

// ── Sound synthesis helpers ────────────────────────────────────────────────

function ramp(param: AudioParam, from: number, to: number, duration: number, c: AudioContext): void {
  param.setValueAtTime(from, c.currentTime);
  param.exponentialRampToValueAtTime(Math.max(to, 0.0001), c.currentTime + duration);
}

// ── Public sound functions ─────────────────────────────────────────────────

/** Tiny soft pop — buttons, nav, gallery, general clicks */
export function playButtonClick(): void {
  if (!_sfxEnabled || !canPlay(40)) return;
  try {
    const c = ctx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, c.currentTime + 0.06);
    gain.gain.setValueAtTime(0.12, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.07);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.08);
  } catch { /* ignore */ }
}

/** Quiet subtle click — gallery navigation prev/next */
export function playGalleryClick(): void {
  if (!_sfxEnabled || !canPlay(40)) return;
  try {
    const c = ctx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, c.currentTime);
    gain.gain.setValueAtTime(0.08, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.03);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.035);
  } catch { /* ignore */ }
}

/** Playful bubble pop + delicate sparkle chime — balloons */
export function playBalloonPop(): void {
  if (!_sfxEnabled || !canPlay(30)) return;
  try {
    const c = ctx();

    // --- Noise burst (the "pop") ---
    const bufLen = Math.floor(c.sampleRate * 0.08);
    const buf = c.createBuffer(1, bufLen, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);
    const noise = c.createBufferSource();
    noise.buffer = buf;
    const bpf = c.createBiquadFilter();
    bpf.type = 'bandpass';
    bpf.frequency.value = 220;
    bpf.Q.value = 0.6;
    const noiseGain = c.createGain();
    noise.connect(bpf); bpf.connect(noiseGain); noiseGain.connect(c.destination);
    noiseGain.gain.setValueAtTime(0.22, c.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.08);
    noise.start(c.currentTime);
    noise.stop(c.currentTime + 0.09);

    // --- Sparkle chime (delayed 60 ms) ---
    const t = c.currentTime + 0.06;
    const sparkOsc = c.createOscillator();
    const sparkGain = c.createGain();
    sparkOsc.connect(sparkGain); sparkGain.connect(c.destination);
    sparkOsc.type = 'sine';
    sparkOsc.frequency.setValueAtTime(1400, t);
    sparkOsc.frequency.exponentialRampToValueAtTime(2600, t + 0.18);
    sparkGain.gain.setValueAtTime(0.09, t);
    sparkGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.20);
    sparkOsc.start(t);
    sparkOsc.stop(t + 0.22);
  } catch { /* ignore */ }
}

/** Gentle magical bell chime — secret note opening */
export function playNoteChime(): void {
  if (!_sfxEnabled || !canPlay(80)) return;
  try {
    const c = ctx();

    const playBell = (freq: number, gainVal: number, delay: number) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = c.currentTime + delay;
      gain.gain.setValueAtTime(gainVal, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.start(t);
      osc.stop(t + 0.48);
    };

    playBell(880, 0.10, 0);        // fundamental
    playBell(1760, 0.05, 0);       // octave overtone
    playBell(1174.66, 0.04, 0.07); // second note (D6)
    playBell(1318.51, 0.03, 0.16); // third note (E6)
  } catch { /* ignore */ }
}
