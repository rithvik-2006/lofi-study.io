// 'use client';

// type TimerDisplayProps = {
//   minutes: number;
//   seconds: number;
//   isBreak: boolean;
//   totalSeconds: number;
// };

// const SIZE = 128;
// const STROKE = 8;
// const R = (SIZE - STROKE) / 2;
// const CX = SIZE / 2;
// const CY = SIZE / 2;
// const CIRCUMFERENCE = 2 * Math.PI * R;

// export function TimerDisplay({
//   minutes,
//   seconds,
//   isBreak,
//   totalSeconds,
// }: TimerDisplayProps) {
//   const remainingSeconds = minutes * 60 + seconds;
//   const progress = Math.max(0, Math.min(1, remainingSeconds / totalSeconds));
//   const strokeDashoffset = (1 - progress) * CIRCUMFERENCE;

//   return (
//     <div className="flex flex-col items-center justify-center gap-6">
//       <div className="text-center animate-float">
//         <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
//           {isBreak ? 'Break Time' : 'Focus Time'}
//         </p>
//         <div className="relative">
//           <div
//             className="absolute inset-0 blur-3xl bg-accent rounded-full transition-opacity duration-1000"
//             style={{ opacity: isBreak ? 0.4 : 0.25 }}
//           />
//           <div className="relative text-8xl font-light tracking-tighter text-accent tabular-nums">
//             {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
//           </div>
//         </div>
//       </div>

//       {/* Progress ring — stroke-dashoffset linear, duration = 1s per tick */}
//       <div
//         className="relative flex items-center justify-center animate-float"
//         style={{ width: SIZE, height: SIZE }}
//       >
//         <svg
//           width={SIZE}
//           height={SIZE}
//           viewBox={`0 0 ${SIZE} ${SIZE}`}
//           className="-rotate-90"
//           aria-hidden
//         >
//           <circle
//             cx={CX}
//             cy={CY}
//             r={R}
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={STROKE}
//             className="text-muted"
//           />
//           <circle
//             cx={CX}
//             cy={CY}
//             r={R}
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={STROKE}
//             strokeLinecap="round"
//             strokeDasharray={CIRCUMFERENCE}
//             strokeDashoffset={strokeDashoffset}
//             className="text-accent"
//             style={{ transition: 'stroke-dashoffset 1s linear' }}
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }
'use client';

type TimerDisplayProps = {
  minutes: number;
  seconds: number;
  isBreak: boolean;
  totalSeconds: number;
};

// Increased size for a more "hero" feel
const SIZE = 280;
const STROKE = 10;
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
  const progress = totalSeconds > 0 ? Math.max(0, Math.min(1, remainingSeconds / totalSeconds)) : 0;
  const strokeDashoffset = (1 - progress) * CIRCUMFERENCE;

  // Change color based on mode
  const accentColor = isBreak ? 'text-emerald-400' : 'text-accent';
  const glowColor = isBreak ? 'bg-emerald-500/20' : 'bg-accent/20';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative group transition-all duration-700" style={{ width: SIZE, height: SIZE }}>

        {/* Ambient Glow behind the ring */}
        <div className={`absolute inset-0 rounded-full blur-[60px] transition-colors duration-1000 ${glowColor}`} />

        {/* SVG Progress Ring */}
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90 relative z-10"
        >
          {/* Background Track (The "muted" part) */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-muted/20"
          />

          {/* Active Progress */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease'
            }}
            className={accentColor}
          />
        </svg>

        {/* Inner Content (Time & Label) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 transition-colors duration-500 ${isBreak ? 'text-emerald-400/80' : 'text-muted-foreground'}`}>
            {isBreak ? 'Taking a Break' : 'Focus Session'}
          </span>

          <div className="text-7xl font-light tracking-tighter tabular-nums flex items-baseline">
            {String(minutes).padStart(2, '0')}
            <span className="text-4xl opacity-30 mx-1">:</span>
            {String(seconds).padStart(2, '0')}
          </div>

          <div className="mt-4 flex gap-1">
            <div className={`h-1 w-8 rounded-full transition-all duration-500 ${!isBreak ? 'bg-accent' : 'bg-muted'}`} />
            <div className={`h-1 w-8 rounded-full transition-all duration-500 ${isBreak ? 'bg-emerald-400' : 'bg-muted'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}