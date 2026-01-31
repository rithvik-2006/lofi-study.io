'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { TimerDisplay } from './timer-display';
import { MusicPlayer } from './music-player';
import { SessionControls } from './session-controls';
import type { Mode } from '@/hooks/useLofiPlayer';
import { MonitorPlay } from 'lucide-react';
type Player = {
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  isPlaying: boolean;
  currentTrack: { title: string; url: string };
  setVolumeForMode: (mode: Mode) => void;
  loadError: string | null;
};

export function StudySession({
  initialMinutes,
  onCycleBackground,
  onModeChange,
  player,
}: {
  initialMinutes: number;
  onCycleBackground?: () => void;
  onModeChange?: (isBreak: boolean) => void;
  player?: Player;
}) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Notify parent of mode changes
  useEffect(() => {
    onModeChange?.(isBreak);
  }, [isBreak, onModeChange]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          setIsRunning(false);

          if (!isBreak) {
            // Switch to break
            setIsBreak(true);
            setMinutes(5);
            setSeconds(0);
            setSessionsCompleted(sessionsCompleted + 1);
            onModeChange?.(true);
          } else {
            // Switch back to focus
            setIsBreak(false);
            setMinutes(initialMinutes);
            setSeconds(0);
            onModeChange?.(false);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak, initialMinutes, sessionsCompleted]);

  // Fullscreen handler
  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const isFocus = !isBreak;
  const transitionDuration = isFocus ? 1500 : 800;
  const pulseSpeed = isFocus ? 4 : 1.5; // Slower for focus, faster for break

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-transparent transition-all"
      style={{ transitionDuration: `${transitionDuration}ms` }}
    >
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${isBreak ? 'bg-blue-400' : 'bg-orange-300'} transition-all`}
          style={{ 
            opacity: isFocus ? 0.15 : 0.25,
            transitionDuration: `${transitionDuration}ms`,
            animation: `pulse-glow ${pulseSpeed}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
          }}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${isBreak ? 'bg-purple-400' : 'bg-amber-300'} transition-all delay-1000`}
          style={{ 
            opacity: isFocus ? 0.12 : 0.2,
            transitionDuration: `${transitionDuration}ms`,
            animation: `pulse-glow ${pulseSpeed}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: '1s'
          }}
        />
      </div> */}

      <div className="relative z-10 w-full max-w-2xl space-y-12">
        {/* Main Timer */}
        <TimerDisplay
          minutes={minutes}
          seconds={seconds}
          isBreak={isBreak}
          totalSeconds={isBreak ? 5 * 60 : initialMinutes * 60}
        />

        {/* Stats */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Sessions completed: <span className="text-accent font-semibold">{sessionsCompleted}</span>
          </p>
        </div>

        {/* Music Player */}
        <div className="flex justify-center">
          <MusicPlayer player={player} />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <SessionControls
            isRunning={isRunning}
            onToggle={() => setIsRunning(!isRunning)}
          />

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-3 rounded-full bg-primary/10 border border-border hover:bg-primary/20 transition-all duration-300 text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? <Minimize2 size={20} className='text-orange-400' /> : <Maximize2 size={20} className='text-orange-400' />}
          </button>

          {/* Background change button */}
          {/* {onCycleBackground && (
            <button
              onClick={onCycleBackground}
              className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground"
              title="Change background video"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-accent to-primary" />
            </button>
          )} */}
          {onCycleBackground && (
            <button
              onClick={onCycleBackground}
              className="group p-3 rounded-full bg-primary/10 border border-border hover:bg-primary/20 transition-all duration-300 text-muted-foreground hover:text-foreground shadow-sm"
              title="Change background scene"
            >
              <MonitorPlay
                className="w-5 h-5 text-orange-400"
              />
            </button>
          )}
        </div>

        {/* Info text */}
        <div className="text-center text-xs text-muted-foreground/60">
          {isRunning && 'Click anywhere to continue studying...'}
        </div>
      </div>
    </div>
  );
}
