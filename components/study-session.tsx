'use client';

import { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { TimerDisplay } from './timer-display';
import { MusicPlayer } from './music-player';
import { SessionControls } from './session-controls';

const BACKGROUNDS = [
  'linear-gradient(135deg, rgba(30, 20, 40, 0.8), rgba(40, 25, 50, 0.8))',
  'linear-gradient(135deg, rgba(25, 35, 45, 0.8), rgba(30, 40, 50, 0.8))',
  'linear-gradient(135deg, rgba(35, 25, 30, 0.8), rgba(45, 30, 35, 0.8))',
];

export function StudySession({ initialMinutes }: { initialMinutes: number }) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

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
          } else {
            // Switch back to focus
            setIsBreak(false);
            setMinutes(initialMinutes);
            setSeconds(0);
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

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-all duration-1000"
      style={{ background: BACKGROUNDS[backgroundIndex] }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${isBreak ? 'bg-blue-400' : 'bg-orange-300'} transition-all duration-1000`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${isBreak ? 'bg-purple-400' : 'bg-amber-300'} transition-all duration-1000`} />
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-12">
        {/* Main Timer */}
        <TimerDisplay minutes={minutes} seconds={seconds} isBreak={isBreak} />

        {/* Stats */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Sessions completed: <span className="text-accent font-semibold">{sessionsCompleted}</span>
          </p>
        </div>

        {/* Music Player */}
        <div className="flex justify-center">
          <MusicPlayer />
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
            className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>

          {/* Background change button */}
          <button
            onClick={() => setBackgroundIndex((prev) => (prev + 1) % BACKGROUNDS.length)}
            className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-accent to-primary" />
          </button>
        </div>

        {/* Info text */}
        <div className="text-center text-xs text-muted-foreground/60">
          {isRunning && 'Click anywhere to continue studying...'}
        </div>
      </div>
    </div>
  );
}
