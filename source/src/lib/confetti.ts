import confetti from 'canvas-confetti';
const colors = ['#FFD6E7', '#F7A9C4', '#B9E3FF', '#E6D9FF', '#ffffff'];
export function burst(x = 0.5, y = 0.5, big = false) {
  try { confetti({ particleCount: big ? 140 : 34, spread: big ? 100 : 60, startVelocity: big ? 42 : 28, origin: { x, y }, colors, scalar: 0.9, disableForReducedMotion: true }); } catch { /* ignore */ }
}
