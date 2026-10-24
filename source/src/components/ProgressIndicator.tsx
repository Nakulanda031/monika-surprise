export default function ProgressIndicator({ step, total, label }: { step: number; total: number; label: string }) {
  return (
    <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step} aria-label={`Step ${step} of ${total}: ${label}`}>
      <div className="dots">{Array.from({ length: total }, (_, i) => <span key={i} className={i < step ? 'on' : ''} />)}</div>
      <small>{label}</small>
    </div>
  );
}
