'use client';

type TimerDisplayProps = {
  minutes: number;
  seconds: number;
  isBreak: boolean;
  totalSeconds: number;
};

const SIZE = 128;
const STROKE = 8;
const R = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function TimerDisplay({
  minutes,
  seconds,
  isBreak,
  totalSeconds,
}: TimerDisplayProps) {
  const remainingSeconds = minutes * 60 + seconds;
  const progress = Math.max(0, Math.min(1, remainingSeconds / totalSeconds));
  const strokeDashoffset = (1 - progress) * CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-center animate-float">
        <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </p>
        <div className="relative">
          <div
            className="absolute inset-0 blur-3xl bg-accent rounded-full transition-opacity duration-1000"
            style={{ opacity: isBreak ? 0.4 : 0.25 }}
          />
          <div className="relative text-8xl font-light tracking-tighter text-accent tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Progress ring — stroke-dashoffset linear, duration = 1s per tick */}
      <div
        className="relative flex items-center justify-center animate-float"
        style={{ width: SIZE, height: SIZE }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-muted"
          />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="text-accent"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
      </div>
    </div>
  );
}
