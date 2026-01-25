'use client';

export function TimerDisplay({ minutes, seconds, isBreak }: { minutes: number; seconds: number; isBreak: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </p>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl opacity-30 bg-accent rounded-full" />
          <div className="relative text-8xl font-light tracking-tighter text-accent tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
      
      {/* Progress ring */}
      <div className="w-32 h-32 rounded-full border-4 border-muted flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent opacity-60" 
             style={{ animation: 'spin 3s linear infinite' }} />
      </div>
    </div>
  );
}
