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
        className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
      <button className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground">
        <Settings size={20} />
      </button>
    </div>
  );
}
