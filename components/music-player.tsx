'use client';

import { useState } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);

  return (
    <div className="flex items-center justify-center gap-6 bg-card rounded-2xl p-6 backdrop-blur-sm border border-border/50">
      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
      </button>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <Volume2 size={20} className="text-muted-foreground" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <span className="text-sm text-muted-foreground w-8 text-right">{volume}%</span>
      </div>

      {/* Background control */}
      <button className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110">
        <RotateCcw size={20} />
      </button>
    </div>
  );
}
