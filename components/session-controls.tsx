'use client';

import { Play, Pause, Settings } from 'lucide-react';

export function SessionControls({
  isRunning,
  onToggle
}: {
  isRunning: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Play/Pause Button */}
      <button
        onClick={onToggle}
        className="px-8 py-3 bg-primary/10 text-orange-400 rounded-full font-medium hover:bg-primary/20 transition-all duration-300 hover:scale-105"
      >
        {isRunning ? (
          <div className="flex items-center gap-2">
            <Pause size={20} />
            Pause
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Play size={20} className="ml-0.5" />
            Resume
          </div>
        )}
      </button>

      {/* Settings Button */}
      <button className="p-3 rounded-full bg-primary/10 border border-border hover:bg-primary/20 transition-all duration-300 text-muted-foreground hover:text-foreground">
        <Settings size={20} className="text-orange-400" />
      </button>
    </div>
  );
}
