'use client';

import { Play, Pause, SkipForward } from 'lucide-react';

type Player = {
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  isPlaying: boolean;
  currentTrack: { title: string; url: string };
  loadError: string | null;
};

export function MusicPlayer({ player }: { player?: Player }) {
  if (!player) return null;

  const { play, pause, next, isPlaying, currentTrack, loadError } = player;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-4 bg-transparent rounded-2xl px-10 py-6 ">
        <button
          onClick={() => (isPlaying ? pause() : play())}
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
          title={isPlaying ? 'Pause' : 'Resume'}
        >
          {isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} className="ml-0.5" />
          )}
        </button>
        <button
          onClick={next}
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110"
          title="Next track"
        >
          <SkipForward size={20} />
        </button>
      </div>
      {loadError ? (
        <p className="text-xs text-destructive/90 max-w-xs text-center">
          {loadError}. Check the URL or try Next.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground/80">
          Now playing: {currentTrack.title}
        </p>
      )}
    </div>
  );
}
